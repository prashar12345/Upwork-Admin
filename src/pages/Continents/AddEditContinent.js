import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import ImageUpload from "../../components/common/ImageUpload";
import {  continentType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import AddEditContent from "../ContentManagement/AddEditContent";
import SelectDropdown from "../../components/common/SelectDropdown";
import statusModel from "../../models/status.model";

const AddEditContinent = () => { 
    const defaultvalue = continentType
    const [form, setform] = useState({status:"active"})
    const history=useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true }, 
    ]
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        //  URL Please
        let url = 'api/continent'
        let value = {
            ...form, 
        }
        if (value.id) {
            method = 'put'
            url = 'api/continent/update'
        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/continents")
            }
            loader(false)
        })
    } 

    useEffect(() => {
        if (id) {
            loader(true)
            //  Api Implement
            ApiClient.get('api/continent/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    setform({ ...payload })
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
                <h3 className="ViewUser mb-3">{form &&form.id?'Edit':'Add'} Continent</h3>
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
                    </div>
                    <div className="text-right">
                    <Link to="/continents" className='btn btn-secondary discard mr-2'>Back</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditContinent