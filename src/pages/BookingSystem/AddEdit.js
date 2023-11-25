import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { bookingSystemType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";

const AddEditBookingSystem = () => {

    const defaultvalue = () => {
        let keys = { ...bookingSystemType }
        Object.keys(bookingSystemType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [form, setform] = useState(bookingSystemType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'name', required: true }
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/bookingsystem'
        let value = {
            ...form
        }
        if (value.id) {
            method = 'put'
            url = 'api/bookingsystem/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/bookingSystem")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/bookingsystem/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = bookingSystemType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (value.permissions) {
                        payload.permissions = { ...value.permissions[0] }
                        // payload.permissions={ ...payload.permissions,...value.permissions}
                    }
                    console.log("payload", payload)

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

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Booking System</h3>

                    <div className="form-row">
                        <div className="col-md-12 mb-3">
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
                            <label>Name<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Booking System"
                                intialValue={form.name}
                                result={e => {setform({...form,name:e.value})}}
                                options={bookingSystemModel.list}
                            />
                             {submitted && !form.name?<div className="text-danger">Name is Required</div>:<></>}
                        </div> */}
                        <div className="col-md-12 mb-3">
                            <label>Api Key<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.apiKey}
                                onChange={e => setform({ ...form, apiKey: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Secret Key<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.secretKey}
                                onChange={e => setform({ ...form, secretKey: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                    <Link to="/bookingSystem" className="btn btn-secondary discard mr-2">Back</Link>
                        <button type="submit" className="btn btn-primary mb-0">Save</button>
                    </div>
                </div>


            </form>
        </Layout>
    </>
}

export default AddEditBookingSystem