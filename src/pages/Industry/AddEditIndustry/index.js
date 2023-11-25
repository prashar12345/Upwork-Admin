import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../../methods/methods";
import { userType } from "../../../models/type.model";
import Html from "./Html";
import { useHistory, useParams } from "react-router-dom";

const AddEditIndustry = () => {
    const { role, id } = useParams()
    const [images, setImages] = useState({ image: '',  });
    const defaultvalue = userType
    const [form, setform] = useState({ id:"",industryName:"",status:"active" })
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()
    const [roles, setRoles] = useState([])
    const [emailLoader, setEmailLoader] = useState(false) 
    const [emailErr, setEmailErr] = useState('') 
    const [detail, setDetail] = useState() 
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'industryName'},
        { key: 'image' },
        // { key: 'mobileNo', minLength: 10 },
        // { key: 'role', required:true },
        // { key: 'ic_number', minLength: 6 },
        // { key: 'password', minLength: 8 },
        // { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'password'] },
        // { key: 'dialCode', dialCode: true },
    ]

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    const handleSubmit = (e) => {
        console.log(handleSubmit,'hhhhhhh')
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid || emailErr) return
        let method = 'post'
        let url = 'industry'
        let value = {
            ...form,
            ...images

        }
        if (value.id) {
            method = 'put'
            url = 'industry'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                let url='/industry'
                if(role) url="/industry/"+role
                history.push(url)
            }
            loader(false)
        })
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


    

    // const getRoles=()=>{
    //     ApiClient.get('api/roles/listing',{status:'active'}).then(res=>{
    //         if(res.success){
    //             setRoles(res.data)
    //         }
    //     })
    // }


    // const emailCheck=(email)=>{
    //     let isValid=methodModel.emailvalidation(email)
    //     if(isValid){
    //         setEmailLoader(true)
    //         ApiClient.get('api/check/email',{email:email}).then(res=>{
    //             if(!res.success){
    //                 if(detail?.email!=email){
    //                     setEmailErr(res.error.message)
    //                 }
    //             }else{
    //                 setEmailErr('')
    //             }
    //             setEmailLoader(false)
    //         })
    //     }
    // }

    useEffect(() => {
        setSubmitted(false)
       
        if (id) {
            loader(true)
            ApiClient.get("industry", { id }).then(res => {
                if (res.success) {
                    let value=res.data
                    setform({industryName:value.industryName,status:value.status,id:value.id})
                    // setDetail(value)
                    // let payload = defaultvalue
                    // let oarr = Object.keys(defaultvalue)
                    // oarr.map(itm => {
                    //     payload[itm] = value[itm] || ''
                    // })                    
                    // setform({ ...payload })
                    // images.image = payload?.image
                    // // images.logo = payload?.logo
                    // setImages(images)
                }
                loader(false)
            })
        }
        // getRoles()
    }, [id])

    return <>
        <Html
            form={form}
            detail={detail}
            // emailCheck={emailCheck}
            emailLoader={emailLoader}
            emailErr={emailErr}
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

export default AddEditIndustry