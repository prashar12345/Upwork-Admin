import React, { useEffect, useState } from 'react'
import statusModel from '../../../models/status.model'
import loader from '../../../methods/loader';
import ApiClient from '../../../methods/api/apiClient';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import Layout from '../../../components/global/layout';
import SelectDropdown from '../../../components/common/SelectDropdown';
import { useSelector } from 'react-redux';
import environment from '../../../environment';

export default function AddEditSkills() {
    const user=useSelector(state=>state.user)
    const {id}=useParams();
    const Navigate=useHistory();
    const [form,setform]=useState({ id:"",name:"",status:"active",skillType:""})
    const [submitted,setsubmitted]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        loader(true); 
        setsubmitted(true);
        let method="post";
        const payload=form
        let url="skill";
        if(id){method="put";payload.id=id}else{delete payload.id}
        ApiClient.allApi(url,payload,method).then(result=>{
            if(result.success){
                toast.success(result.message)
    Navigate.push("/skills")
            }
            loader(false);
        })
        
    }
        //  ############ Skills Types########
        const [SkillTypesdata,setSkillsTypedata]=useState([])
        const GetSkillsTypes=()=>{
            loader(true);
            ApiClient.get(`skill/types?status=active`).then(res=>{
    if(res.success){
      

setSkillsTypedata(res.data);
    }
    loader(false)
            })
        }
    useEffect(()=>{
        GetSkillsTypes();
if(id){
    ApiClient.get(`skill?id=${id}`).then(result =>{
        if(result.success){
            const newdata=result.data;
            setform({name:newdata.name,status:newdata.status,skillType:newdata?.skillType?.id})
        }
    })
}
    },[])

    const isAllow=(key='')=>{
        let permissions=user.role?.permissions
        let value=permissions?.[key] 
        if(user.role.id==environment.adminRoleId) value=true
        return value
    }
  return (
    <Layout>
    <form onSubmit={e=>handleSubmit(e)}>
        <div className="pprofile1">
            <h3 className='ViewUser'>{id ? 'Edit' : 'Add'} Skill</h3>
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
                <label>
                   Skill Type<span className="star">*</span>
                </label>
          <select className='form-control' required onChange={e=>setform({...form,skillType:e.target.value})} value={form.skillType} >
            <option value="">Select Master Skill</option>
            {SkillTypesdata.map((item,index)=>(
                <option className='text-capitalize' value={item.id}>{item.name}</option>
            ))}
          </select>
              </div>  
                <div className="col-md-6 mb-3">
                <label>
                  Status<span className="star">*</span>
                </label>
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

            </div>


            <div className="text-right">
                <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>Navigate.goBack()}>Back</button>
                {!id||(id&&isAllow('editSkills'))?<button type="submit" className="btn btn-primary">Save</button>:null}
            </div>
        </div>

    </form>
</Layout>
  )
}
