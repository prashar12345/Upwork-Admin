import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import { Editor } from "@tinymce/tinymce-react";
import methodModel from '../../../methods/methods';
import rolesModel from '../../../models/roles.model';
import environment from '../../../environment';
import parse from 'html-react-parser'
import moment from 'moment';
import ResumeEdit from './ResumeEdit';
import { toast } from 'react-toastify';


const CustomerDetail = (p) => {
    const [form,setform]=useState({resume:"",id:"",resumeDocument:""})
    const [RejectionReason,setRejectionReason]=useState("");
  const [Resume,setResume]=useState("")
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`user/details`, { id: did }).then(res => {
            if (res.success) {
                const newdata=res.data;
                    setData(res.data)
                setform({resume:newdata.resume?newdata.resume:"",resumeDocument:newdata.resumeDocument,id:did});
                setResume(newdata.resumeDocument)
            }
            loader(false)
        })
    };

    const back = () => {
        history.goBack()
    }

    const edit=(id)=>{
        let url=`/users/edit/${id}`
        if(role) url=`/users/${role}/edit/${id}`
        history.push(url)
    }

    useEffect(() => {
        getDetail(userId ? userId : id)
    }, [id, userId])
    
const [EducationData,setEducationData]=useState([]);
const GetEducation=()=>{
    loader(true);
    ApiClient.get(`educations?userId=${id}`).then(res=>{
        if(res.success){
     setEducationData(res.data);
        }
    })
}
const [EmployeementData,setEmoloyeementData]=useState([]);
const GetEmployementData=()=>{
ApiClient.get(`employments?userId=${id}`).then(res=>{
    if(res.success){
        setEmoloyeementData(res.data)
    }
})
}
useEffect(()=>{
GetEducation();
GetEmployementData();
},[])
    
const HandleAccpetReject=(e,status)=>{
    e.preventDefault();
    loader(true);
    const payload={isVerifiedDocument:status,id:id}
    ApiClient.put(`edit/profile`,payload).then(res=>{
        if(res.success){
            getDetail(id);
        }
    })
  }

  const [images,setimages]=useState([]) 
  
  const [ProtofolioError,setProtofolioError]=useState(false)

  const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
  const [documents, setdocuments] = useState([]);


  const imageResult = (e) => {
    if (e.target.files.length > 0) {
      setDocumentUploadLoading(true);
      const files = e.target.files;
      const newdata = new FormData();
      let newarray = [];
      let imgarrays = [];
      let i = 0;
      let original = [];
      for (let items of files) {
        imgarrays.push(items);
      }
      for (let item of imgarrays) {
        let file = files.item(i);
        ApiClient.multiImageUpload("single/documents?modelName=document", {
          data: file,
        }).then((res) => {
          if (res.success) {
            console.log(res?.data?.imagePath, "THis is Image Path");
            const path = res?.data?.imagePath; 
            setResume(path) 
            setform({...form,resumeDocument:path})
            setDocumentUploadLoading(false);
          } else {
            setDocumentUploadLoading(false);
            // toast.error({ message: "Some error Occurred ! Try Again!" });
          }
        });

        i++;
      }
      setProtofolioError(false);
      setdocuments(newarray);
      setimages(newarray);
    } else {
      // toast.error({ message: "Please Upload the Documents" });
    }
  };
  //  For Deleting the Document
  const HanldDocumentDelete = (e) => {  
    setResume("")
    setform({...form,resumeDocument:""})
  };
  const handleSubmit=(e,type="")=>{
e.preventDefault();
let payload=form;
if(type=="delete"){payload={resume:"",resumeDocument:"",id:form.id}}
loader(true);
ApiClient.put(`edit/profile`,payload).then(res=>{
    if(res.success){
        getDetail(form.id);
        toast.success(`Resume ${type=="delete"?"Deleted": "Updated"} Successfully`)
        document.getElementById("closeresume").click();
        loader(false);
    }
})
  }

//    This is Method for Rejection 
const handlerejectionSubmit=(e)=>{
    e.preventDefault();
    loader(true);
    const payload={isVerifiedDocument:"rejected",reason:RejectionReason,id:id}
    ApiClient.put(`edit/profile`,payload).then(res=>{
        if(res.success){
            document.getElementById("closerejection").click()
            toast.success("Virtual Assitant Rejected Successfully")
            getDetail(id);
        }
    })

}
    return (
        <Layout>
            <div className="text-right">
                <div className="d-flex justify-content-between align-items-center pl-3 pr-4">
                <h3 className="Profilehedding mt-3 mb-0">
                    User Detail
                    </h3>
                    <div>
                {data?.role&&data.role.id=="64e83a928599356bddc2fa00"&&(data.isVerifiedDocument=="accepted"||data.isVerifiedDocument=="rejected")?<p className={ `text-capitalize btn mr-5 mb-0 btn-${data.isVerifiedDocument=="accepted"?"success":"danger"}`}>{data.isVerifiedDocument}</p>:null}
                <i onClick={e=>history.push(`/users/edit/${id}`)} class="material-icons edit mr-3" title="Edit">edit</i>
                    <a to="/users" onClick={back}>  <i className="fa fa-arrow-left ml-1 " title='Back' aria-hidden="true"></i></a>

                                               
                </div>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                <div className="pprofile1"> 
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.fullName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Mobile No</label>
                            <div className='profiledetailscls'>({ data&&data.dialCode}) {data&& data.mobileNo}</div>
                        </div>
            
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Country</label>
                            <div className='profiledetailscls'>{data?.country}</div>
                        </div> 
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">State</label>
                            <div className='profiledetailscls'>{data?.state}</div>
                        </div> 
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">City</label>
                            <div className='profiledetailscls'>{data?.city}</div>
                        </div> 
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Address</label>
                            <div className='profiledetailscls'>{data?.address}</div>
                        </div> 
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Email</label>
                            <div className='profiledetailscls'>{data && data.email}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Role</label>
                            <div className='profiledetailscls'>{data?.role?.name}</div>
                        </div> 
                        <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Image</label>
                            <div>
                                <div className="imagethumbWrapper">
                                    <img src={methodModel.userImg(data && data.image)} className="uploadimage" />
                                </div>
                            </div>
                        </div>
                        {/*  Here we need to show the Employeer data */}
                        {data?.role&&data?.role?.id=="64e5cdfc5bb9a041a39046d5"?<>
                        <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Company Details</label>
                            <hr/>
                            <div className=''> 
                            <div className="imagethumbWrapper">
                            <img  className='uploadimage' src={`${ !data?.companyImage?"/assets/img/noimage.jpg" :environment.api+"images/users/"+data?.companyImage}`}/>
                            </div>
                                    <div className='row'>
                                      <div className='col-md-6'>
                                        <label className="profileheddingcls">Name </label>
                            {data.companyname==""?null:<div className='profiledetailscls'>{data?.companyName}</div>}</div>
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">Website</label>
                            {data?.companyWebsite==""?null: <div className='profiledetailscls'>{data.companyWebsite}</div>}</div>

                            <div className='col-md-6'>
                                        <label className="profileheddingcls">StartDate</label>
                            {data.companyStartDate==""?null:<div className='profiledetailscls'>{moment(data?.companyStartDate).format("DD MMM YYYY")}</div>}</div>                                        <div className='col-md-6'>
                                        
                            <div className='col-md-6'>
                                        <label className="profileheddingcls">Owner</label>
                            {data?.contactName==""?null:<div className='profiledetailscls'>{data?.contactName}</div>}</div>

                                        </div>
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">Email</label>
                            {data.contactEmail==""?null:<div className='profiledetailscls'>{data?.contactEmail}</div>}</div>
                            <div className='col-md-6'>
                                        <label className="profileheddingcls">MobileNumber</label>
                            { data.companyMobileNo==""?<div className='profiledetailscls'>{data?.companyMobileNo}</div>:null}</div>
                            <div className='col-md-12'>
                                        <label className="profileheddingcls">Description</label>
                            {data.companyDescription==""?null:<div className='profiledetailscls'>{data.companyDescription}</div>}</div>
                                        </div> 
                            </div>
                        </div>  
                        
                        </>:null}
                        {/*  Here We need to show the all things thats the Virtual Assitance Submit in Form  */}
                        {data?.role&&data.role.id=="64e83a928599356bddc2fa00"?<>

                       
                        
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">HourlyRate</label>
                            <div className='profiledetailscls'>${data?.hourlyRate}</div>
                        </div> 
                        {data.portfolioUrl != "" ? ( 
                          <div className='col-md-12'>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">PortfolioUrl</label>
                            <div className='profiledetailscls'>{data?.portfolioUrl}</div>
                        </div>
                  {data.portfolioImage&&data.portfolioImage.length>0?   <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">PortfolioDocument</label>
                            <div className='profiledetailscls'>{data?.portfolioImage&&data.portfolioImage.map((item,index)=>(
                                <img style={{cursor:"pointer"}} src='https://cdn1.iconfinder.com/data/icons/human-resources-33/100/hr-06-512.png' onClick={e=>window.open(`${environment.api}images/document/${item}`)}  width={40} height={40} />
                            ))}</div>
                        </div> :null}
                        </div> 
                        ) : (
                    ""
                  )}

             
                  {data.skills != "" ? ( 
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Skills</label>
                            <div className='profiledetailscls'>
                                {data.skills&&data.skills.map((item,index)=>(
                                    <p className='text-capitalize'>{item.label}</p>
                                ))}
                            </div>
                        </div>  

                        ) : (
                    ""
                  )}
                        <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Education</label>
                            <hr/>
                            <div className=''>
                                {EducationData.map((item,index)=>( 
                                    <div className='row'>
                                      <div className='col-md-6'>
                                        <label className="profileheddingcls">Degree</label>
                            <div className='profiledetailscls'>{item.degree}</div></div>
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">School</label>
                            <div className='profiledetailscls'>{item.school}</div></div>

                            <div className='col-md-6'>
                                        <label className="profileheddingcls">StudyArea</label>
                            <div className='profiledetailscls'>{item.studyArea}</div></div>           
                                                         
                                        
                            <div className='col-md-6'>
                                        <label className="profileheddingcls">StartDate</label>
                            <div className='profiledetailscls'>{item.startDate}</div>
                            </div>
 
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">EndDate</label>
                            <div className='profiledetailscls'>{item.endDate}</div></div>
                            <div className='col-md-12'>
                                        <label className="profileheddingcls">Description</label>
                            <div className='profiledetailscls'>{item.description}</div></div>
                                        </div>
                                ))}
                            </div>
                        </div>  


                        {/*  For Employeements */}
                        <div className="col-md-12 mb-3">
                            <label className="profileheddingcls">Employment </label><hr/>
                            <div className=''>
                                {EmployeementData.map((item,index)=>( 
                                    <div className='row'>
                                      <div className='col-md-6'>
                                        <label className="profileheddingcls">Company</label>
                            <div className='profiledetailscls'>{item.company}</div></div>
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">Title</label>
                            <div className='profiledetailscls'>{item.title}</div></div> 
                                                                
                                        
                            <div className='col-md-6'>
                                        <label className="profileheddingcls">StartDate</label>
                            <div className='profiledetailscls'>{item.startDate}</div></div>

                                         
                                        <div className='col-md-6'>
                                        <label className="profileheddingcls">EndDate</label>
                            <div className='profiledetailscls'>{item.currentlyWorking?"Working Here":item.endDate}</div></div>
                            <div className='col-md-12'>
                                        <label className="profileheddingcls">Description</label>
                            <div className='profiledetailscls'>{item.description}</div></div>
                                        </div>
                                ))}
                            </div>
                        </div>  
                        <div className='col-md-12'>
                        <label className="profileheddingcls">Documents</label><hr/>
                            <div className='profiledetailscls'>{data?.document&&data.document.map((item,index)=>(
                                <img style={{cursor:"pointer"}} src='https://cdn1.iconfinder.com/data/icons/human-resources-33/100/hr-06-512.png' onClick={e=>window.open(`${environment.api}images/document/${item}`)}  width={40} height={40} />
                            ))}</div>
                        </div> 

                        <div className='col-md-12 mt-3'>
                          <div className="d-flex align-items-center justify-content-between">
                        <label className="profileheddingcls">Resume</label>
                        <div>
                        {data.resume!=""||data.resumeDocument!=""? <> 
                        <i title='Delete' onClick={e=>{ handleSubmit(e,"delete")}} className='fa fa-trash text-danger mr-3'></i> 
                        <i title='Edit' data-toggle="modal" data-target="#resumeedit" className='fa fa-pen text-info'></i>
                        </>:null}</div>
                        </div>
                        <hr/>
                        <label className='profileheddingcls' >Resume</label>
                        <div className='profiledetailscls'>{parse(`${data.resume}`)}</div>
                            <div className='profiledetailscls'>{data?.resumeDocument!=""?
                                <img style={{cursor:"pointer"}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVlvvKw31TIIrVV3C6ZVXErB8sDduDYcyAFg&usqp=CAU' onClick={e=>window.open(`${environment.api}images/document/${data.resumeDocument}`)}  width={50}   />:null
                                }</div>
                        </div>
                        
                        <div className='col-md-12 mt-3'>
                        <label className="profileheddingcls">Video Introduction </label><hr/>
                       {data.introLink!=""? <div>
                        <label className='profileheddingcls' >Videourl</label>
                        <div className='profiledetailscls'>
                        <iframe width="300" height="230" src={`${data.introLink}`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </div>
                        </div>:null}
                        
                        <div className='mt-3'>
                        <label className='profileheddingcls' >Video</label>
                        <div className=''>{data.introVideo==""?null:<video width={400} height={150} controls src={environment.api+"images/videos/"+data.introVideo}/>}</div>
                        </div>
                  
                        </div>
                    {data.isVerifiedDocument!="accepted"&&data.isVerifiedDocument!="rejected"?    <div className="col-md-6 mb-3 mt-4">
                        <button type="button" className="btn btn-primary " onClick={e=>HandleAccpetReject(e,"accepted")} >Accept</button>
                        <button type="button" className="btn btn-secondary ml-2" data-toggle="modal" data-target="#openrejectmodal">Reject</button>
                        </div>:null}
                        </>:null} 
                    </div>
                    </div>
                </div>
            </div> 

            {/*  For Resume Modal  */}
<button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#resumeedit">
  Launch demo modal
</button> 
<div class="modal fade" id="resumeedit" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header"> 
        <button type="button" class="close" id='closeresume' data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div className="pprofile1">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="ViewUser">Resume</h3>
            </div>
            <form className="form-row" onSubmit={handleSubmit}>
              <div className="main_profile_page">
                <div className="row">
                  <div className="col-md-12">
                    <div className="">
                      <div className="row">
                        {/* new */}
   
                          <>
                            {" "}
                            <div className="col-md-12 mt-3"> 
                            </div>
                            <br />
                            <div className="col-md-12 mt-3">
                              <div className="form-group">
                                <label for="exampleFormControlTextarea1">
                                  Resume
                                </label>
  <Editor
   value={form.resume} 
   onEditorChange={(newValue, editor) => {
    setform({
      ...form,
      resume: newValue,
    })
   }}
   init={{
    selector: 'textarea',
        plugins: 'table code colorpicker textcolor',
       toolbar: 'table code bold italic alignleft aligncenter alignright alignjustify | outdent indent ',
        toolbar_mode: 'floating',
   
   }}
  />
                       
                              </div> 
                            </div>
                            <div className="col-md-12 mt-3">
                              <label>Resume Document</label>
                              <div className={`profile_btn_portfolio d-${Resume==""?"":"none"} `}>
                                <label className="add_portfolio edit ml-3">
                                  <input
                                    id="bannerImage"
                                    type="file" 
                                    className="d-none"
                                    // accept="image/*"
                                    onChange={(e) => imageResult(e)}
                                  />
                                  <span className="add_portfolio">
                                    <i class="material-icons add_port">add</i>
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div>
                              <br />
                              <div class="imagesRow mt-3 mr-5 d-flex flex-wrap">
                                {DoumentUploadLoading == true ? (
                                  <div className="text-success">
                                    Uploading...{" "}
                                    <i className="fa fa-spinner fa-spin"></i>
                                  </div>
                                ) : (  Resume!=""?
                                    <div>
                                      <p className="text-capitalize">
                                        <img
                                          style={{ cursor: "pointer" }}
                                          width={40} 
                                          className="document_image"
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                          onClick={(e) =>
                                            window.open(
                                              `${environment.api}images/document/${Resume}`
                                            )
                                          }
                                        />
                                        <i
                                          className="fa fa-trash text-danger shadow-danger delet_icons"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            HanldDocumentDelete(e)
                                          }
                                        ></i>
                                      </p>
                                    </div> :null
                                )}
                              </div>
                            </div>
                            {ProtofolioError ? (
                              <div className="text-danger text-center mt-3 ml-5">
                                Please enter Resume or Upload Document{" "}
                              </div>
                            ) : null}
                          </> 
  
                        <div className="col-md-12 text-right mt-3">
                          <button data-dismiss="modal" onClick={e=>getDetail(id)} className="btn btn-primary reset">
                            Discards
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary edit ml-3"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      </div>
      <div class="modal-footer"> 
      </div>
    </div>
  </div>
</div>

{/*  Modal for Reject  */} 

<button type="button" class="btn btn-primary d-none" data-toggle="modal" data-target="#openrejectmodal">
  Launch demo modal
</button> 
<div class="modal fade" id="openrejectmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Reason for Rejection</h5>
        <button type="button" id='closerejection' class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body"> 
      <form onSubmit={e=>handlerejectionSubmit(e)}>
      <input required value={RejectionReason} onChange={e=>setRejectionReason(e.target.value)} className='form-control' /> 
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
      </div>
      </form>
      </div>
    </div>
  </div>
</div>


        </Layout>

    );
};

export default CustomerDetail;
