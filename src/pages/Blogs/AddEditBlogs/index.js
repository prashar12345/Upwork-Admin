import React, { useEffect, useState } from "react";
import statusModel from "../../../models/status.model";
import loader from "../../../methods/loader";
import ApiClient from "../../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { useSelector } from "react-redux";
import environment from "../../../environment";
import ImageUpload from "../../../components/common/ImageUpload";
// import methodModel from "../../methods/methods";
import methodModel from "../../../methods/methods";
import { Editor } from "@tinymce/tinymce-react";
import formModel from '../../../models/form.model';

export default function AddEditBlog() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const Navigate = useHistory();
  const [form, setform] = useState({
    id: "",
    title: "",
    description: "",
    category: "id",
    image: "",
  });
  // console.log(form,'hhhhhkk')
  const [submitted, setsubmitted] = useState(false);
  const [image, setImage] = useState({image:""});
 
  // console.log(form, "dddd");

  const handleSubmit = (e) => {
    console.log(form,'fffffffff')
    e.preventDefault();
    loader(true);
    setsubmitted(true);
    let method = "post";
    const payload = form;
    let url = "blog";
    if (id) {
      method = "put";
      payload.id = id;
      // payload.image = image;
    } else {
      delete payload.id;
    }
    console.log(payload,'pppppppppp')
    ApiClient.allApi(url, payload, method).then((result) => {
      if (result.success) {
        toast.success(result.message);
        Navigate.push("/blogs");
      }
      loader(false);
    });
  };



// 


const uploadImage = (e) => {
  setform({ ...form, baseImg: e.target.value })
  let files = e.target.files
  let file = files.item(0)
  loader(true)
  ApiClient.postFormData('upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
    console.log(res,"hhhh");
    if (res.data.fullpath) {
      let image = res.data.fullpath 
      setform({ ...form, image: image, baseImg: '',})
    } else {
      setform({ ...form, baseImg: '', })
    }
    loader(false)
  })
}

  // const imageResult = (e, key) => {
  //   image[key] = e.value;
  //   setImage(image);
  //   console.log("imageResult", e);
  // };


  const [categoriesdata,setCategoriesdata]=useState([])
  const GetcategoriesTypes=()=>{
      loader(true);
      ApiClient.get(`categories`).then(res=>{
if(res.success){


  setCategoriesdata(res.data);
}
loader(false)
      })
  }

  useEffect(() => {
    GetcategoriesTypes()
    if (id) {
      ApiClient.get(`blog?id=${id}`).then((result) => {
        if (result.success) {
          const newdata = result.data;
          setImage(newdata.image?newdata.image:"")
          setform({
            title: newdata.title,
            description: newdata.description,
            category: newdata.category.id,
            image:  newdata.image!=""?newdata.image:"",
          });
        }
      });
    }
  }, []);

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions;
    let value = permissions?.[key];
    if (user.role.id == environment.adminRoleId) value = true;
    return value;
  };
  console.log(form.image, "EveryTime");

  const getError = (key) => {
    return formModel.getError('profileForm',key)
  }

  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="pprofile1">
          <h3 className="ViewUser">{id ? "Edit" : "Add"} Blog</h3>
          <div className="form-row">
            <div className="col-md-12 text-right ">
              {/* <i class="fa fa-trash text-danger" aria-hidden="true"></i> */}
            </div>
            <div className="col-md-6 mb-3">
              <label>
                title<span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={form.title}
                onChange={(e) => setform({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
                <label>
                category<span className="star">*</span>
                </label>
          <select className='form-control' required onChange={e=>setform({...form,category:e.target.value})} value={form.category} >
            <option value="">Select Master category</option>
            {categoriesdata.map((item,index)=>(
                <option className='text-capitalize' value={item.id}>{item.name}</option>
            ))}
          </select>
              </div>  

            {/* <div className="col-md-6 mb-3">
              <label>
                description<span className="star">*</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={form.description}
                onChange={(e) =>
                  setform({ ...form, description: e.target.value })
                }
              ></textarea>
            </div> */}

{/* edior */}
<div className="col-md-12 mt-3">
                            <div className="form-group">
                              <label for="exampleFormControlTextarea1">
                              Description
                              </label>
                              <Editor
                                value={form.description}
                                onEditorChange={(newValue, editor) => {
                                  setform({
                                    ...form,
                                    description: newValue,
                                  });
                                }}
                                init={{
                                  height: "200px",
                                  selector: "textarea",
                                  plugins: "table code colorpicker textcolor",
                                  toolbar:
                                    "table code bold italic alignleft aligncenter alignright alignjustify | outdent indent ",
                                  toolbar_mode: "floating",
                                }}
                              />
                        
                            </div>
                          </div>

                          {/* end */}

            
            <div className="col-md-6  mb-3">
              <label className="lablefontcls">Image</label>
              <br></br>
              {/* <ImageUpload
                model="users"
                result={(e) => uploadImage(e, "image")}
                value={image ? form.image : ""}
                multiple={false}
              /> */}

              {/* <div className="col-md-6  mb-3">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={image.image || form.image} multiple={false} />
                        </div> */}
                        

              <div>
              <div className='maininutcls'>
                <label className="profileImageLabel">
                  <img src={methodModel.userImg(form && form.image)} className="profileImage" />
                </label>
                <div className='profile_btn'>
                  <div>
                  <div>         
                    {form.image ? <i class="fa fa-trash" aria-hidden="true"  onClick={e => setform({ ...form, image: "" })}></i>: <></>}                
                  </div>
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
                 
                 
                  {/* {submitted && getError('image')?.invalid ? <div className="invalid-feedback d-block">Image is required</div> : <></>} */}
                </div>



              </div>
            </div>
            </div>

            
          </div>

          <div className="text-right">
            <button
              type="button"
              className="btn btn-secondary discard mr-2"
              onClick={(e) => Navigate.goBack()}
            >
              Back
            </button>
            {!id || (id && isAllow("editSkillType")) ? (
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            ) : null}
          </div>
        </div>
      </form>
    </Layout>
  );
}
