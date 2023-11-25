import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
import {  roleType } from '../../models/type.model';
import { Link, useHistory, useParams } from 'react-router-dom';
import Layout from '../../components/global/layout';
import statusModel from '../../models/status.model';
import SelectDropdown from '../../components/common/SelectDropdown';
import { toast } from 'react-toastify';
import environment from '../../environment';

const AddEditRole = () => {
  const defaultvalue = () => {
    let keys = { ...roleType };
    Object.keys(roleType).map((itm) => {
      if (itm != 'permissions') keys[itm] = '';
    });
    Object.keys(roleType.permissions).map((itm) => {
      keys.permissions[itm] = false;
    });
    keys.status = 'active';
    return keys;
  };
  const { id } = useParams();
  const [form, setform] = useState(roleType);
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const formValidation = [
    { key: 'status', required: true },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;
    let method = 'post';
    let url = 'role';
    let value = {
      ...form,
    };
    if (value.id) {
      method = 'put';
      url = 'role';
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history.push('/roles');
      }
      loader(false);
    });
  };

  const setpermission = (key, value) => {
    setform({
      ...form,
      permissions: {
        ...form.permissions,
        [key]: value,
      },
    });
  };

  useEffect(() => {
    if (id) {
      setform({})
      loader(true);
      ApiClient.get('role', { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = {id:'',name:'',status:'active',permissions:{
            //  Done
            readDashboard:false,
            readCustomer:false,
            readAssessment:false,
            editAssessment:false,
            deleteAssessment:false,
            addAssessment:false,
            addQuestion:false,
            editQuestion:false,
            readQuestion:false,
            addCustomer:false,
            editCustomer:false,
            deleteCustomer:false,
            readRole:false,
            addRole:false,
            editRole:false, 
            readSkillType:false,
            addSkillType:false,
            editSkillType:false,
            deleteSkillType:false,
            // Done
            readCategory:false,
            addCategory:false,
            editCategory:false,
            deleteCategory:false,
            readResellerCategory:false,
            addResellerCategory:false,
            editResellerCategory:false,
            deleteResellerCategory:false,
            readAdmins:false,
            addAdmins:false,
            editAdmins:false,
            deleteAdmins:false,
            readTypes:false,
            addTypes:false,
            editTypes:false,
            deleteTypes:false,
            readCategory:false,
            addCategory:false,
            editCategory:false,
            deleteCategory:false,
            readResellerCategory:false,
            addResellerCategory:false,
            editResellerCategory:false,
            deleteResellerCategory:false,
            readPlanFeatures:false,
            addPlanFeatures:false,
            editPlanFeatures:false,
            deletePlanFeatures:false,
            readPlan:false,
            addPlan:false,
            editPlan:false,
            deletePlan:false,
            readCoupons:false,
            addCoupons:false,
            editCoupons:false,
            deleteCoupons:false,
            readCurrency:false,
            addCurrency:false,
            editCurrency:false,
            deleteCurrency:false,
            readBooking:false,
            addBooking:false,
            editBooking:false,
            deleteBooking:false,
            refreshBooking:false,
            readContinents:false,
            addContinents:false,
            editContinents:false,
            deleteContinents:false,
            readCountries:false,
            readContent:false,
            editContent:false,
            addCountries:false,
            editCountries:false,
            deleteCountries:false,
            readRegion:false,
            addRegion:false,
            editRegion:false,
            deleteRegion:false,
            readCities:false,
            addCities:false,
            editCities:false,
            deleteCities:false,
            readEmailTemplate:false,
            addEmailTemplate:false,
            editEmailTemplate:false}};

          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          });
          payload.loginPannel=value.loginPannel
          if (value.permissions) {
            payload.permissions = value.permissions ;
            // payload.permissions={ ...payload.permissions,...value.permissions}
          }
          console.log('payload', payload);
 
          setform({
            ...payload,
          });
        }
        loader(false);
      });
    } else {
      setform(defaultvalue());
    }
  }, [id]);
  //  For Handling Category Checkbboxs
  const handleallCategorycheckbox = (check) => {
    let value = true
    if (check) {
      value = true
    }
    else {
      value = false
    };
    setform({
      ...form,
      permissions: {
        ...form.permissions,
        readSkillType: value,
        addSkillType: value,
        editSkillType: value,
        deleteSkillType: value
      },
    });

  }
  //  For Handling Dashboard permission
  const hanldealldashboardpermission = (check) => {
    let value = true
    if (check) {value = true}
    else {value = false
    };
    setform({...form,permissions: {...form.permissions,readDashboard:value}});

  }
  //  For Handling Skills Permission
const HandleCutomerPer=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readSkills:value,addSkills:value,deleteSkills:value,editSkills:value}});
  }
  //  For Handling Role Permission
  const handleRolesPer=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readRole:value,addRole:value,editRole:value}});
  }
  const handleAdminUser=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readAdmins:value,addAdmins:value,deleteAdmins:value,editAdmins:value}});
  }
  const handleTypesPer=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readTypes:value,addTypes:value,deleteTypes:value,editTypes:value}});
  }
  const handleResellCateg=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readResellerCategory:value,addResellerCategory:value,deleteResellerCategory:value,editResellerCategory:value}});
  }
  const handlePlanFeature=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readPlanFeatures:value,addPlanFeatures:value,deletePlanFeatures:value,editPlanFeatures:value}});
  }
  const  handlePlanPre=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readPlan:value,addPlan:value,deletePlan:value,editPlan:value}});
  }
  const  handleCoupons=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readCoupons:value,addCoupons:value,deleteCoupons:value,editCoupons:value}});
  }
  const handleCurrencyPre=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readCurrency:value,addCurrency:value,deleteCurrency:value,editCurrency:value}});
  }
  const handleBookingPre=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readBooking:value,addBooking:value,deleteBooking:value,editBooking:value,refreshBooking:value}});
  }
  const HandleContinent=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readContinents:value,addContinents:value,deleteContinents:value,editContinents:value}});
  }
  const handleCountriuesPre=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readCountries:value,addCountries:value,deleteCountries:value,editCountries:value}});
  }
  const HandleRegionPre=(check)=>{
    let value=check?true:false
    setform({...form,permissions: {...form.permissions,readRegion:value,addRegion:value,deleteRegion:value,editRegion:value}});
  }
const HandleCitiesPre=(check)=>{
  let value=check?true:false
    setform({...form,permissions: {...form.permissions,readCities:value,addCities:value,deleteCities:value,editCities:value}});
}
const handleEmailPre=(check)=>{
  let value=check?true:false
    setform({...form,permissions: {...form.permissions,readEmailTemplate:value,addEmailTemplate:value,editEmailTemplate:value}});
}
const HandleContentper=(check)=>{
let value=check?true:false;
setform({...form,permissions:{...form.permissions,readContent:value,editContent:value}});
}

const HandleAll=(check)=>{
  let value=check?true:false;
  let permissions=roleType.permissions
  Object.keys(permissions).map(itm=>{
    permissions[itm]=value
  })
  setform({...form,permissions: permissions});
}

const isAllChecked=()=>{
  let value=true;
  let permissions=form.permissions
  Object.keys(permissions).map(itm=>{
    if(!permissions[itm]) value=false
  })
  return value
}

const HandleAllRead=(check)=>{
  let value=check?true:false;
  // setform({...form,permissions: {...form.permissions,readAdmins:value,readBooking:value,readCategory:value,readCities:value,readContinents:value,readCountries:value,readCoupons:value,readCurrency:value,readCustomer:value,readDashboard:value,readEmailTemplate:value,readPlan:value,readPlanFeatures:value,readRegion:value,readResellerCategory:value,readRole:value,readTypes:value}});
  setform({...form,permissions: {...form.permissions,readAssessment:value,readQuestion:value, readAdmins:value,readDashboard:value,readRole:value,readTypes:value,readSkills:value,readSkillType:value,readContent:value}});
}
const HandleAllAdd=(check)=>{
  let value=check?true:false;
  // setform({...form,permissions: {...form.permissions,addAdmins:value,addBooking:value,addCategory:value,addCities:value,addContinents:value,addCountries:value,addCoupons:value,addCurrency:value,addCustomer:value,addEmailTemplate:value,addPlan:value,addPlanFeatures:value,addRegion:value,addResellerCategory:value,addRole:value,addTypes:value}});
  setform({...form,permissions: {...form.permissions,addAdmins:value,addAssessment:value,addQuestion:value,addRole:value,addSkills:value,addTypes:value,addSkillType:value}});
}
const HandleallEdit=(check)=>{
  let value=check?true:false;
  // setform({...form,permissions: {...form.permissions,editAdmins:value,editBooking:value,editCategory:value,editCities:value,editContinents:value,editCountries:value,editCoupons:value,editCurrency:value,editRole:value,editCustomer:value,editEmailTemplate:value,editPlan:value,editPlanFeatures:value,editRegion:value,editResellerCategory:value,editTypes:value}});
  setform({...form,permissions: {...form.permissions,editAdmins:value,editAssessment:value,editQuestion:value,editRole:value,editSkills:value,editTypes:value,editSkillType:value,editContent:value}});
}
const HandleAllDelete=(check)=>{
  let value=check?true:false;
  // setform({...form,permissions: {...form.permissions,deleteAdmins:value,deleteBooking:value,deleteCategory:value,deleteCities:value,deleteContinents:value,deleteCountries:value,deleteCoupons:value,deleteCurrency:value,deleteCustomer:value,deletePlan:value,deletePlanFeatures:value,deleteRegion:value,deleteResellerCategory:value,deleteRole:value,deleteTypes:value}});
  setform({...form,permissions: {...form.permissions,deleteAdmins:value,deleteSkills:value,deleteTypes:value,deleteAssessment:value,deleteQuestion:value,deleteSkillType:value}});
}
const HandleRefreshAll=(check)=>{
  let value=check?true:false;
  setform({...form,permissions: {...form.permissions,refreshBooking:value}});
}
useEffect(()=>{
  setform({...form,permissions:roleType.permissions})
},[id])


const isAllow=(key='')=>{
  let permissions=user.role?.permissions
  let value=permissions?.[key] 
  if(user.role.id==environment.adminRoleId) value=true
  return value
}

const HandleAssessmentPer=(check)=>{
  let value=check?true:false;
  setform({...form,permissions:{...form.permissions,readAssessment:value,editAssessment:value,addAssessment:value,deleteAssessment:value}})
}
const handleQuestion=(check)=>{
  let value=check?true:false;
  setform({...form,permissions:{...form.permissions,readQuestion:value,editQuestion:value,addQuestion:value,deleteQuestion:value}})
}
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <h3 className="ViewUser mb-3">
              {form && form.id ? 'Edit' : 'Add'} Role
            </h3>

            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label>
                  Name<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={form.name}
                  onChange={(e) => setform({ ...form, name: e.target.value })}
                  required
                />
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
              <div className="col-md-6 mb-3">
                <label>
                  Login From<span className="star">*</span>
                </label>
                <SelectDropdown
                  id="statusDropdown"
                  displayValue="name"
                  placeholder="Select Login from"
                  intialValue={form.loginPannel}
                  result={e => { setform({ ...form, loginPannel: e.value }) }}
                  options={statusModel.loginfrom}
                />
                {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
              </div>
              <div className="col-md-12 mb-3">
                <h5 className='mb-0 mt-4'><b>Permissions</b></h5>
                {/* roles */}
                {/* 1st */}
                <div class="table-responsive">
                  <div class="table_section tablepadding">
                    <table class="table table-striped">
                      <thead class="table_head roleTable">
                        <tr class="heading_row">
                          <th scope="col" class="table_data"></th>
                          <th scope="col" class="table_data">
                          <input
                            type="checkbox"  onChange={e=>HandleAll(e.target.checked)} checked={isAllChecked()}/>
                            
                            All</th>
                          <th scope="col" class="table_data">  
                          <input
                            type="checkbox"  onChange={e=>HandleAllRead(e.target.checked)} checked={
                              // form.permissions.readAdmins&&form.permissions.readBooking&&form.permissions.readCategory&&form.permissions.readCities&&form.permissions.readContinents&&form.permissions.readCountries&&form.permissions.readCountries&&form.permissions.readCoupons&&form.permissions.readCurrency&&form.permissions.readCustomer&&form.permissions.readDashboard&&form.permissions.readEmailTemplate&&form.permissions.readPlan&&form.permissions.readPlanFeatures&&form.permissions.readRegion&&form.permissions.readResellerCategory&&form.permissions.readRole&&form.permissions.readTypes
                            form.permissions.readQuestion&&form.permissions.readAssessment&&form.permissions.readDashboard&&form.permissions.readRole&&form.permissions.readAdmins&&form.permissions.readTypes&&form.permissions.readSkills&&form.permissions.readSkillType&&form.permissions.readContent
                              }/>Read</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" onChange={e=>HandleAllAdd(e.target.checked)} checked={
                              // form.permissions.addAdmins&&form.permissions.addBooking&&form.permissions.addCategory&&form.permissions.addCities&&form.permissions.addContinents&&form.permissions.addCountries&&form.permissions.addCoupons&&form.permissions.addCurrency&&form.permissions.addCustomer&&form.permissions.addEmailTemplate&&form.permissions.addPlan&&form.permissions.addPlanFeatures&&form.permissions.addRegion&&form.permissions.addResellerCategory&&form.permissions.addRole&&form.permissions.addTypes
                          form.permissions.addQuestion&&form.permissions.addAssessment&&form.permissions.addRole&&form.permissions.addAdmins&&form.permissions.addTypes&&form.permissions.addSkills&&form.permissions.addSkillType
                              } />Add</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" onChange={e=>HandleallEdit(e.target.checked)} checked={
                              // form.permissions.editAdmins&&form.permissions.editBooking&&form.permissions.editCategory&&form.permissions.editCities&&form.permissions.editContinents&&form.permissions.editCountries&&form.permissions.editCoupons&&form.permissions.editCurrency&&form.permissions.editCustomer&&form.permissions.editEmailTemplate&&form.permissions.editPlan&&form.permissions.editPlanFeatures&&form.permissions.editRegion&&form.permissions.editResellerCategory&&form.permissions.editRole&&form.permissions.editTypes
                             form.permissions.editQuestion&&form.permissions.editAssessment&&form.permissions.editRole&&form.permissions.editAdmins&&form.permissions.editTypes&&form.permissions.editSkills&&form.permissions.editSkillType&&form.permissions.editContent
                              } />Edit</th>
                          <th scope="col" class="table_data"> <input
                            type="checkbox" onChange={e=>HandleAllDelete(e.target.checked)} checked={
                              // form.permissions.deleteAdmins&&form.permissions.deleteBooking&&form.permissions.deleteCategory&&form.permissions.deleteCities&&form.permissions.deleteContinents&&form.permissions.deleteCountries&&form.permissions.deleteCoupons&&form.permissions.deleteCurrency&&form.permissions.deleteCustomer&&form.permissions.deletePlan&&form.permissions.deletePlanFeatures&&form.permissions.deleteRegion&&form.permissions.deleteResellerCategory&&form.permissions.deleteRole&&form.permissions.deleteTypes
                             form.permissions.deleteQuestion&&form.permissions.deleteAssessment&&form.permissions.deleteAdmins&&form.permissions.deleteTypes&&form.permissions.deleteSkills&&form.permissions.deleteSkillType
                              } />Delete</th>
                          {/* <th scope="col" class="table_data"> <input
                            type="checkbox"  onChange={e=>HandleRefreshAll(e.target.checked)} checked={form.permissions.refreshBooking}/>Refresh</th> */}
                        </tr>
                      </thead>
                      <tbody className='roleTable'>
                        <tr>
                          <td><b>Dashboard</b></td>
                          <td><input type="checkbox" onChange={(e) => hanldealldashboardpermission(e.target.checked)}  checked={form.permissions.readDashboard}/></td>
                          <td><div className="checkList">
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readDashboard}
                                onChange={(e) =>
                                  setpermission('readDashboard', e.target.checked)
                                }
                                
                              />{' '}

                            </label>
                          </div></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>

                      
                        <tr>
                          <td><b>Roles</b></td>
                          <td><input type="checkbox" onChange={(e)=>handleRolesPer(e.target.checked)} checked={form.permissions.readRole&&form.permissions.addRole&&form.permissions.editRole} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readRole}
                                onChange={(e) =>
                                  setpermission('readRole', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              {/* <input
                                type="checkbox"
                                checked={form.permissions.addRole}
                                onChange={(e) =>
                                  setpermission('addRole', e.target.checked)
                                }
                              />{' '} */}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editRole}
                                onChange={(e) =>
                                  setpermission('editRole', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
               

                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Users</b></td>
                          <td><input type="checkbox" onChange={e=>handleAdminUser(e.target.checked)} checked={form.permissions.readAdmins&&form.permissions.addAdmins&&form.permissions.deleteAdmins&&form.permissions.editAdmins} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readAdmins}
                                onChange={(e) =>
                                  setpermission('readAdmins', e.target.checked)
                                }
                              />
                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addAdmins}
                                onChange={(e) =>
                                  setpermission('addAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editAdmins}
                                onChange={(e) =>
                                  setpermission('editAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteAdmins}
                                onChange={(e) =>
                                  setpermission('deleteAdmins', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>

                     

                      {form.loginPannel=="front"?null: <>  
                      <tr>
                          <td><b>Industry Type</b></td>
                          <td><input type="checkbox" onChange={e=>handleTypesPer(e.target.checked)}  checked={form.permissions.addTypes&&form.permissions.editTypes&&form.permissions.readTypes&&form.permissions.deleteTypes}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readTypes}
                                onChange={(e) =>
                                  setpermission('readTypes', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addTypes}
                                onChange={(e) =>
                                  setpermission('addTypes', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editTypes}
                                onChange={(e) =>
                                  setpermission('editTypes', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteTypes}
                                onChange={(e) =>
                                  setpermission('deleteTypes', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>
                      <tr>
                          <td><b>Skill Type</b></td>
                          <td><input type="checkbox" onChange={(e) => handleallCategorycheckbox(e.target.checked)} checked={form.permissions.readSkillType&&form.permissions.addSkillType&&form.permissions.editSkillType&&form.permissions.deleteSkillType} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readSkillType}
                                onChange={(e) =>
                                  setpermission('readSkillType', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addSkillType}
                                onChange={(e) =>
                                  setpermission('addSkillType', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editSkillType}
                                onChange={(e) =>
                                  setpermission('editSkillType', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteSkillType}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteSkillType',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>

                          <tr>
                          <td><b>Skills</b></td>
                          <td><input type="checkbox" onChange={e=>HandleCutomerPer(e.target.checked)} checked={form.permissions.readSkills&&form.permissions.addSkills&&form.permissions.editSkills&&form.permissions.deleteSkills} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readSkills}
                                onChange={(e) =>
                                  setpermission(
                                    'readSkills',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addSkills}
                                onChange={(e) =>
                                  setpermission('addSkills', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editSkills}
                                onChange={(e) =>
                                  setpermission(
                                    'editSkills',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteSkills}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteSkills',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>

                        <tr>
                          <td><b>Content </b></td>
                          <td><input type="checkbox" onChange={(e)=>HandleContentper(e.target.checked)} checked={form.permissions.readContent&&form.permissions.editContent} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readContent}
                                onChange={(e) =>
                                  setpermission('readContent', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                         

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editContent}
                                onChange={(e) =>
                                  setpermission('editContent', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td> 

                          </td>
                          <td></td>
                        </tr>
                        
                        {/*  For Assessment Module */}
                        <tr>
                          <td><b> Assessment</b></td>
                          <td><input type="checkbox" onChange={e=>HandleAssessmentPer(e.target.checked)}  checked={form.permissions.addAssessment&&form.permissions.editAssessment&&form.permissions.readAssessment&&form.permissions.deleteAssessment}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readAssessment}
                                onChange={(e) =>
                                  setpermission('readAssessment', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addAssessment}
                                onChange={(e) =>
                                  setpermission('addAssessment', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editAssessment}
                                onChange={(e) =>
                                  setpermission('editAssessment', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteAssessment}
                                onChange={(e) =>
                                  setpermission('deleteAssessment', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>
                               {/*  For Question Module */}
                               <tr>
                          <td><b> Question</b></td>
                          <td><input type="checkbox" onChange={e=>handleQuestion(e.target.checked)}  checked={form.permissions.addQuestion&&form.permissions.editQuestion&&form.permissions.readQuestion&&form.permissions.deleteQuestion}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readQuestion}
                                onChange={(e) =>
                                  setpermission('readQuestion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addQuestion}
                                onChange={(e) =>
                                  setpermission('addQuestion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editQuestion}
                                onChange={(e) =>
                                  setpermission('editQuestion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteQuestion}
                                onChange={(e) =>
                                  setpermission('deleteQuestion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr>
                        </>}

                        

                        {/* <tr>
                          <td><b>Reseller Category</b></td>
                          <td><input type="checkbox" onChange={e=>handleResellCateg(e.target.checked)} checked={form.permissions.addResellerCategory&&form.permissions.readResellerCategory&&form.permissions.editResellerCategory&&form.permissions.deleteResellerCategory} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readResellerCategory}
                                onChange={(e) =>
                                  setpermission(
                                    'readResellerCategory',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addResellerCategory}
                                onChange={(e) =>
                                  setpermission(
                                    'addResellerCategory',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editResellerCategory}
                                onChange={(e) =>
                                  setpermission(
                                    'editResellerCategory',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteResellerCategory}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteResellerCategory',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}



                        {/* <tr>
                          <td><b>Plan Features</b></td>
                          <td><input type="checkbox" onChange={e=>handlePlanFeature(e.target.checked)}  checked={form.permissions.addPlanFeatures&&form.permissions.readPlanFeatures&&form.permissions.editPlanFeatures&&form.permissions.deletePlanFeatures}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readPlanFeatures}
                                onChange={(e) =>
                                  setpermission('readPlanFeatures', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addPlanFeatures}
                                onChange={(e) =>
                                  setpermission('addPlanFeatures', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editPlanFeatures}
                                onChange={(e) =>
                                  setpermission('editPlanFeatures', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deletePlanFeatures}
                                onChange={(e) =>
                                  setpermission(
                                    'deletePlanFeatures',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Plan</b></td>
                          <td><input type="checkbox" onChange={e=>handlePlanPre(e.target.checked)} checked={form.permissions.readPlan&&form.permissions.addPlan&&form.permissions.editPlan&&form.permissions.deletePlan} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readPlan}
                                onChange={(e) =>
                                  setpermission('readPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addPlan}
                                onChange={(e) =>
                                  setpermission('addPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editPlan}
                                onChange={(e) =>
                                  setpermission('editPlan', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deletePlan}
                                onChange={(e) =>
                                  setpermission(
                                    'deletePlan',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Coupons</b></td>
                          <td><input type="checkbox" onChange={e=>handleCoupons(e.target.checked)} checked={form.permissions.readCoupons&&form.permissions.addCoupons&&form.permissions.editCoupons&&form.permissions.deleteCoupons} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCoupons}
                                onChange={(e) =>
                                  setpermission('readCoupons', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addCoupons}
                                onChange={(e) =>
                                  setpermission('addCoupons', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editCoupons}
                                onChange={(e) =>
                                  setpermission('editCoupons', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteCoupons}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteCoupons',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Currency</b></td>
                          <td><input type="checkbox" onChange={e=>handleCurrencyPre(e.target.checked)} checked={form.permissions.readCurrency&&form.permissions.addCurrency&&form.permissions.editCurrency&&form.permissions.deleteCurrency} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCurrency}
                                onChange={(e) =>
                                  setpermission('readCurrency', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addCurrency}
                                onChange={(e) =>
                                  setpermission('addCurrency', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editCurrency}
                                onChange={(e) =>
                                  setpermission('editCurrency', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteCurrency}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteCurrency',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Booking System</b></td>
                          <td><input type="checkbox" onChange={e=>handleBookingPre(e.target.checked)} checked={form.permissions.addBooking&&form.permissions.editBooking&&form.permissions.readBooking&&form.permissions.deleteBooking&&form.permissions.refreshBooking} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readBooking}
                                onChange={(e) =>
                                  setpermission('readBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addBooking}
                                onChange={(e) =>
                                  setpermission('addBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editBooking}
                                onChange={(e) =>
                                  setpermission('editBooking', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteBooking}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteBooking',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <span className='mr-2'>
                                <input
                                  type="checkbox"
                                  checked={form.permissions.refreshBooking}
                                  onChange={(e) =>
                                    setpermission(
                                      'refreshBooking',
                                      e.target.checked
                                    )
                                  }
                                />
                              </span>

                            </label>
                          </td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Continents</b></td>
                          <td><input type="checkbox" onChange={e=>HandleContinent(e.target.checked)}  checked={form.permissions.readContinents&&form.permissions.addContinents&&form.permissions.editContinents&&form.permissions.deleteContinents}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readContinents}
                                onChange={(e) =>
                                  setpermission('readContinents', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addContinents}
                                onChange={(e) =>
                                  setpermission('addContinents', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editContinents}
                                onChange={(e) =>
                                  setpermission('editContinents', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteContinents}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteContinents',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Countries</b></td>
                          <td><input type="checkbox"  onChange={e=>handleCountriuesPre(e.target.checked)} checked={form.permissions.readCountries&&form.permissions.addCountries&&form.permissions.editCountries&&form.permissions.deleteCountries}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCountries}
                                onChange={(e) =>
                                  setpermission('readCountries', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addCountries}
                                onChange={(e) =>
                                  setpermission('addCountries', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editCountries}
                                onChange={(e) =>
                                  setpermission('editCountries', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteCountries}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteCountries',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}

                        {/* <tr>
                          <td><b>Region</b></td>
                          <td><input type="checkbox" onChange={e=>HandleRegionPre(e.target.checked)}  checked={form.permissions.readRegion&&form.permissions.addRegion&&form.permissions.editRegion&&form.permissions.deleteRegion}/></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readRegion}
                                onChange={(e) =>
                                  setpermission('readRegion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addRegion}
                                onChange={(e) =>
                                  setpermission('addRegion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editRegion}
                                onChange={(e) =>
                                  setpermission('editRegion', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteRegion}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteRegion',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}
                        {/* <tr>
                          <td><b>Cities</b></td>
                          <td><input type="checkbox" onChange={e=>HandleCitiesPre(e.target.checked)} checked={form.permissions.readCities&&form.permissions.addCities&&form.permissions.editCities&&form.permissions.deleteCities} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readCities}
                                onChange={(e) =>
                                  setpermission('readCities', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addCities}
                                onChange={(e) =>
                                  setpermission('addCities', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editCities}
                                onChange={(e) =>
                                  setpermission('editCities', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.deleteCities}
                                onChange={(e) =>
                                  setpermission(
                                    'deleteCities',
                                    e.target.checked
                                  )
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                        </tr> */}
                        {/* <tr>
                          <td><b>Email Template</b></td>
                          <td><input type="checkbox" onChange={e=>handleEmailPre(e.target.checked)} checked={form.permissions.readEmailTemplate&&form.permissions.editEmailTemplate&&form.permissions.addEmailTemplate} /></td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.readEmailTemplate}
                                onChange={(e) =>
                                  setpermission('readEmailTemplate', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.addEmailTemplate}
                                onChange={(e) =>
                                  setpermission('addEmailTemplate', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td>
                            <label>
                              <input
                                type="checkbox"
                                checked={form.permissions.editEmailTemplate}
                                onChange={(e) =>
                                  setpermission('editEmailTemplate', e.target.checked)
                                }
                              />{' '}

                            </label>
                          </td>
                          <td></td>
                          <td></td>
                        </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
            <Link to="/roles" className="btn btn-secondary discard mr-2">Back</Link>
            { !id||(id&&isAllow("editRole"))? <button type="submit" className="btn btn-primary ">
                Save
              </button>:null}
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEditRole;
