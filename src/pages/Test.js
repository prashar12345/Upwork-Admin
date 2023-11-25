import React, { useEffect, useState } from 'react'
import ApiClient from '../methods/api/apiClient'
const Test=()=>{
    const [form,setform]=useState({email:'',password:''})
    useEffect(()=>{
        
    },[])


    const handleSubmit=(e)=>{
        e.preventDefault()
        ApiClient.post('login',form).then(res=>{
            console.log("res",res)
        })
    }

    return <>
    <form onSubmit={handleSubmit}>
        <input type="email" required value={form.email} className="form-control mb-3" onChange={e=>setform({...form,email:e.target.value})}  />
        <input type="text" required value={form.password} className="form-control mb-3" onChange={e=>setform({...form,password:e.target.value})}  />
        <button className='btn btn-primary'>Submit</button>
    </form>
    </>
}

export default Test