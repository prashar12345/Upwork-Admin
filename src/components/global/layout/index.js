import React, { useEffect } from 'react';
import './style.scss';
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar';
import Header from '../header';
import { useDispatch, useSelector } from 'react-redux'; 
import 'react-toastify/dist/ReactToastify.css';
import permissionModel from '../../../models/permisstion.model';
import ApiClient from '../../../methods/api/apiClient';
import { login_success } from '../../../actions/user';


const Layout = ({ children }) => {
  const user = useSelector(state => state.user)
  const searchState = useSelector((state) => state.search);
  const history = useHistory();
  const dispatch = useDispatch();


  useEffect(() => {
    if (user && !user.loggedIn) {
      history.push('/login');
    }else{
      let permissions=user.role?.permissions
      if(!permissionModel.urlAllow(permissions,user?.role?.id)){
        history.push("/profile")
      }
      // let browseload=localStorage.getItem('browseload')
      // if(!browseload){
      //   ApiClient.get('profile').then(res=>{
      //     if(res.success){
      //       let data={...user,...res.data}
      //       dispatch(login_success(data))
      //       localStorage.setItem('browseload','true')
      //     }
      //   })
      // }
    }
  }, [])

  const logo = () => {                                                    
    let value = '/assets/img/logo.png'
    return value
  }

  const router=()=>{
    let route=localStorage.getItem('route')
    history.push(route);
  }

  return (
    <>
    <div component="layout">
    <div onClick={e=>router()} id="routerDiv"></div>
      <Header />
      <div className="main-wrapper d-flex">
        <div className="main-sidebar  d-md-block">
          <div className="sidebar-brand p-3 pt-4  text-left pl-5">
            {/* <label className='editLogo'>
              <img src={logo()} className="logocls" />
            </label> */} 
          </div>
          <Sidebar />
        </div>
        <main className="main">
          <div className="mainarea">{children}</div>
        </main>
      </div>
    </div> 
    </>
  );
};
export default Layout;
