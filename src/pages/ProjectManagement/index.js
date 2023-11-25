import React, { useEffect, useState } from "react";
import methodModel from "../../methods/methods";
import { Link } from "react-router-dom"; 
import Layout from "../../components/global/layout";
import Select from "react-select";
import { toast } from "react-toastify";
import ApiClient from "../../methods/api/apiClient";
import { User } from "../../methods/auth";
import { useSelector } from "react-redux";
import environment from "../../environment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Header from '../../components/global/header';
import loader from "../../methods/loader";
import Multiselect from "multiselect-react-dropdown";
import { Formik } from "formik";
import moment from "moment";
import Pagination from 'react-js-pagination';
import Switch from "react-switch"; 



const Projects = () => { 
    const searchState = useSelector((state) => state.search);

  const [SearchData,setSearchData]=useState("");
const [filters,setfilters]=useState({page:1,count:20,search:"",status:"",skills:[],technology:[]})
  const [total,settotal]=useState(0);
  const [View,setView]=useState(false);
  const [Edit,setEdit]=useState(false);
  const [Editid,setEditid]=useState("")
  const user=useSelector(state=>state.user);
  const [SelectedSkills,setSelectedSkills]=useState([])
  const [SkillsData,setSkillsData]=useState([]);
  const GetAllSkills=()=>{
  loader(true);
  ApiClient.get(`skills`).then(res=>{
    if(res.success){
      const data=res.data;
      const array=[];
      data.map((item,index)=>{
array.push({name:item.name,id:item.id})
      })
      setSkillsData(array);
    }
    loader(false)
  })

  }
  useEffect(()=>{
    GetAllSkills()
  },[])

const [ProjectsData,setProjectsData]=useState([]);
  const GetAllProjects=(p={})=>{
    const newfilters={...filters,...p,skills:p.skills?p.skills.map((item)=>item.id).toString():filters.skills.map((item)=>item.id).toString(),technology:p.technology?p.technology.map((item)=>item.id).toString():filters.technology.map((item)=>item.id).toString()};
    loader(true);
    ApiClient.get(`projects`,newfilters).then(res=>{
      if(res.success){
        setProjectsData(res.data);
        settotal(res.total)
      }
      loader(false);
    })
  }
  useEffect(()=>{
GetAllProjects();
  },[])


      //  for Document 
      const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [images1, setimages1] = useState([]);
      const [ProtofolioError1, setProtofolioError1] = useState(false);
      // const [DoumentUploadLoading, setDocumentUploadLoading] = useState(false);
      const [documents, setdocuments] = useState([]);
    
      //  For Deleting the Document
      const HanldDocumentDelete = (e, index) => {
        e.preventDefault();
        const array = [...images1];
        array.splice(index, 1);
        setimages1(array);
      };
    
      const imageResult = (e) => {
        if ( e.target.files&&e.target.files.length > 0) {
    
          const files = e.target.files;
          const newdata = new FormData();
          let newarray = images1;
          let imgarrays = [];
          let i = 0;
          let original = [];
          for (let items of files) {
            imgarrays.push(items);
          }
          for (let item of imgarrays) {
            let file = files.item(i);
            setDocumentUploadLoading(true);
            ApiClient.multiImageUpload("single/documents?modelName=document", {
              data: file,
            }).then((res) => {
              if (res.success) {
                console.log(res?.data?.imagePath, "THis is Image Path");
                const path = res?.data?.imagePath;
                newarray.push(path);
                original.push(path);
                setdocuments(new Date())
                if(files.length==images1.length){
                  setDocumentUploadLoading(false)
                }
              } else {
                setDocumentUploadLoading(false);
                // toast.error({ message: "Some error Occurred ! Try Again!" });
              }
            });
            
            i++;
    
          }
          setProtofolioError1(false);
          setdocuments(newarray);
          setimages1(newarray);
        } else {
          // toast.error({ message: "Please Upload the Documents" });
        }

      };
      const [EditData,setEditData]=useState({});

      const HandleProjectDelete=(id)=>{
        if(window.confirm("Do you want to Delete this?")){
        loader(true);
        ApiClient.delete(`project?id=${id}`).then(result=>{
          if(result.success){
            toast.success("Job Post Deleted Successfully");
            GetAllProjects();
          }
          loader(false);
        })
      }
      }
      const pageChange = e => {
        setfilters({ ...filters, page: e });
        GetAllProjects({ page: e });
      };
      const HandleSearchSubmit=(e)=>{
        e.preventDefault();
        if(SearchData==""){
      
        }else{
        setfilters({...filters,search:SearchData})
        GetAllProjects({search:SearchData})
        }
      }

      const HandleSearchFilter=(value)=>{
        setfilters({...filters,search:""});
        setSearchData("");
        GetAllProjects({search:""})
      }
      const statusChange=(itm)=>{ 
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this Project`)){
            loader(true)
            ApiClient.put(`change/status?model=projects`,{status,id:itm.id}).then(res=>{
                if(res.success){
                    toast.success(`Project ${status=='active'?'Activated':'Deactivated'} Successfully`)
                    GetAllProjects()
                }
                loader(false)
            })
        }
    }

    useEffect(() => {
        if (user && user.loggedIn) {
            setfilters({ ...filters, search: searchState.data })
            GetAllProjects({ search: searchState.data, page: 1 })
        }
    }, [searchState])
    const ChangeStatus = (e) => {
      setfilters({ ...filters, status: e, page: 1 })
      GetAllProjects({ status: e, page: 1 })
  }

  const [TechnologyData,setTechnologyData]=useState([]);
  const [SelectedTechnology,setSelectedTechnology]=useState([]);
  const GetAllTechnologies=()=>{
    loader(true);
    ApiClient.get(`technologies?status=active`).then(res=>{
      if(res.success){
        const newdata=res.data;
        const array=[];
        newdata.map((item)=>{
 array.push({name:item.name,id:item.id});
        })
        setTechnologyData(array);
      }
    })
  }

  const [AllEmployeers,setAllEmployeers]=useState([]);
  const [SelectedEmployeer,setSelectedEmployeer]=useState({label:"All",value:""});
  const GetAllEmplopyeer=()=>{
    loader(true);
    ApiClient.get(`users/list?status=active&role=64e5cdfc5bb9a041a39046d5&isDeleted=false`).then(res=>{
      if(res.success){
        const data=res.data;
        const MyArray=[{label:"All",value:""}];
        data.map((item)=>{
          MyArray.push({label:item.fullName,value:item.id})
        })
        setAllEmployeers(MyArray);
      }
    })
  }
  useEffect(()=>{
    GetAllTechnologies();
    GetAllEmplopyeer()
   },[]);
   
  return (
    <Layout>
    <>
     <section className="">
     {/* <form className='' style={{float:"right"}}  onSubmit={e=>HandleSearchSubmit(e)}> 
          <div class="input-group">
          <input type="search" placeholder='Search' onChange={e=>e.target.value==""?HandleSearchFilter(e.target.value):setSearchData(e.target.value)} id="form1" class="form-control d-flex-inline" /> 
          <div class="input-group-append">
          <button type="submit" class="btn btn-primary d-inline-flex pl-3 pr-3">
          <i class="fas fa-search"></i>
        </button>
        </div>
        
        </div>
       </form>  */}
        <div className="container-fluid">
       
        <div className="row position-relative">
        {/* <button className="btn btn-primary project w-auto position-absolute right" data-toggle="modal" onClick={e=>{ setView(false);setEdit(false);setimages1([]);setSelectedSkills([]);setProtofolioError1(false)}} data-target="#exampleModal">Add Project</button> */}
       
                    <div className="col-md-12 "> 
                        <div className="faq-title  pb-2 d-flex justify-content-between">
                            <h2 className="hedding">All Job Posts </h2> 
                            <div className="d-flex">
                              <div className="mr-3 "> 
                             <Select  
        value={SelectedEmployeer}  
placeholder="All "
        onChange={e=>{setSelectedEmployeer(e); setfilters({...filters,userId:e.value});GetAllProjects({userId:e.value})}}
        options={AllEmployeers}
      />
                              </div>
                              <div className="mr-3">
                            {/* <Multiselect
            displayValue="name"
            className="d-inline bg-white" 
            options={TechnologyData}   
            placeholder="All Technologies"
            selectedValues={filters.technology}
            onSelect={e=>{setfilters({...filters,technology:e});GetAllProjects({technology:e}) }}
            onRemove={e=>{setfilters({...filters,technology:e});GetAllProjects({technology:e}) }}
            /> */}
            </div>
                            <div className="dropdown addDropdown mr-3">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                    <div className="mr-3">
                            <Multiselect
            displayValue="name"
            options={SkillsData}   
            placeholder="All Skills"
            selectedValues={filters.skills}
            onSelect={e=>{setfilters({...filters,skills:e});GetAllProjects({skills:e}) }}
            onRemove={e=>{setfilters({...filters,skills:e});GetAllProjects({skills:e}) }}
            />
            <div>
            {(filters.skills.length==0)||(filters.userId=="")||(filters.technology.length==0)?null:<button className="btn btn-primary ml-2" onClick={e=>{setfilters({...filters,skills:[],technology:[],status:"",userId:""});GetAllProjects({skills:[],technology:[],status:"",userId:""});setSelectedEmployeer([]);}}>Clear</button>}
            </div>
            </div>
            </div>
                        </div>
                        
                    </div>
                    <div className="table-responsive">
                    <div className='table_section'>
                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'>Title</th>                                   
                                    {/* <th scope="col" className='table_data'>Category</th>                      */}
                                    {/* <th scope='col' className='table_data'>Specialty</th> */}
                                      <th scope="col">Skill Type</th>
                                    <th scope="col" className="table_data">AddedBy</th>
                                    <th scope="col" className="table_data">Status</th>
                                    <th scope="col" className='table_data'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                         {ProjectsData.map((item,index)=>(<tr className='data_row'>
                                        <td className='table_dats'>{item.name}</td> 
                                        <td>{item.skillType&&item.skillType.name}</td>                                       
                                        {/* <td className='table_dats' >{item.categoryDetail&&item.categoryDetail.name}</td> */}
                                        {/* <td className='table_dats' >{item.specialtyDetail&&item.specialtyDetail.name}</td> */}
                                        <td className="table_dats">{item.addedByDetail&&item.addedByDetail.fullName}</td>
                                        <td className="table_dats">                                        {item.status == 'deactive' ?<Switch onChange={e=>statusChange(item)} checked={false} /> : <Switch onChange={e=>statusChange(item)} checked={true} />}
</td>
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                            <i  className="fa fa-eye mt-2" data-toggle="modal" data-target="#exampleModal" onClick={e=>{setProtofolioError1(false);setEditid(item.id);setView(true); setEditData(item);setEdit(true);setimages1(item.documents);setSelectedSkills(item.skills)}}></i>

                                                {/* {isAllow('deleteSkillType') ? */}
                                                 <span className='edit_icon' onClick={() => HandleProjectDelete(item.id)}>
                                                    <i class="material-icons delete" title='Delete'> delete</i>
                                                </span>
                                                 {/* : <></>} */}
                                            </div>
                                        </td>
                                        {/* end */}
                                    </tr>))} 
                            </tbody>
                        </table>
                    </div>
                </div> 
                    {ProjectsData?.length==0?<div className="text-center text-danger m-5"><h5>No Data</h5></div>:null}
                    
                  </div>
                  {total > filters.count ? (
            <div className='' style={{float:"right"}}>

              <Pagination

                activePage={filters.page}
                itemClassPrev='back_page'
                itemClassNext='next_page'
                itemsCountPerPage={filters.count}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={pageChange}
              />
            </div>
          ) : null}
                </div>
                </section>


                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{Edit?View?"View":"Update":"Add"} Project</h5>
        <button type="button" class="close" id="closeprojectmodal" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Formik
      enableReinitialize 
      initialValues={{
        name:Edit?EditData.name:"",
        description:Edit?EditData.description:"",
        documents:[],
        technology:Edit?EditData.technology:"",
        startDate:Edit?EditData.startDate:"",
        endDate:Edit?EditData.endDate:""
      }}
      onSubmit={(values)=>{ 
        
        const payload={id:Editid,name:values.name,description:values.description,technology:values.technology,startDate:values.startDate,endDate:values.endDate,documents:images1,skills:SelectedSkills}
        let method="post";
  if(Edit){
    method="put";
  }else{
    delete payload.id;
  }
  if(payload.documents&&payload.documents.length==0){
setProtofolioError1(true)
return  false
  }else{
    loader(true);
        ApiClient.allApi("project",payload,method).then(Res=>{
          if(Res.success){
            document.getElementById("closeprojectmodal").click();
            GetAllProjects();
            toast.success(Res.message);
          }
          loader(false);
        })
      }
      }}
      >{({values,handleChange,handleSubmit,handleBlur})=>(
      <form onSubmit={handleSubmit}>
      <div class="modal-body"> 
      <div className="row">
      <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Title</label>
 <p className="text-capitalize">{values.name}</p>
             </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Skill Type</label>
<p className="text-capitalize">{EditData.skillType&&EditData.skillType.name}</p>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Skills</label>
            {/* <Multiselect
            displayValue="name"
            options={SkillsData} 
            disable={View}
            required
            selectedValues={SelectedSkills}
            onSelect={e=>setSelectedSkills(e)}
            onRemove={e=>setSelectedSkills(e)}
            /> */}
            <br/>
            {SelectedSkills.map((item)=>(<span className="bg_bages">{item.name}</span>))}
            </div>
        </div>
        {/* <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Specialty</label>
             <p className="text-capitalize">{EditData.specialtyDetail&&EditData.specialtyDetail.name}</p>
            </div>
        </div> */}
        <div className="col-md-6">
            <div className="form-group">
            <label htmlFor="">Budget</label>
             <p>${EditData.hourlyratestart} - ${EditData.hourlyrateEnd}</p>
            </div> 
        </div>
       
            <div className="col-md-12">
                              <label>Documents</label>
                             {View?null: <div className={`profile_btn_portfolio `}>
                                <label className="add_portfolio edit ml-3">
                                  <input
                                    id="bannerImage"
                                    type="file"
                                    multiple={true}
                                    className="d-none"
                                    // accept="image/*"
                                    onChange={(e) => imageResult(e)}
                                  />
                                  <span className="add_portfolio">
                                    <i class="material-icons add_port">add</i>
                                  </span>
                                </label>
                              </div>}
                            </div>


                            <div> 
                              <div class="imagesRow d-flex">
                                {DoumentUploadLoading == true ? (
                                  <div className="text-success">
                                    Uploading...{" "}
                                    <i className="fa fa-spinner fa-spin"></i>
                                  </div>
                                ) : (
                                  images1.map((item, index) => (
                                    <div className="mr-3">
                                      <p className="text-capitalize">
                                        <img
                                          style={{ cursor: "pointer" }}
                                          width={40}
                                          className="document_image"
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5kekkj6iYr_ZSKfB7GRWEJ4q-7_2sruMm5Hbc2haxduVzPhmc1kS-7OKKJDI1FjTEVAg&usqp=CAU"
                                          onClick={(e) =>
                                            window.open(
                                              `${environment.api}images/document/${item}`
                                            )
                                          }
                                        />
                                     {View?null:  <i
                                          className="fa fa-trash text-danger shadow-danger delet_icon"
                                          style={{ cursor: "pointer" }}
                                          onClick={(e) =>
                                            HanldDocumentDelete(e, index)
                                          }
                                        ></i>}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                            {ProtofolioError1&&images1.length==0 ? (
                              <div className="text-danger text-center mt-3 ml-5">
                                Please  Upload Documents {" "}
                              </div>
                            ) : null}
                          
                          <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="">Description</label>
            {/* <textarea type="text" required disabled={View} className="form-control" value={values.description} name="description" onChange={handleChange} ></textarea> */}
            <p>{values.description}</p>
            </div>
        </div> 
        </div>
        <div className="col-md-12 text-right">
            {View?null:<button type="submit" className="btn btn-primary">Submit</button>}
        </div> 
      </div>
      </form>)} 
      </Formik>
    </div>
  </div>
</div>
    </>
    </Layout>
  );
};

export default Projects;
