import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import ImageUpload from "../../components/common/ImageUpload";
import { resellerCategoryType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";

const AddEditCountry = () => {
    const [form, setform] = useState({status:"active"})
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const [continentdata, setcontinentdata] = useState([]);
    const [currencydata, setcurrencydata] = useState([]);
    
    //   For Getting Continent data
    const GetContinentData = () => {
        ApiClient.get(`api/continent/listing`,{status:'active',count:500}).then(res => {
            if (res.success == true) {
                setcontinentdata(res.data);
            }
        })
    }
    //  For Getting Currency Data
    const GetCurrencies = () => {
        ApiClient.get(`api/currency/listing`,{status:'active',count:500}).then(res => {
            if (res.success == true) {
                setcurrencydata(res.data)
            }
        })
    }
    useEffect(() => {
        GetContinentData()
        GetCurrencies()
    },[])
    
    const formValidation = [
        { key: 'status', required: true },
        { key: 'continent', required: true },
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        // URL
        let url = 'api/country'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/country/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/countries")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            // API
            ApiClient.get(`api/country/detail?id=${id}`).then(res => {
                if (res.success) {
                    let data = res.data
                    data.continent=data.continent?data.continent._id:''
                    data.currencyId=data.currencyId?data.currencyId._id:null
                    setform(data)
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
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Country</h3>
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
                            <label>Currency<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                placeholder="Select Currency"
                                displayValue="currency"
                                intialValue={form.currencyId}
                                result={e => { setform({ ...form, currencyId: e.value }) }}
                                options={currencydata}
                            />
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Region<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.region}
                                result={e => { setform({ ...form, region: e.value }) }}
                                options={region}
                            />
                            {submitted && !form.region ? <div className="text-danger">Region is Required</div> : <></>}
                        </div> */}
                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.status}
                                result={e => { setform({ ...form, status: e.value }) }}
                                options={statusModel.list}
                            />
                            {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Product Count<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.productCount}
                                onChange={e => setform({ ...form, productCount: e.target.value })}
                                required
                            />
                        </div> */}
                    </div>
                    <div className="text-right">
                        <Link to="/countries" className='btn btn-secondary discard mr-2'>Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditCountry