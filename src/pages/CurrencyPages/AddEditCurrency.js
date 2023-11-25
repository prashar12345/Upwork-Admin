import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods"; 
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout"; 
import SelectDropdown from "../../components/common/SelectDropdown";

const AddEditCurrency = () => {  
    const [form, setform] = useState({country:""})
    const history=useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const [country, setcountry] = useState([])
    const formValidation = [ 
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        //  URL Please
        let url = 'api/currency'
        let value = {
            ...form, 
        }
        if (value.id) {
            method = 'put'
            url = 'api/currency/update'
            value={
                ...form, id: id
            }
        } else {
            delete value.id
        }

        if (form.country=="") {
            alert('Please select country fields');
            return;
          } 

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/currency")
            }
            loader(false)
        })
    } 

    useEffect(() => {
        if (id) {
            getdetail()
        }
    }, [id])

    const getdetail=()=>{
        loader(true)
        ApiClient.get(`api/currency/detail?id=${id}`).then(res=>{
            if(res.success){
                setform(res.data)
            }
            loader(false)
        })
    }

    useEffect(()=>{
        getCountries()
    },[])

    const getCountries=()=>{
        ApiClient.get(`api/country/listing?page=1&count=50`).then(res=>{
            if(res.success){
                setcountry(res.data)
            }
        })
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                <h3 className="ViewUser mb-3">{form &&form.id?'Edit':'Add'} Currency</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.currency}
                                onChange={e => setform({ ...form, currency: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Country<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.country}
                                result={e => {setform({...form,country:e.value})}}
                                options={country}
                                onChange={(e) => setcountry({...form, country: e.target.value})}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Symbol<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.symbol}
                                onChange={e => setform({ ...form, symbol: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>ISO<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.isoCode}
                                onChange={e => setform({ ...form, isoCode: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                    <Link to="/currency" className="btn btn-secondary discard mr-2">Back</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditCurrency