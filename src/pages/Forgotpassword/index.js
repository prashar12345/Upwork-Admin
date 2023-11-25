import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    ToastsStore,
} from 'react-toasts';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Forgotpassword = () => {
    const history = useHistory();

    const user = useSelector(state => state.user)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/dashboard')
          }
    }, [])

    const [form, setForm] = useState({ email: '' });

    useEffect(() => {

    }, [])

    const hendleSubmit = (e) => {
        e.preventDefault();
        loader(true)

        ApiClient.post('forgot/password', form).then(res => {
            if (res.success) {
                toast.success("Please check your mail.reset password link shared")
                history.push("/login")
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
            <Link to="/"> <img src="/assets/img/logonew2.png" className='logo'/></Link>
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
                <div className="text-center mb-4">
                  <h3 className="text-left lgtext">Forgot password?</h3> 
                </div>
                {/* <p className='para_forget'>No worries Just enter your email and we’ll send you a reset password link.</p> */}
                <div className="mb-3">
                  <div className="inputWrapper">
                  <input
                                        type="email"
                                        className="form-control  mb-0 bginput changes" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        
                                    />
                 
                  </div>
                </div>

                
                <div className="buttons">
              
                  <button type="submit" className="btn btn-primary loginclass mb-4">
                  Send Recovery Email
                  </button>
                  <div className="text-center mt-0">
                  <Link to="/login">Log In</Link>
                  </div>
              
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
                                <a href="/login"><i className="fa fa-arrow-left" title='Back' aria-hidden="true"></i></a>
                                <div className="mb-3">
                                    <Link to={''}>
                                        <img src="/assets/img/logo.jpg" className="logimg pt-4" />
                                    </Link>
                                </div>
                                <div className="text-center mb-3">
                                    <h3 className="text-left lgtext">Forgot Password</h3>
                                </div>
                                <label></label>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control  mb-0 bginput" placeholder='Email*'
                                        value={form.email}
                                        required
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                    />

                                </div>

                                <div className="text-right">
                                    <button type="submit" className="btn btn-primary loginclass">Send</button>
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

export default Forgotpassword;
