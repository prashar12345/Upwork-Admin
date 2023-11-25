import React from "react";
import { Link } from "react-router-dom";
import methodModel from '../../../methods/methods';
import Sidebar from '../sidebar';

const Html=({isOpen,toggle,searchHandle,search,user,isOpen1,searchChange,clear,Logout})=>{
  const pathname=location.pathname;
    return (
        <nav
        component="header"
          className={
            isOpen
              ? 'navbar navbar-expand-lg main-navbar min-sidebar'
              : 'navbar navbar-expand-lg main-navbar'
          }
        >
          <a
            onClick={toggle}
            className={
              isOpen
                ? 'btn barlink text-primary active'
                : 'btn barlink  text-primary'
            }
          >
            <i className="fas fa-bars" />
          </a>
          {pathname=="/users"||pathname=="/skills"||pathname=="/industry"||pathname=="/masterskils"||pathname=="/questions"||pathname=="/assessment"||pathname=="/faq" ||pathname=="/categorylist"||pathname=="/projects"||pathname=="/technologies"||pathname=="/speciality"?
          <form className='headerSearch ml-3' onSubmit={searchHandle}>
            <input type="text" placeholder="Search..." value={search} onChange={e => searchChange(e.target.value)} className="Searchbar"></input>
            <i className="fa fa-search" onClick={searchHandle} aria-hidden="true"></i>
            {search ? <i className="fa fa-times" onClick={clear} aria-hidden="true"></i> : <></>}
          </form>:null}
    
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="dropdown ml-auto">
                <a data-toggle="dropdown"
                  className="nav-link dropdown-toggle nav-link-user text-dark d-flex align-items-center">    
                  <img alt="image" src={methodModel.userImg(user.image)} className="rounded-circle mr-1 " />

                  <div className="ml-1 ">
                  <b>{user.fullName}</b>
                    <p className=" mb-0 text-capitalize">{user.role?.name}</p>
                    </div>
                </a>
                <div className="dropdown-menu dropdown-menu-right position-absolute shadow bg_hover">
                  <Link to="/profile" className="dropdown-item has-icon">
                    <i className="far fa-user" /> Profile
                  </Link>
                  <Link to="/profile/change-password" className="dropdown-item has-icon">
                    <i className="fa fa-cog" aria-hidden="true"></i> Change Password
                  </Link>
                  <a id="handleLogout" onClick={() => Logout()} className="dropdown-item has-icon">
                    <i className="fas fa-sign-out-alt" /> Logout
                  </a>
                </div>
              </div>
    
          {
            isOpen1 ? (
              <div className="w-100 mobi-dropdown">
                <Sidebar />
              </div>
            ) : (
              <></>
            )
          }
        </nav>
      );
}

export default Html