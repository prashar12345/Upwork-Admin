import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './profile.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const Profile = () => {

  const user = useSelector((state) => state.user);
  const [data, setData] = useState('');

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`profile`).then(res => {
      if (res.success) {
        setData(res.data)
      }
      loader(false)

    })
  };

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
      }
    },
    []
  );

  return (
    <Layout>
      <div className='pprofile1'>
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h3 className='ViewUser'>Basic Information</h3>
        <Link to="/profile/edit" className="btn btn-primary profiles">
        <i class="material-icons prob" title="Edit Profile">mode_edit_outline</i>
        Edit Profile
          {/* <i className="fa fa-edit" title='Edit Profile' /> */}
        </Link>
      </div>
        <div className="form-row">
          <div className="col-md-12 mb-3 inputFlex">
          <label>Image</label>
          <div>
          <label className="profileImageLabel">
              <img src={methodModel.userImg(data && data.image)} className="profileImage" />
            </label>
          </div>
            
          </div>
          <div className="col-md-12 inputFlex">
            <label> Name</label>
            <div>
            <p className="profile_data">{data && data.fullName}</p>
            </div>          
          </div>

          {/* <div className="col-md-12 inputFlex">
            <label>Last Name</label>
            <div>
            <p className="profile_data">{data && data.lastName}</p>
            </div>          
          </div> */}

          {/* <div className="col-md-6">
          <label>Role</label>
          <p className="bg-light rounded px-3 py-2">{data && data.role}</p>
        </div> */}

          <div className="col-md-12 inputFlex">
            <label>Email</label>
            <div>
            <p className="profile_data">{data && data.email}</p>
            </div>
          
          </div>

          <div className="col-md-12 inputFlex">
            <label>Role</label>
            <div>
            <p className="profile_data">{data && data.role.name}</p>
            </div>
          
          </div>
          

{/* 
          <div className="col-md-12 inputFlex">
            <label>Mobile No</label>
            <div>
            <p className="profile_data">{String(data && data.dialCode + data.mobileNo)}</p>
            </div>
      
          </div> */}

          {/* <div className="col-md-12">
            <label>Created At</label>
            <p className="bg-light rounded px-3 py-2">{data && data.createdAt}</p>
          </div> */}
        </div>
      </div>

    </Layout>
  );
};

export default Profile;
