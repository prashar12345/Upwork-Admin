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
import Multiselect from "multiselect-react-dropdown";
import { v4 as uuidv4 } from 'uuid'; 

export default function AddEditAssessments() {
  const [AddQuestion,setAddQuestion]=useState(false);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const Navigate = useHistory();
  const [form, setform] = useState({ name: "" ,passingScrore:0,weightagePerQuestion:0,});
  const [submitted, setsubmitted] = useState(false);
  const [NewForm1,setNewForm1]=useState({assessment:""})

  const handleSubmit = (e) => {
    e.preventDefault();
    if(SelectedSkills.length==0){toast.error("Please Select Skills"); return false}
    loader(true);
    setsubmitted(true);
    let method = "post";
    const payload = {...form,skills:SelectedSkills};
    let url = "assessment";
    if (id) {
      method = "put";
      payload.id = id;
    } else {
      delete payload.id;
    }
    ApiClient.allApi(url, payload, method).then((result) => {
      if (result.success) {
        setNewForm1({...NewForm1,assessment:result.data})
        if(AddQuestion){
          handleQuestionSubmit(e,result.data)
        }
        else{
          toast.success(result.message);
        Navigate.push("/assessment");
        }
      }
      loader(false);
    });
  };

  //  ############ Skills Types########
  const [Assessmentdata, setAssessmentdata] = useState([]);
  const GetSkillsTypes = () => {
    loader(true);
    ApiClient.get(`skill/types?status=active`).then((res) => {
      if (res.success) {
        setAssessmentdata(res.data);
      }
      loader(false);
    });
  };

///////end Skills Types ///////////


  useEffect(() => {
    GetSkillsTypes();
    if (id) { 
      ApiClient.get(`assessment?id=${id}`).then((result) => {
        if (result.success) {
          const newdata = result.data;
          setSelectedSkills(newdata.skills);
          setform({ name: newdata.name, status: newdata.status ,passingScrore:newdata.passingScrore, weightagePerQuestion:newdata.weightagePerQuestion});
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
  
  const [SkillsData,setSkillsData]=useState([]);
  const [SelectedSkills,setSelectedSkills]=useState([]);
  const GetSkills=()=>{
    loader(true);
    ApiClient.get(`skills?status=active`).then(res=>{
      if(res.success){
        const data=res.data;
        const Array=[]
        data.map((item,index)=>{
       Array.push({name:item.name,id:item.id});
        })
        setSkillsData(Array);
      }
    })
  }
  useEffect(()=>{GetSkills()},[])



  const [AssesmentsData,setAssesmentData]=useState([]);   
  const [newform,setnewform]=useState([{questionType:"",question:"",options:[]}]) 
  // console.log(uuid());
  const [MCQOptions, setMCQOptions] = useState({"0":[
    { id: "", value: "", isCorrectAnswer: false },{ id: "", value: "", isCorrectAnswer: false }
  ]});
 
 

  const handleQuestionSubmit = (e,assesment="") => {
    e.preventDefault(); 
    const array=MCQOptions;
    if(!id){
      Object.keys(array).map((item,indexo)=>{
        MCQOptions[item].map((item,index)=>{
          array[indexo][index]["id"]=uuidv4(item.value);
        })
    }) 
  } 
  newform.map((item,index)=>newform[index].options=MCQOptions[`${index}`]);
  // console.log(newform,"This is the newform data")
  const answerarray=[]
    if(newform.map((item)=>item.questionType=="MCQ")){
      Object.keys(array).map((item,index)=>{
     answerarray.push(array[item].some((item)=>item.isCorrectAnswer==true))
      }) 
      if(answerarray.some((item)=>item==false)){
        toast.error("Please Select Correct Answer for Question");
        return false;
      }
    }
    // loader(true);
    setsubmitted(true);
    let method = "post"; 
    
    let url = "assessment/question";
    newform.forEach((item,index)=>newform[index]["assessment"]=assesment==""?NewForm1.assessment:assesment)
    let payload={"data":newform}
    if (id) {
      method = "put";
        const newpayload ={...payload.data[0]};
        newpayload["id"]=id;
        payload=newpayload 
    } else {
      // delete payload.id;
    } 
    ApiClient.allApi(url, payload, method).then((result) => {
      if (result.success) {
        toast.success("Assessment Added Successfully");
        Navigate.push("/assessment");
      }
      loader(false);
    });
  };
 
  const [Questiondata, setQuestiondata] = useState([]);
  const GetQuestionType = () => {
    loader(true);
    ApiClient.get(`assessments?status=active`).then((res) => {
      if (res.success) {
        setQuestiondata(res.data);
      }
      loader(false);
    });
  };

  // useEffect(() => {
  //   GetQuestionType();
  //   if (id) {
  //     ApiClient.get(`assessment/question?id=${id}`).then((result) => {
  //       if (result.success) {
  //         const newdata = result.data;
  //         setform({ 
  //           assessment:newdata.assessment&&newdata.assessment?.id,
  //         });
  //         setnewform([{question:newdata.question,questionType:newdata.questionType}]);
  //         setMCQOptions({"0":newdata.options}) 
  //       }
  //     });
  //   }
  // }, []);
 


  const HandleAddOptions=(e,index)=>{
    e.preventDefault(); 
    const obj=MCQOptions;
    const array=MCQOptions[index];
    array.push({id: "", value: "", isCorrectAnswer: false })
  obj[index]=array;
  setMCQOptions({...obj})
    loader(false)
  }
  const HandleChange=(e,index,Firstindex)=>{
const {value,name}=e.target;
const obj=MCQOptions;
const mcq=MCQOptions[Firstindex]
  obj[Firstindex][index][name]=value;
// setMCQOptions([...MCQOptions[Firstindex]],mcq[index][name]=value)
setMCQOptions({...obj})

  }
  const HandleDelete=(e,index,mainindex)=>{
    e.preventDefault()
    const obj=MCQOptions; 
const newarray=MCQOptions[index];
newarray.splice(mainindex,1);
obj[index]=newarray; 
setMCQOptions({...obj});
  }

  const HandleCheckboxChange=(e,indexo,mainindex)=>{
    const {checked}=e.target;
    const obj=MCQOptions;
    const array=MCQOptions[indexo];
    if(checked){
      array.map((item,index)=>{
        if(index==mainindex){ 
          array[index]["isCorrectAnswer"]=true 
        }
        else{ 
            array[index]["isCorrectAnswer"]=false; 
        }
      })
    }
    else{
      array.map((item,indexo)=>{
        array[indexo]["isCorrectAnswer"]=false;
      })
    }
    console.log(array,"This is array thats we need")
    obj[indexo]=array
    setMCQOptions({...obj});
  }

  const HandleCommonChange=(e,index)=>{
    const {value,name}=e.target;
    const myform=[...newform];
    setnewform([...myform],myform[index][name]=value)
  }

  const HandleAddMore=(e)=>{
    e.preventDefault();
    const array=newform;
    array.push({question:"",questionType:"",options:[]})
    setnewform([...array]) 
    const optio=MCQOptions;
    optio[`${array.length-1}`]=[{ id: "", value: "", isCorrectAnswer: false },{ id: "", value: "", isCorrectAnswer: false }]
  }
  const HandleDeleteMain=(e,index)=>{
    e.preventDefault();
    const newar=newform;
    newar.splice(index,1);
    setnewform([...newar])
  }
  
  return (
    <Layout>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="pprofile1">
          <h3 className="ViewUser">{id ? "Edit" : "Add"} Assessment</h3>
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

            {/* <div className="col-md-6 mb-3">
              <label>
                Totalscore<span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                required
              />
            </div> */}

            <div className="col-md-6 mb-3">
              <label>
                Weightage per question<span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={form.weightagePerQuestion}
                onChange={(e) => setform({ ...form, weightagePerQuestion: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>
                Minimum passing score<span className="star">*</span>
              </label>
              <input
                type="number"
                className="form-control"
                value={form.passingScrore}
                onChange={(e) => setform({ ...form, passingScrore: e.target.value })}
                required
              />
            </div>


            {/* <div className="col-md-6 mb-3">
              <label>
              skill<span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={form.skill}
                onChange={(e) => setform({ ...form, skill: e.target.value })}
                required
              />
            </div> */}

            <div className="col-md-6 mb-3">
              <label>
                Skills<span className="star">*</span>
              </label>
                       <Multiselect
            displayValue="name"
            options={SkillsData}  
            required
            selectedValues={SelectedSkills}
            onSelect={e=>setSelectedSkills(e)}
            onRemove={e=>setSelectedSkills(e)}
            />
              {/* <select
                className="form-control"
                required
                onChange={(e) =>
                  setform({ ...form, skillType: e.target.value })
                }
                value={form.skillType} 
              >
                <option value="">Select Master Skill</option>
                {Assessmentdata.map((item, index) => (
                  <option className="text-capitalize" value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select> */}
            </div>
            {!id&&AddQuestion==false?<button className="btn btn-primary" onClick={e=>setAddQuestion(true)}>AddQuestion</button>:null}
{id?<button className="btn btn-primary" onClick={e=>Navigate.push(`/questions/${id}`)}>EditQuestion</button>:null}


            {/* <div className="col-md-6 mb-3">
            <div className="check_cls ml-4">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
  <label className="form-check-label" for="flexCheckDefault">
    Yes
  </label>
</div>
<div className="check_cls ml-4">
  <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
  <label className="form-check-label" for="flexCheckChecked">
    No
  </label>
  </div>
</div> */}

            {/* <div className="col-md-6 mb-3">
              <label>
                Status<span className="star">*</span>
              </label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Status"
                intialValue={form.status}
                result={(e) => {
                  setform({ ...form, status: e.value });
                }}
                options={statusModel.list}
              />
              {submitted && !form.status ? (
                <div className="text-danger">Status is Required</div>
              ) : (
                <></>
              )}
            </div> */}

            <div className="col-md-12 "> 
            <div className="text-right mb-5">
            {/* <button type="button" className="btn btn-primary">Add More</button> */}
            </div>
            </div>
          </div>
       {AddQuestion?<div className="pprofile1">
          {/* <h3 className="ViewUser">{id ? "Edit" : "Add"} Questions</h3> */}
          <div className="form-row">
            <div className="col-md-12 text-right ">
            </div>
            {/* <div className="col-md-12 mb-3">
              <label>
              Assessment<span className="star">*</span>
              </label>
              <select required className="form-control" value={form.assessment} onChange={e=>setform({...form,assessment:e.target.value})}>
                <option value="">Please Select Assessment</option>
                {Questiondata.map((item,index)=>(
                  <option value={item.id}>{item.name}</option>
                ))}
              </select> 
            </div> */}

        {newform.map((item,index)=>(
           <div className="col-md-12 row mb-3">    
        <div className="col-md-6 mb-4">
              <label>
                Questions<span className="star">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="question"
                value={item.question}
                onChange={(e) =>HandleCommonChange(e,index)}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label>
                Question type<span className="star">*</span>
              </label>
              <select
                className="form-control"
                required
                name="questionType"
                onChange={(e) =>HandleCommonChange(e,index)}
                value={item.questionType}
              >
                <option value="">Select Question Type</option>
                <option className="text-capitalize" value="MCQ">
                  Multiple Choice Questions
                </option>
                {/* <option className="text-capitalize" value="SingleLineAnswer">
                  Single line answers
                </option> */}
                <option className="text-capitalize" value="description">
                  Descriptive
                </option>
              </select>
              { index==0?null:<i className="fa fa-trash text-danger d-inline" onClick={e=>HandleDeleteMain(e,index)}></i>}
              
            </div>
            {item.questionType == "MCQ"
              ? MCQOptions[index].map((item, indexo) => (
                  <div className="col-md-6">
                    <label className="opecity_0">sada</label>
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <div class="input-group-text">
    <input type="checkbox" name="isCorrectAnswer" value={true} onChange={e=>HandleCheckboxChange(e,index,indexo)} checked={item.isCorrectAnswer}   /> {indexo==0||indexo==1?null:<i className="fa fa-trash text danger" onClick={e=>HandleDelete(e,index,indexo)}></i>}
    </div>
  </div>
  <input type="text" onChange={e=>HandleChange(e,indexo,index)}  name="value"  value={item.value}    required class="form-control" aria-label="Text input with checkbox" />
</div>
                    {/* {/ {/ <input value={item.value} /> /} /} */}
                    {/* <input
                      className="m-2"
                      type="text"
                      id="html"
                      name="value"
                      onChange={e=>HandleChange(e,index)} 
                      value={item.value}
                      required
                    /> */}
                  </div>
                ))
              : null}
              {item.questionType=="MCQ"?<div className="text-center mt-1">
                <button className="btn btn-primary mt-4 text-center" onClick={e=>HandleAddOptions(e,index)}>Add Option</button></div>:null}
            </div>))}
            {id?null:<button className="btn btn-info" style={{float:"right"}} onClick={e=>HandleAddMore(e)}>Add Question</button>}
{/* <br/> */}
 
            
            
            {/* {form.questionType == "SingleLineAnswer"
              ? SingleLineOptions.map((item, index) => (
                  <div className="col-md-6 mb-3">
                    <button
                      type="button"
                      style={{ float: "right" }}
                      onClick={(e) => remove}
                      className="btn btn-danger"
                    >
                      <i className="fa fa-trash delete_common"></i>
                    </button>
                    <label>
                      Single Line Questions<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      // value={form.question}
                      onChange={e => handleChange(index, e)} 
                      required
                    />
{
                index ? 
                  <button type="button"  className="button remove" onClick={() => removeFormFields(index)}>Remove</button> 
                : null
              }
                    <button
                      className="btn btn-success mt-1"
                      onClick={() => addFormFields()}
                      style={{ float: "right" }}
                      type="button"
                    >
                      Add More
                    </button>
                  </div>
                ))
              : null} */}

            <div className="col-md-12 ">
              <div className="text-right mb-5">
                {/* {/ {/ <button type="button" className="btn btn-primary">Add More</button> /} /} */}
              </div>
            </div>
          </div>

          <div className="text-right">
          

          </div>
        </div>:null}

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
