import React from 'react';
import methodModel from '../../../methods/methods';
import { Link } from 'react-router-dom';
import './style.scss';

const Html = ({ handleSubmit, setForm, form, getError, uploadImage, submitted }) => {
  return (
    <>
      <div className='pprofile1'>
        <div className="d-flex justify-content-between align-items-center ">
          <h3 className='ViewUser'>Basic Information</h3>
          {/* <Link to="/profile" className="btn btn-primary ">
          <i className="fa fa-arrow-left text-light" title='View Profile' />
         
        </Link> */}
        </div>

        <form
        name="profileForm"
          className="form-row"
          onSubmit={handleSubmit}
        >

          <div className="col-md-12 mb-3 inputFlex">
            <label>Image</label>
            <div>
              <div className='maininutcls'>
                <label className="profileImageLabel">
                  <img src={methodModel.userImg(form && form.image)} className="profileImage" />
                </label>
                <div className='profile_btn'>

                  <div>
                    <label className="btn btn-primary edit ml-3">
                      <input
                        id="bannerImage"
                        type="file"
                        className="d-none"
                        accept="image/*"
                        value={form.baseImg ? form.baseImg : ''}
                        onChange={(e) => { uploadImage(e); }}
                      />{form.image ? 'Change' : 'Upload'} Image</label>
                  </div>
                  <div>
                    {form.image ? <label className="btn btn-primary  delete ml-3" onClick={e => setForm({ ...form, image: "" })}>Remove Image</label> : <></>}
                  </div>
                  {/* <input type="hidden" name='image' required value={form.image} /> */}
                  {submitted && getError('image')?.invalid ? <div className="invalid-feedback d-block">Image is required</div> : <></>}
                </div>



              </div>
            </div>

          </div>

          <div className="col-md-12 mb-3 inputFlex">
            <label>Name<span className='star'>*</span></label>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name='fullName'
                value={form.fullName}
                
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                required
              />
              {submitted && getError('fullName')?.invalid ? <div className="invalid-feedback d-block">Name is required</div> : <></>}
            </div>
          </div>

          {/* <div className="col-md-12 mb-3 inputFlex">
            <label>Last Name<span className='star'>*</span></label>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                name='lastName'
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                required
              />
              {submitted && getError('lastName')?.invalid ? <div className="invalid-feedback d-block">Name is required</div> : <></>}
            </div>
          </div> */}

          <div className="col-md-12 mb-3 inputFlex">
            <label>Email</label>
            <div>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Name"
                value={form.email ? form.email : ''}
                disabled
              />
            </div>
          </div>

          {/* <div className="col-md-12 mb-3 inputFlex">
            <label>Mobile No<span className='star'>*</span></label>
            <div>
              <div className="phoneInput">
                <input
                  type="text"
                  className="form-control" placeholder='+60'
                  name='dialCode'
                  value={form && form.dialCode || ''}
                  dialCode="true"
                  title="Phone number with + and remaing 9 digit with 0-9"
                  maxLength={4}
                  onChange={e => setForm({ ...form, dialCode: e.target.value })}
                  required
                />
                <input
                  type="text"
                  name='mobileNo'
                  className="form-control" placeholder='Mobile No.'
                  value={form && form.mobileNo}
                  minLength="10"
                  maxLength={12}
                  onChange={e => setForm({ ...form, mobileNo: methodModel.isNumber(e) })}
                  required
                />
              </div>
              {submitted && getError('dialCode').invalid ? <div className="invalid-feedback d-block">invalid country code</div> : <></>}
              {submitted && getError('mobileNo').invalid && !getError('dialCode').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
            </div>

          </div> */}

          <div className="col-md-12 mb-3 inputFlex">
            <label>Role</label>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={form.role}
                disabled
              />
            </div>
          </div>

          <div className="col-md-12 text-right mt-3">
            <Link to="/profile" className="btn btn-primary reset">
              Discards
            </Link>
            <button type="submit" className="btn btn-primary edit ml-3 mb-0">
              Update
            </button>
          </div>
        </form>
      </div>


    </>
  );
};

export default Html;
