import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { featureType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";

const AddEditRegion = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const [features, setFeatures] = useState([{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }])
    const [continentdata, setcontinentdata] = useState([]);
    const [countrydata, setcountrydata] = useState([]);
    const [currencydata, setcurrencydata] = useState([]);

    //   For Getting Continent data
    const GetContinentData = () => {
        ApiClient.get(`api/continent/listing`).then(res => {
            if (res.success == true) {
                setcontinentdata(res.data);
            }
        })
    }
    //   For Getting Continent data
    const GetCountryData = (p) => {
        ApiClient.get(`api/country/listing`,{status:'active',count:500,...p}).then(res => {
            if (res.success == true) {
                setcountrydata(res.data);
            }
        })
    }
    //  For Getting Currency Data
    const GetCurrencies = (p) => {
        ApiClient.get(`api/currency/listing`,{status:'active',count:500,...p}).then(res => {
            if (res.success == true) {
                setcurrencydata(res.data)
            }
        })
    }
    useEffect(() => {
        GetContinentData()
        GetCountryData()
        GetCurrencies()
    }, [])
    const defaultvalue = () => {
        let keys = { ...featureType }
        Object.keys(featureType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [form, setform] = useState(featureType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        { key: 'continent' , required: true },
        { key: 'currencyId', required: true },
        { key: 'country', required: true }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/region'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/region/update'
        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/regions")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/region/detail', { id }).then(res => {
                if (res.success) {
                    let data = res.data
                    data.continent = data.continent?data.continent._id:''
                    data.country = data.country?data.country._id:''
                    data.currencyId = data.currencyId?data.currencyId._id:''
                    setform(res.data)
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }
    }, [id])

    const onSelect = (e) => {
        console.log("onSelect", e)
    }

    const onRemove = (e) => {
        console.log("onRemove", e)
    }
    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Region</h3>
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
                                displayValue="name"
                                placeholder="Select Continent"
                                intialValue={form.continent}
                                result={e => { setform({ ...form, continent: e.value },GetCountryData({continentId: e.value})) }}
                                options={continentdata}
                            />
                            {submitted && !form.continent ? <div className="text-danger">Continent is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Country<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Country"
                                intialValue={form.country}
                                result={e => { setform({ ...form, country: e.value },GetCurrencies({country:e.value})) }}
                                options={countrydata}
                            />
                            {submitted && !form.country ? <div className="text-danger">Country is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Currency<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="currency"
                                placeholder="Select Currency"
                                intialValue={form.currencyId}
                                result={e => { setform({ ...form, currencyId: e.value }) }}
                                options={currencydata}
                            />
                            {submitted && !form.currencyId ? <div className="text-danger">Currency is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
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
                        <Link to="/regions" className='btn btn-secondary discard mr-2'>Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditRegion