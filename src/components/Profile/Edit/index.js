import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import { ToastsStore } from 'react-toasts';
import { login_success } from '../../../actions/user';
import './style.scss';
import { userType } from '../../../models/type.model';
import Html from './Html';
import { useHistory } from 'react-router-dom';
import formModel from '../../../models/form.model';

const EditProfile = p => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState('');
  const [form, setForm] = useState(userType);
  const dispatch = useDispatch();
  const history=useHistory()
  const [submitted, setSubmitted] = useState(false)

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`profile`).then(res => {
      if (res.success) {
        setForm({form,...res.data,role:res?.data?.role?.name})
        setData(res.data)
      }
      loader(false)
    })
  };

  const getError = (key) => {
    return formModel.getError('profileForm',key)
  }

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true)
    let invalid = formModel.getFormError('profileForm')
    if (invalid) return

    let value = { fullName: form.fullName,  image: form.image, id: form.id }

    loader(true)
    ApiClient.put('edit/profile', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        history.push("/profile")
        ToastsStore.success(res.message)
      }
      loader(false)
    })
  };


  const uploadImage = (e) => {
    setForm({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    loader(true)
    ApiClient.postFormData('upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
      console.log(res,"hhhh");
      if (res.data.fullpath) {
        let image = res.data.fullpath 
        setForm({ ...form, image: image, baseImg: '',})
      } else {
        setForm({ ...form, baseImg: '', })
      }
      loader(false)
    })
  }
  

  useEffect(
    () => {
      if (user && user.loggedIn) {
        gallaryData();
        let field=document.forms['profileForm'].elements['fullName']
        // console.log("field",field.minLength)
      }
    },[]);

  return (
    <>
     <Html
     handleSubmit={handleSubmit}
     setForm={setForm}
     form={form}
     uploadImage={uploadImage}
     getError={getError}
     submitted={submitted}
     />
    </>
  );
};

export default EditProfile;
