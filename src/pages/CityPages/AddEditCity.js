import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import { cityType } from "../../models/type.model";
import statusModel from "../../models/status.model";

const AddEditCity = () => {
   
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const defaultvalue = () => {
        let keys = { ...cityType }
        Object.keys(cityType).map(itm => {
            keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const [form, setform] = useState(defaultvalue())
    //   For Getting Continent data
    const [continentdata, setcontinentdata] = useState([]);
    const GetContinentData = () => {
        ApiClient.get(`api/continent/listing`,{status:'active',count:500}).then(res => {
            if (res.success == true) {
                setcontinentdata(res.data);
            }
        })
    }
    //  For Getting the Country Data
    const [countrydata, setcountrydata] = useState([]);
    const GetCountryData = () => {
        ApiClient.get(`api/country/listing`,{status:'active',count:500}).then(res => {
            if (res.success == true) {
                setcountrydata(res.data)
            }
        })
    }
    //  Get the Region Data
    const [regiondata, setregiondata] = useState([])
    const GetRegionData = () => {
        ApiClient.get(`api/region/listing`,{status:'active',count:500}).then(res => {
            if (res.success == true) {
                setregiondata(res.data)
            }
        })
    }
    useEffect(() => {
        GetContinentData();
        GetCountryData();
        GetRegionData();
    }, [])

    const formValidation = [
        { key: 'status', required: true },
        { key: 'regionId',required: true },
        { key: 'countryId', required: true },
        { key: 'continent', required: true },
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        // URL
        let url = 'api/city'
        let value = {
            ...form
        }
        if (value.id) {
            url = 'api/city/update'
            method = 'put'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/cities")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            // API
            ApiClient.get('api/city/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = defaultvalue()
                    let oarr = Object.keys(defaultvalue())
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    payload.countryId=value.countryId?._id
                    payload.continent=value.continent?._id
                    payload.regionId=value.regionId?._id
                    
                    setform(payload)
                    setSubmitted(false)
                }
                loader(false)
            })
        }
    }, [id])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} City</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Continent<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                placeholder="Select Continent"
                                displayValue="name"
                                intialValue={form.continent}
                                result={e => { setform({ ...form, continent: e.value }) }}
                                options={continentdata}
                            />
                            {submitted && !form.continent ? <div className="text-danger">Continent is Required</div> : <></>}
                        </div>
                       
                        <div className="col-md-6 mb-3">
                            <label>Country<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                placeholder="Select Country"
                                displayValue="name"
                                intialValue={form.countryId}
                                result={e => { setform({ ...form, countryId: e.value }) }}
                                options={countrydata}
                            />
                            {submitted && !form.countryId ? <div className="text-danger">Country is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Region<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Region"
                                intialValue={form.regionId}
                                result={e => { setform({ ...form, regionId: e.value }) }}
                                options={regiondata}
                            />
                            {submitted && !form.regionId ? <div className="text-danger">Region is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
                            placeholder="Select Status"
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.status}
                                result={e => { setform({ ...form, status: e.value }) }}
                                options={statusModel.list}
                            />
                            {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                        </div>
                    </div>
                    <div className="text-right">
                        <Link to="/cities" className='btn btn-secondary discard mr-2'>Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditCity