import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Layout from "../../../components/global/layout";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import "./style.scss";
import { useSelector } from "react-redux";
import methodModel from "../../../methods/methods";
import { toast } from "react-toastify";

const Categorydetail = (p) => {
  const [form, setform] = useState({ resume: "", id: "", resumeDocument: "" });
  const [RejectionReason, setRejectionReason] = useState("");
  const [Resume, setResume] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const { id, userId } = useParams();
  const [data, setData] = useState();
  const getDetail = (did) => {
    loader(true);
    ApiClient.get(`category`, { id: did }).then((res) => {
      if (res.success) {
        const newdata = res.data;
        setData(res.data);
        setform({
          resume: newdata.resume ? newdata.resume : "",
          resumeDocument: newdata.resumeDocument,
          id: did,
        });
        setResume(newdata.resumeDocument);
      }
      loader(false);
    });
  };

  const back = () => {
    history.goBack();
  };

  const edit = (id) => {
    let url = `/AddEditcategory/${id}`;
    // if (role) url = `/users/${role}/edit/${id}`;
    history.push(url);
  };

  useEffect(() => {
    getDetail(userId ? userId : id);
  }, [id, userId]);



  return (
    <Layout>
      <div className="text-right">
        <div className="d-flex justify-content-between align-items-center pl-3 pr-4">
          <h3 className="Profilehedding mt-3 mb-0">Category Detail</h3>
          <div>
            {data?.role &&
            data.role.id == "64e83a928599356bddc2fa00" &&
            (data.isVerifiedDocument == "accepted" ||
              data.isVerifiedDocument == "rejected") ? (
              <p
                className={`text-capitalize btn mr-5 mb-0 btn-${
                  data.isVerifiedDocument == "accepted" ? "success" : "danger"
                }`}
              >
                {data.isVerifiedDocument}
              </p>
            ) : null}
            {/* <i
              onClick={(e) => history.push(`/AddEditcategory/${id}`)}
              class="material-icons edit mr-3"
              title="Edit"
            >
              edit
            </i> */}

            <i onClick={e=>history.push(`/categorylist/edit/${id}`)} class="material-icons edit mr-3" title="Edit">edit</i>
            <a to="/categorylist" onClick={back}>
              {" "}
              <i
                className="fa fa-arrow-left ml-1 "
                title="Back"
                aria-hidden="true"
              ></i>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="sideclass col-md-12">
          <div className="pprofile1">
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label className="profileheddingcls">Name</label>
                <div className="profiledetailscls">{data && data.name}</div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="profileheddingcls">Category Type</label>
                <div className="profiledetailscls">{data && data.cat_type}</div>
              </div>

              <div className="col-md-12 mb-3">
                <label className="profileheddingcls">Image</label>
                <div>
                  <div className="imagethumbWrapper">
                    <img
                      src={methodModel.userImg(data && data?.images)}
                      className="uploadimage"
                    />
                  </div>

            
                </div>
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categorydetail;
