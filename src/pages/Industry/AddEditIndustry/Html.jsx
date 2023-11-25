import React from "react";
import statusModel from '../../../models/status.model'
import methodModel from "../../../methods/methods";
import ImageUpload from "../../../components/common/ImageUpload";
import GooglePlaceAutoComplete from "../../../components/common/GooglePlaceAutoComplete"
import Layout from "../../../components/global/layout";
import rolesModel from "../../../models/roles.model";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { useSelector } from "react-redux";
import environment from "../../../environment";

const Html = ({ role, form, handleSubmit, setform, roles, addressResult, submitted, images, imageResult, getError,setEyes,eyes,back,emailCheck,emailErr,emailLoader,detail }) => {
    const user=useSelector(state=>state.user);
    const isAllow=(key='')=>{
        let permissions=user.role?.permissions
        let value=permissions?.[key] 
        if(user.role.id==environment.adminRoleId) value=true
        return value
      }
    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className='ViewUser'>{form && form.id ? 'Edit' : 'Add'} {role?rolesModel.name(role):'Industry'}</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.industryName}
                                onChange={e => setform({ ...form, industryName: e.target.value })}
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

                        {/* {role ? <></> : <div className="col-md-6 mb-3">
                            <label>Role<span className="star">*</span></label>
                            <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select Role"
                                    intialValue={form.role}
                                    disabled={form.id ? true : false}
                                    result={e => { setform({ ...form, role: e.value }) }}
                                    options={roles}
                                />
                                 {submitted && !form.role ? <div className="invalid-feedback d-block">Role is Required</div> : <></>}
                        </div>} */}

                        {/* <div className="col-md-6 mb-3">
                            <label>Address<span className="star">*</span></label>
                            <GooglePlaceAutoComplete
                                value={form.address}
                                result={addressResult}
                                id="address"
                                placeholder=""
                            />
                        </div> */}

                        {/* <div className="col-md-6 mb-3">
                            <label>Mobile No<span className="star">*</span></label>
                            <div className="phoneInput">
                                <input
                                    type="text"
                                    className="form-control" placeholder='+1'
                                    value={form && form.dialCode}
                                    maxLength={4}
                                    onChange={e => setform({ ...form, dialCode: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="form-control" placeholder='Mobile No.'
                                    value={form && form.mobileNo}
                                    maxLength={12}
                                    onChange={e => setform({ ...form, mobileNo: methodModel.isNumber(e) })}
                                    required={form.dialCode?true:false}
                                />
                            </div>
                            {submitted && getError('dialCode').invalid ? <div className="invalid-feedback d-block">invalid country code</div> : <></>}
                            {submitted && getError('mobileNo').invalid && !getError('dialCode').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
                        </div> */}
                        {/* <div className="col-md-6 mb-3">
                            <label>Email  {emailLoader?<span><i className="fa fa-spinner fa-spin"></i></span>:<></>}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={form.email}
                                onChange={e => { setform({ ...form, email: e.target.value });emailCheck(e.target.value) }}
                                required
                            />
                            {emailErr?<div className="invalid-feedback d-block">{emailErr}</div>:<></>}
                           
                        </div> */}
                        {/* <div className="col-md-6 mb-3">
                            <label>Password</label>
                            <div className="inputWrapper">
                                <input
                                    type={eyes.password ? 'text' : 'password'}
                                    className="form-control"
                                    value={form.password}
                                    onChange={e => setform({ ...form, password: e.target.value })}
                                    
                                />
                                <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                            </div>
                            {submitted && getError('password').invalid ? <div className="invalid-feedback d-block">Password minimum length should be 8</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Confirm Password {form.password ? <span className="star">*</span> : <></>}</label>
                            <div className="inputWrapper">
                                <input
                                    type={eyes.confirmPassword ? 'text' : 'password'}
                                    className="form-control"
                                    value={form.confirmPassword}
                                    onChange={e => setform({ ...form, confirmPassword: e.target.value })}
                                    required={form.password ? true : false}
                                />
                                <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                            </div>
                            {submitted && getError('confirmPassword').invalid ? <div className="invalid-feedback d-block">Comfirm Password is not matched with Password</div> : <></>}
                        </div> */}

                        {/* <div className="col-md-12 mb-3">
                                    <label>AboutUs<span className="star">*</span></label>
                                    <textarea
                                        className="form-control"
                                        value={form.aboutUs}
                                        onChange={e => setform({ ...form, aboutUs: e.target.value })}
                                        required
                                    />
                                </div> */}
                        {/* <div className="col-md-6  mb-3">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />
                        </div> */}

                    </div>


                    <div className="text-right">
                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>back()}>Back</button>
                        {!form.id||(form.id&&isAllow('readTypes'))?<button type="submit" className="btn btn-primary">Save</button>:null}
                    </div>
                </div>

            </form>
        </Layout>
    </>
}

export default Html