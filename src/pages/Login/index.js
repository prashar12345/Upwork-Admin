import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login_success } from '../../actions/user';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import {  toast } from 'react-toastify'; 

const Login = () => {
  const history = useHistory();
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/dashboard')
    }
  }, [])

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [remember, setRemember] = useState(false);
  const [password, setPassword] = useState('');
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

  useEffect(() => { 
    let r = localStorage.getItem('remember')
    if (r) {
      let data = JSON.parse(r)
      setUsername(data.email)
      setPassword(data.password)
      setRemember(true)
    }
  }, [])

  const hendleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: username,
      password
    };
    loader(true)
    ApiClient.post('admin/signin', data).then(res => {
      loader(false)
      if (res.success) {
        if(remember){
          localStorage.setItem('remember',JSON.stringify(data))
        }else{
          localStorage.removeItem('remember')
        }
        // ToastsStore.success(res.message)
        toast.success("Login Successfully")
        localStorage.setItem('token', res.data.access_token)
        dispatch(login_success(res.data))
        history.push('/dashboard');
      }


      
    })
  };

  const HandleEmailEnter=(e)=>{
    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
     if (key == 32) { //space
      e.preventDefault();
     }else{
}
  }
  return (
    <>
    
    <div className='main_login'>
          {/* <div className="col-md-6 px-0">
            <div className='banner_img' style={{   backgroundImage: "linear-gradient(140deg, rgba(2,0,36,1) 0%, rgb(8 8 123) 50%, rgba(16,68,166,1) 50%, rgba(8,154,184,1) 100%)"}}>
              <div className='logo_img'>
                <Link to="/"> <img src="/assets/img/Logo 4-12.png" className='logo' /></Link>
              </div>
              <div className='loginLeftImg'>
                <h3>Welcome Back <br /> Sign in to continue.</h3>
              </div>
              <img src="./assets/img/login_Img.png" className="loginimg w-100" />
            </div>
          </div> */}
     
        
          <div className="row align-items-center justify-content-center">
          <div className="col-md-12 p-0">
            <div className='top_section'>
            <div className='right_side'>
            <div className='logo_image'>
                  <img src='/assets/img/Logo_new.png' className='logo_name'/>
                </div>
            
              <form
                className="centerLogin"
                onSubmit={hendleSubmit}
              >
                
                <div className="text-center mb-4">
                  <h3 className="text-center lgtext">Log In</h3>
                  {/* <p className='accopunt'>Don’t have an account? <a class="sign_up" href="#"> Sign Up</a></p> */}
                </div>
                <div className="mb-3">
                  <label className='text_label'> Email <span className='text-danger'>*</span></label>
                  <input
                    type="email"
                    className="form-control mb-0 bginput" placeholder='Email address'
                    value={username}
                    onKeyPress={e => HandleEmailEnter(e)}
                    onChange={e=>setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="inputWrapper">
                  <label className='text_label'> Password <span className='text-danger'>*</span></label>
                    <input
                      type={eyes.password ? 'text' : 'password'}
                      className="form-control mb-0 bginput"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Password"
                      maxlength="16"
                      required
                    />
                    <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>
                  </div>
                </div>
                <div className='d-flex justify-content-between'>
                <label><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2" /> Remember Me</label>
                 <div className="forget m-0 p-0">
                  <Link to="/forgotpassword" className="text-primary">Forgot Password ?</Link>
                </div>
                </div>
                <div className="mt-0">
                 
                  <button type="submit" className="btn btn-primary loginclass mb-4 mt-3">
                    Log In
                  </button>
                </div>
              </form>
            </div>
            </div>
        
          </div>
          </div>
      
      </div> 
    </>
  );
};

export default Login;