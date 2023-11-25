import React, { useEffect, useState } from "react";
import statusModel from "../../../models/status.model";
import loader from "../../../methods/loader";
import ApiClient from "../../../methods/api/apiClient";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../components/global/layout";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { useSelector } from "react-redux";
import environment from "../../../environment";
import ImageUpload from "../../../components/common/ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

export default function AddEditFaq() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const Navigate = useHistory();
  const [form, setform] = useState({
    id: "",
    question: "",
    answer: "",
    category: "",
  });
  console.log(form,"fdsdf");


  const [submitted, setsubmitted] = useState(false);
  const [image, setImage] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    loader(true);
    setsubmitted(true);
    let method = "post";
    const payload = form;
    let url = "faq";
    if (id) {
      method = "put";
      payload.id = id;
    } else {
      delete payload.id;
    }
    ApiClient.allApi(url, payload, method).then((result) => {
      if (result) {
       ( toast.success(" FAQ is added Successfully"));
        Navigate.push("/faq");
      }
      loader(false);
    });
  };



// 

  const imageResult = (e, key) => {
    image[key] = e.value;
    setImage(e.value);
    console.log("imageResult", e);
  };

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
      ApiClient.get(`faq?id=${id}`).then((result) => {
        if (result.success) {
          const newdata = result.data;
          console.log(newdata.category.name,"hhhh");
          setform({
            id: newdata.id,
            question: newdata.question,
            answer: newdata.answer,
            category: newdata.category.id,
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
  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="pprofile1">
          <h3 className="ViewUser">{id ? "Edit" : "Add"} FAQs</h3>
          <div className="form-row">
            <div className="col-md-12 text-right ">
              {/* <i class="fa fa-trash text-danger" aria-hidden="true"></i> */}
            </div>
            <div className="col-md-6 mb-3">
              <label>
              Question<span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={form.question}
                onChange={(e) => setform({ ...form, question: e.target.value })}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
                <label>
                Category<span className="star">*</span>
                </label>
          <select className='form-control' required onChange={e=>setform({...form,category:e.target.value})} value={form.category} >
            <option value="">Select Master category</option>
            {categoriesdata.map((item,index)=>(
                <option className='text-capitalize' value={item.id}>{item.name}</option>
            ))}
          </select>
              </div>  

            {/* <div className="col-md-12 mb-3">
              <label>
              Answer<span className="star">*</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={form.answer}
                onChange={(e) =>
                  setform({ ...form, answer: e.target.value })
                }
              ></textarea>
            </div> */}



                            {/* edior */}
                            <div className="col-md-12 mt-3">
                            <div className="form-group">
                              <label for="exampleFormControlTextarea1">
                              answer
                              </label>
                              <Editor
                              required="required"
                                value={form.answer}
                                onEditorChange={(newValue, editor) => {
                                  setform({
                                    ...form,
                                    answer: newValue,
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



            {/* <div className="col-md-6  mb-3">
              <label className="lablefontcls">Image</label>
              <br></br>
              <ImageUpload
                model="users"
                result={(e) => imageResult(e, "image")}
                value={image ? form.image : ""}
                multiple={false}
              />
            </div> */}
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
