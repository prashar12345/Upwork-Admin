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


const AddEditFeature = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const [features, setFeatures] = useState([{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }])

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
    const [categories,setcategories] = useState()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/feature'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/feature/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/features")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/feature/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = featureType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (value.permissions) {
                        payload.permissions = { ...value.permissions[0] }
                        // payload.permissions={ ...payload.permissions,...value.permissions}
                    }
                    if(value.category){
                        payload.category = value.category._id
                    }

                    setform({
                        ...payload
                    })
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

    const getCategoires=()=>{
        ApiClient.get(`api/categories/listing`,{catType:'64ad2ebce5aa778d26a54f02',status:'active'}).then(res=>{
            setcategories(res.data)
        })
    }

    useEffect(()=>{
        getCategoires()
    },[])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Plan Feature</h3>

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
                            <label>Categories<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.category}
                                result={e => {setform({...form,category:e.value})}}
                                options={categories}
                            />
                             {submitted && !form.status?<div className="text-danger">Categories is Required</div>:<></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Category"
                                intialValue={form.status}
                                result={e => {setform({...form,status:e.value})}}
                                options={statusModel.list}
                            />
                             {submitted && !form.status?<div className="text-danger">Status is Required</div>:<></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Tooltip<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.description}
                                onChange={e => setform({ ...form, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <Link to="/features" className='btn btn-secondary discard mr-2'>Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditFeature