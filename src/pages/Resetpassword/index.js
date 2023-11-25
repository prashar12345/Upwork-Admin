
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import methodModel from '../../methods/methods';
import './style.scss';
import { toast } from 'react-toastify';

const Resetpassword = () => {
    const history = useHistory();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard')
        }
    }, [])

    const formValidation = [
        { key: 'confirmPassword', minLength: 8, confirmMatch: ['confirmPassword', 'newPassword'] },
        { key: 'newPassword', minLength: 8 },
         { key: 'newPassword', minLength: 8 },
        //  { key: 'verificationCode', required: true }
    ]

    const [form, setForm] = useState({ confirmPassword: '', newPassword: '', verificationCode :'', id:'' });
    const [submitted, setSubmitted] = useState(false)
    const [eyes, setEyes] = useState({ password: false, confirmPassword: false });

    const getError = (key) => {
        return methodModel.getError(key, form, formValidation)
    }

    useEffect(() => {
        let prm = {
            // email: methodModel.getPrams('email'),
            id: methodModel.getPrams('id'),
            verificationCode: methodModel.getPrams('code'),
        }

        setForm({ ...form, ...prm })
    }, [])

    const hendleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        loader(true)
        let payload = {
            password: form.newPassword,
            verificationCode: form.verificationCode,
            id: form.id
        }
        ApiClient.put('reset/password', payload).then(res => {
            if (res.success) {
                toast.success(res.message)
                history.push('/login');
            }
            loader(false)
        })
    };


    return (
        <>
         <div className='main_login'>
                <div className="row align-items-center">
                    {/* <div className="col-md-7 px-0">
                    <div className='banner_img' style={{   backgroundImage: "linear-gradient(140deg, rgba(2,0,36,1) 0%, rgb(8 8 123) 50%, rgba(16,68,166,1) 50%, rgba(8,154,184,1) 100%)"}}>
                            <div className='logo_img'>
                                <Link to="/"> <img src="/assets/img/logonew2.png" className='logo' /></Link>
                            </div>
                            <div className='loginLeftImg'>
                                <h3>"It's all good! Enter your email, and we'll send a reset password link your way"</h3>
                            </div>
                            <img src="./assets/img/login_Img.png" className="loginimg w-100" />

                        </div>
                    </div> */}

                    <div className="col-md-12 p-0">
                        <div className='top_section'>
                        <div className='right_side'>
                            <form
                                className="centerLogin"
                                onSubmit={hendleSubmit}
                            >
                                <div className="text-center mb-2">
                                    <h3 className="text-left lgtext mb-3">New Password</h3>

                                    {/* <p className='para_forget_new'>Please create a new password that you don’t use on any other site.</p> */}
                                </div>

                                <div className="mb-3">
                                    {/* <div className="inputWrapper mb-3">
                 <label>Code</label>
                               
                                    <input
                                        type="text"
                                        className="form-control mb-0 bginput"
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value })}
                                        placeholder="Code"
                                        required
                                    />
                  </div> */}
                                    {/* <label>New Password<span className="start">*</span></label> */}

                                    {/* <div className="inputWrapper mb-3">
                                        <div className="inputWrapper">
                                            <input
                                                type='text'
                                                className="form-control mb-0 bginput"
                                                value={form.verificationCode}
                                                maxLength={50}
                                                onChange={e => setForm({ ...form, verificationCode: e.target.value })}
                                                placeholder="Verification Code"
                                                required
                                            />
                                        </div>
                                        {submitted && getError('verificationCode').err.confirmMatch ? <div className="invalid-feedback d-block">Code is not matched </div> : <></>}
                                    </div> */}

                                    <div className="mb-3">
                                        <div className="inputWrapper">
                                        <label className='text_label'> New Password <span className='text-danger'>*</span></label>
                                            <input
                                                type={eyes.password ? 'text' : 'password'}
                                                className="form-control mb-0 bginput changes"
                                                value={form.newPassword}
                                                min="12"
                                                onChange={e => setForm({ ...form, newPassword: e.target.value })}
                                                maxlength="16"
                                                placeholder="Enter new password"
                                                required
                                            />
                                            <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                        </div>

                                        {submitted && getError('newPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
                                    </div>
                                    <div className="inputWrapper">
                                        {/* <label>Confirm Password<span className="start">*</span></label> */}

                                        <div className="inputWrapper">
                                        <label className='text_label'> Confirm New Password <span className='text-danger'>*</span></label>
                                            <input
                                                type={eyes.confirmPassword ? 'text' : 'password'}
                                                className="form-control mb-0 bginput changes"
                                                value={form.confirmPassword}
                                                maxlength="16"
                                                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                                placeholder="Confirm new password"
                                                required
                                            />
                                            <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                                        </div>
                                        {submitted && getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Confirm Password is not matched with New Password</div> : <></>}
                                    </div>
                                </div>


                                <div className="buttons">

                                    <button type="submit" className="btn btn-primary loginclass mb-4">
                                        Save Password
                                    </button>
                                </div>

                                {/* <p className='accopuntt'> Just Remember?<a class="sign_up" href="/login"> Sign Up</a></p> */}
                            </form>

                        </div>
                        </div>
                       

                    </div>


                </div>
            </div>
            {/* <div className="login-wrapper">
                <div className="mainfromclss">
                    <div className="row">
                        <div className="col-md-6  px-0">
                            <form
                                className="p-5 rounded shadow"
                                onSubmit={hendleSubmit}
                            >

                                <div className="mb-3">
                                    <Link to={''}>
                                        <img src="/assets/img/logo.jpg" className="logimg pt-4" />
                                    </Link>
                                </div>
                                <div className="text-center mb-3">

                                    <h3 className="text-left">Reset Password<span className="start">*</span></h3>
                                </div>
                                <label>Code</label>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control mb-0 bginput"
                                        value={form.code}
                                        onChange={e => setForm({ ...form, code: e.target.value })}
                                        required
                                    />
                                </div>

                                <label>New Password<span className="start">*</span></label>

                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.password ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            value={form.newPassword}
                                            min="12"
                                            onChange={e => setForm({ ...form, newPassword: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                                    </div>

                                    {submitted && getError('newPassword').invalid ? <div className="invalid-feedback d-block">Min Length must be 8 characters long</div> : <></>}
                                </div>

                                <label>Confirm Password<span className="start">*</span></label>

                                <div className="mb-3">
                                    <div className="inputWrapper">
                                        <input
                                            type={eyes.confirmPassword ? 'text' : 'password'}
                                            className="form-control mb-0 bginput"
                                            value={form.confirmPassword}
                                            maxLength={50}
                                            onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                                            required
                                        />
                                        <i className={eyes.confirmPassword ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, confirmPassword: !eyes.confirmPassword })}></i>
                                    </div>

                                    {submitted && getError('confirmPassword').err.confirmMatch ? <div className="invalid-feedback d-block">Comfirm Password is not matched with New Password</div> : <></>}
                                </div>



                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary loginclass">
                                        Submit
                                    </button>

                                </div>
                            </form>
                        </div>
                        <div className="col-md-6 px-0">
                            <img src="./assets/img/login_Img.png" className="loginimg w-100" />
                        </div>
                    </div>


                </div>
            </div> */}

        </>
    );
};

export default Resetpassword;
