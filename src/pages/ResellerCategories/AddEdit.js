import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import ImageUpload from "../../components/common/ImageUpload";
import {  resellerCategoryType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";

const AddEditCategory = () => {
    const [images, setImages] = useState({ image: '' });
    const defaultvalue = resellerCategoryType
    const [form, setform] = useState({})
    const history=useHistory()
    const [submitted, setSubmitted] = useState(false)
    const { id } = useParams()
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'mobileNo', minLength: 9 },
        { key: 'ic_number', minLength: 6 },
        { key: 'dialCode', dialCode: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/category'
        let value = {
            ...form,
            ...images,
            catType: 'Reseller'
        }
        if (value.id) {
            method = 'put'
            url = 'api/category/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/reseller-categories")
            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/category/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    setform({ ...payload })
                    setSubmitted(false)
                    images.image = value?.image
                    setImages(images)
                }
                loader(false)
            })
        }
    }, [id])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                <h3 className="ViewUser mb-3">{form &&form.id?'Edit':'Add'} Reseller Category</h3>
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


                        {/* <div className="col-md-12 mb-3">
                                    <label>Description<span className="star">*</span></label>
                                    <textarea
                                        className="form-control"
                                        value={form.description}
                                        onChange={e => setform({ ...form, description: e.target.value })}
                                        required
                                    />
                                </div> */}
                        <div className="col-md-6  mb-3">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} />
                        </div>
                    </div>
                    <div className="text-right">
                    <Link type="button" className="btn btn-secondary discard mr-2" to="/reseller-categories">Back</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
                </div>

                
            </form>
        </Layout>
    </>
}

export default AddEditCategory