import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import { userType } from "../../../models/type.model";
import Html from "./Html";
import { useHistory, useParams } from "react-router-dom";
import environment from "../../../environment";
import { toast } from "react-toastify";

const AddEditUser = () => {
    const { role, id } = useParams()
    const [images, setImages] = useState({ image: '', logo: '' });
    const defaultvalue = userType
    const [form, setform] = useState({ role, status:"active",dialCode:"+1"})
    console.log(form,"Form");
    const [set, setState] = useState()
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const [roles, setRoles] = useState([])
    const [emailLoader, setEmailLoader] = useState(false) 
    const [emailErr, setEmailErr] = useState('') 
    const [ChangeStatus, setChangeStatus] = useState('') 
    const [detail, setDetail] = useState() 
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'mobileNo', minLength: 10 },
        { key: 'role', required:true },
        { key: 'ic_number', minLength: 6 },
        { key: 'password', minLength: 8 },
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'password'] }, 
    ]

    const getError = (key) => {
        // return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        if(form.mobileNo==""){toast.error("Mobile Number is Required"); return false;}
        // let invalid = methodModel.getFormError(formValidation, form)
        // if (invalid || emailErr) return 
        let method = 'post'
        let url = 'add/user'
        let value = {
            ...form,
            ...images
        }
        if (value.id) {
            method = 'put'
            url = 'edit/profile'
        } else {
            delete value.id
        }
        
        if(form.dialCode!=""){
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                toast.success(res.message)
                let url='/users'
                if(role) url="/users/"+role
                history.push(url)
            }
            loader(false)
        })}
    }

    const imageResult = (e, key) => {
        images[key] = e.value
        setImages(images)
        console.log("imageResult", e)
    }

    const addressResult = (e) => {
        setform({ ...form, address: e.value })
    }

    const back=()=>{
        history.goBack()
    }


    const getRoles=()=>{
        ApiClient.get('roles',{status:'active'}).then(res=>{
            if(res.success){
                let newarray=[]
                res.data&&res.data.map((item,index)=>{
                  if(item.id!=environment.adminRoleId){
                 newarray.push(item)
                  }
                })
                setRoles(newarray)
            }
        })
    }


    const emailCheck=(email)=>{
        let isValid=methodModel.emailvalidation(email)
        if(isValid){
            setEmailLoader(true)
            ApiClient.get('check/Email',{email:email}).then(res=>{
                if(!res.success){
                    if(detail?.email!=email){
                        setEmailErr(res.error.message)
                    }
                }else{
                    setEmailErr('')
                }
                setEmailLoader(false)
            })
        }
    }

    useEffect(() => {
        setSubmitted(false)
        // setState()
        if (id) {
            loader(true)
            ApiClient.get("user/details", { id }).then(res => {
                if (res.success) {
                    let value=res.data
                    setDetail(value)
                    let payload = defaultvalue
                    let oarr = Object.keys(defaultvalue)
                    oarr.map(itm => {
                        payload[itm] = value[itm] || ''
                    })
                    payload.dialCode=value.dialCode
                    payload.role=value.role.id 
                    payload.status=value.status 
                    setform({ ...payload, })
                    images.image = payload?.image
                    images.logo = payload?.logo
                    setImages(images)
                }
                loader(false)
            })
        }
        getRoles()
    }, [id])

    return <>
        <Html
            form={form}
            detail={detail}
            emailCheck={emailCheck}
            emailLoader={emailLoader}
            emailErr={emailErr}
            ChangeStatu={ChangeStatus}
            back={back}
            setEyes={setEyes}
            eyes={eyes}
            role={role}
            setform={setform}
            roles={roles}
            submitted={submitted}
            images={images}
            addressResult={addressResult}
            handleSubmit={handleSubmit}
            imageResult={imageResult}
            getError={getError}
        />
    </>
}

export default AddEditUser