import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import { CategoryType } from "../../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";
import statusModel from "../../../models/status.model"
import { toast } from "react-toastify";

const AddEditProductCategory = () => {
    const [images, setImages] = useState({ image: '', banner: '', icon: '' });
    const defaultvalue = CategoryType
    const { id, type } = useParams()
    const [form, setform] = useState({ defaultvalue, catType: type ? type : '' })
    const [categories, setCategories] = useState([])
    const [tab, setTab] = useState('info')
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', required: true },
        { key: 'status', required: true },
        { key: 'catType', required: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (tab == 'seo' && (invalid)) {
            toast.error("Please fill Required Fields")
        }
        if (invalid) return
        let method = 'post'
        let url = 'api/category'
        let value = {
            ...form,
            ...images,
            bannerOverlayBody: form.tiny_bannerOverlayBody,
            subParentCategory: CategoryChange(form.parentCategory),
            description: form.tiny_description,
            parentCategory: form.parentCategory ? form.parentCategory : null
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
                setTimeout(() => {
                    toast.success(res.message)
                }, 100);
                history.push(`/category/product/${type}`)
            }
            loader(false)
        })
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
    }

    const getCategory = (t=type) => {
        ApiClient.get("api/categories/dropdown", { page: 1, count: 100, catType: t, status: 'active' }).then(res => {
            if (res.success) {
                setCategories(res.data)
            }
        })
    }

    const CategoryChange = (e) => {
        let ext = categories.find(itm => itm.id == e)
        let value = null
        if (ext && ext.parentCategory) value = ext.parentCategory._id
        return value
    }

    const back = () => {
        history.goBack()
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
                    if (payload.parentCategory) payload.parentCategory = payload.parentCategory._id
                    // if (payload.subParentCategory) payload.subParentCategory = payload.subParentCategory._id
                    setform({
                        ...payload,
                        tiny_bannerOverlayBody: payload.bannerOverlayBody,
                        tiny_description: payload.description,
                    })
                    Object.keys(images).map(itm => {
                        images[itm] = value?.[itm]
                    })
                    setImages(images)
                }
                loader(false)
            })
        } else {
            let payload = defaultvalue
            Object.keys(defaultvalue).map(itm => {
                payload[itm] = ''
            })
            if (type) payload.catType = type
            payload.status = 'active'
            payload.featured = 'No'
            setform(payload)
        }
        getCategory()
    }, [id])

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Product Category</h3>
                    <div className="form-row">
                        {tab == 'info' ? <>
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
                                <label>Parent Category</label>
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Set as Parent"
                                    intialValue={form.parentCategory}
                                    result={e => { setform({ ...form, parentCategory: e.value }) }}
                                    options={categories}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Status<span className="star">*</span></label>
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Status"
                                    intialValue={form.status}
                                    result={e => { setform({ ...form, status: e.value }) }}
                                    options={statusModel.list}
                                />
                                {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                            </div>
                            <div className="col-md-6  mb-3">
                                <label className='lablefontcls'>Image</label><br></br>
                                <ImageUpload model="users" result={e => imageResult(e, 'banner')} value={images.banner || form.banner} />
                            </div>
                        </> : <>
                            <div className="col-md-12 mb-3">
                                <label>URL Key</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.urlKey}
                                    onChange={e => setform({ ...form, urlKey: e.target.value })}
                                />
                                <div className="small">Leave empty to auto generate</div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Meta Title<span className="star">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.metaTitle}
                                    onChange={e => setform({ ...form, metaTitle: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Meta Description<span className="star">*</span></label>
                                <textarea
                                    className="form-control"
                                    value={form.metaDescription}
                                    onChange={e => setform({ ...form, metaDescription: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label>Keywords<span className="star">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.keywords}
                                    onChange={e => setform({ ...form, keywords: e.target.value })}
                                    required
                                />
                            </div>
                        </>}


                    </div>
                    <div className="text-right">
                        <button type="button" className="btn btn-secondary mr-2 discard" onClick={e => back()}>Back</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditProductCategory