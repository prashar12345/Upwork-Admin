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

export default function AddEditcategory() {
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const Navigate = useHistory();
  const [form, setform] = useState({id:"" ,name:"" ,cat_type:"",image:[]});
  const [submitted, setsubmitted] = useState(false);
  const [images, setImages] = useState([]);
console.log(form,'dddd')

  const handleSubmit = (e) => {
    e.preventDefault();
    loader(true);
    setsubmitted(true);
    let method = "post";
    const payload = form;
    let url = "category";
    if (id) {
      method = "put";
      payload.id = id;
      payload.image = images;
    } else {
      delete payload.id;
    }
    ApiClient.allApi(url, payload, method).then((result) => {
      if (result.success) {
        toast.success(result.message);
        Navigate.push("/categorylist");
      }
      loader(false);
    });
  };


  const imageResult = (e, key) => {
    images[key] = e.value
    setImages(images)
    console.log("imageResult", e)
}



  useEffect(() => {
    if (id) {
      ApiClient.get(`category?id=${id}`).then((result) => {
        if (result.success) {
          const newdata = result.data;
          setImages(newdata.image?newdata.image:[])
          setform({ name: newdata.name, cat_type:newdata.cat_type, image:newdata.image?newdata.image:[]});
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
  console.log(form.images,"EveryTime")
  
  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="pprofile1">
          <h3 className="ViewUser">{id ? "Edit" : "Add"} Category</h3>
          <div className="form-row">
          <div className="col-md-12 text-right ">
          {/* <i class="fa fa-trash text-danger" aria-hidden="true"></i> */}
          </div>
            <div className="col-md-6 mb-3">
              <label>
                Name<span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                onChange={(e) => setform({ ...form, name: e.target.value })}
                required
              />
            </div>


            <div className="col-md-6 mb-3">
              <label>
              Category type<span className="star">*</span>
              </label>
              <select
                className="form-control"
                required
                value={form?.cat_type}
                onChange={(e) =>
                  setform({ ...form, cat_type: e.target.value })
                }
                // value={form.data?.cat_type}
              >
                <option value="">Select Category Type</option>
                <option className="text-capitalize" value="Blog">
                Blog
                </option>
                <option className="text-capitalize" value="Faq">
                Faq
                </option>
              </select>
            </div>
          
            <div className="col-md-6  mb-3">
                            <label className='lablefontcls'>Image</label><br></br>
                            <ImageUpload model="users" result={e => imageResult(e, 'image')} value={form?.image?form.image:[]} multiple={true} />
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
