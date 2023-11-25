import React, { useState, useEffect, useRef } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import statusModel from "../../models/status.model";
import { couponType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import datepipeModel from "../../models/datepipemodel";
import { toast } from "react-toastify"; 
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker, Form, Space } from 'antd';
import ReactDatePicker from "react-datepicker";
const { RangePicker } = DatePicker;

const AddEditCoupon = () => {
    const calendorref=useRef();
    const [blur,setblur]=useState(false)
    const defaultvalue = () => {
        let keys = { ...couponType }
        Object.keys(couponType).map(itm => {
            keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const minDate=new Date()
    const [form, setform] = useState(defaultvalue())
    const [loaging, setLoader] = useState(false)
    const [categories, setCategories] = useState(false)
    const [category, setCategory] = useState([])
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const formValidation = [
        { key: 'status', required: true },
        { key: 'discountType', required: true },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)

        if(form.discountType=='Percentage'&&Number(form.discountAmount)>100){
            toast.error("Discount Amount Maximum value is 100")
            return
        }

        if (invalid) return
        let method = 'post'
        let url = 'api/coupon'
        let value = {
            ...form, dateFrom: datepipeModel.date(form.dateFrom), dateTo: datepipeModel.date(form.dateTo)
        }
        if (value.id) {
            method = 'put'
            url = 'api/coupon/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/coupon")
            }
            loader(false)
        })
    }

    const getCategories = (p = {}) => {
        setLoader(true)
        let filter = { page: 1, count: 500, status: 'active' }
        ApiClient.get('api/categories/listing', filter).then(res => {
            if (res.success) {
                setCategories(res.data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
            }
            setLoader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/coupon/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = couponType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    payload.dateFrom=new Date(payload.dateFrom)
                    payload.dateTo=new Date(payload.dateTo)

                    setform({
                        ...payload
                    });
                    setblur(true)
                }
                loader(false)
            })
        }
        getCategories()
    }, [id])

    const isExist=(p)=>{
        let value=false
        if(category.find(itm=>itm==p)) {
            value=true
        }
        return value
    }

    const setcheckbox=(arr=[])=>{
        let els=document.querySelectorAll("input.categoryCheckbox")
        els.forEach(el=>{
            if(arr.find(itm=>itm==el.id)){
                el.checked=true
            }else{
                el.checked=false
            }
        })
    }

    const checkbox=(itm)=>{
        let arr=category
        let exist=isExist(itm.id)
        if(exist){
            arr=arr.filter(aitm=>aitm!=itm.id)
        }else{
            arr.push(itm.id)
        }
        setcheckbox(arr)
        setCategory(arr)
    }

    const toggle=(pi,si=-1,ssi=-1)=>{
        let arr=categories
        if(ssi>=0){
            arr[pi].childCategories[si].childCategories[ssi].active=true
        }else if(si>=0){
            arr[pi].childCategories[si].active=true
        }else if(pi>=0){
            arr[pi].active=true
        }
        setCategories(p=>p=arr)
    }

    const TableRow = ({ itm, className ,pi=-1,si=-1,ssi=-1}) => {
        return <tr className={`data_row ${className}`}>
            <td className="checkboxTd" onClick={e=>checkbox(itm)}>
                <input type="checkbox" className="categoryCheckbox" disabled id={`${itm.id}`}
                //  checked={isExist(itm.id)}
                  />
                {itm.checked}
            </td>
            <td className='table_dats'> <div className='user_detail'  onClick={e=>checkbox(itm)}>
                <img src={methodModel.userImg(itm.banner)} className="user_imgs" />
                <div className='user_name'>
                    <h4 className='user'>
                        {itm.name}
                    </h4>
                </div>
            </div></td>
            <td className="text-right">
                <i className={`fa ${itm.active?'fa-chevron-up':'fa-chevron-down'}`} onClick={e=>toggle(pi,si,ssi)}></i>
            </td>
        </tr>
    }

    //  For Dedtapicker 
    const dateconvert=(date)=>{ 
        console.log(date,"THis is the date")
       
            const startdatedate=date[0];
            const enddate=date[1];
            const convertedstart=datepipeModel.datetostring(startdatedate);
            const convertedend=datepipeModel.datetostring(enddate);
     setform({...form,dateFrom:convertedstart,dateTo:convertedend}); 
    // alert(convertedstart)
    // alert(convertedend)
        }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Coupon</h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Title<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.title}
                                onChange={e => setform({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                intialValue={form.status}
                                result={e => { setform({ ...form, status: e.value }) }}
                                options={statusModel.list}
                            />
                            {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                        </div>

                        <div className="col-md-12 mb-3">
                            <label>Description<span className="star">*</span></label>
                            <textarea
                                className="form-control"
                                value={form.description}
                                onChange={e => setform({ ...form, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Coupon Code<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.couponCode}
                                onChange={e => setform({ ...form, couponCode: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Uses Per Coupon<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.usesPerCoupon}
                                maxLength="10"
                                onChange={e => setform({ ...form, usesPerCoupon: methodModel.isNumber(e) })}
                                required
                            />
                        </div> 
                        
                        <div className="col-md-6 mb-3">
                            <label>Uses Per Customer<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.usesPerCustomer}
                                maxLength="10"
                                onChange={e => setform({ ...form, usesPerCustomer: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Date From - Date To<span className="star">*</span></label>
                            {/* <input
                                type="date"
                                className="form-control"
                                value={form.dateFrom}
                                min={minDate}
                                onChange={e => setform({ ...form, dateFrom: e.target.value, to: '' })}
                                required
                            /> */} 
                            { !blur?
                            <RangePicker
                            className="dateRangePicker"
                            placeholder={["Start Date", "End Date"]}
                            format="MM-DD-YYYY"
                            // onBlur={e=>setblur(true)} 
                             onChange={(date) =>dateconvert(date)}
                            />:<ReactDatePicker
                            selectsRange={true}
                            placeholder={["Start Date", "End Date"]}
                            startDate={form.dateFrom}
                            endDate={form.dateTo}
                            format="MM-DD-YYYY"
                            className="dateRangePicker"
                            onFocus={e=>{setblur(false);}}
                            onChange={(update) => {
                              // setDateRange(update)
                              dateconvert(update)
                            }}
                            isClearable={true}
                          />}
                             {/* <DatePicker
                            selected={form.dateFrom}
                            className="form-control alignTopDate"
                            minDate={minDate}
                            onChange={(date) => setform({...form,dateFrom:date,dateTo:date})}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                            />  */}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Date To<span className="star">*</span></label>
                       
                            <DatePicker 
                            selected={form.dateTo} 
                            className="form-control alignTopDate" 
                            minDate={form.dateFrom || minDate}
                            onChange={(date) => setform({...form,dateTo:date})}
                            onKeyDown={(e) => {
                                e.preventDefault();
                            }}
                            />
                        </div> */}
                        <div className="col-md-6 mb-3">
                            <label>Discount Type<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Discount Type"
                                intialValue={form.discountType}
                                result={e => { setform({ ...form, discountType: e.value, discountAmount: '' }) }}
                                options={[
                                    { id: 'Fixed Amount', name: 'Fixed Amount' },
                                    { id: 'Percentage', name: 'Percentage' },
                                ]}
                            />
                            {submitted && !form.discountType ? <div className="text-danger">Discount Type is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Discount Amount<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.discountAmount}
                                maxLength={form.discountType == 'Percentage' ? 3 : 10}
                                onChange={e => setform({ ...form, discountAmount: methodModel.isNumber(e) })}
                                required
                            />
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Minimum Order<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.minimumOrder}
                                maxLength="10"
                                onChange={e => setform({ ...form, minimumOrder: methodModel.isNumber(e) })}
                                required
                            />
                        </div> */}
                        {/* <div className="col-md-12 mb-3">
                            <label>Category<span className="star">*</span></label>
                            <div>
                                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#categoryModal">Select Category</button>
                            </div>
                            <table class="table table-striped">
                                <tbody>
                                    {!loaging && categories && categories.map((itm, i) => {
                                        return <>
                                            <TableRow itm={itm} pi={i} />
                                            {itm.childCategories && itm.childCategories.map((citm,si) => {
                                                return <>
                                                    <TableRow itm={{ ...citm, id: citm._id }} pi={i} si={si} className="subCategory" />
                                                    {citm.childCategories && citm.childCategories.map((sitm,ssi) => {
                                                        return <TableRow itm={{ ...sitm, id: citm._id }} pi={i} si={si} ssi={ssi} className="subSubCategory" />
                                                    })}
                                                </>
                                            })}
                                        </>

                                    })
                                    }
                                </tbody>
                            </table>
                        </div> */}
                    </div>
                    <div className="text-right">
                    <Link className="btn btn-secondary discard mr-2" to="/coupon">Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>


            </form>
        </Layout>


        <div class="modal fade" id="categoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Select Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddEditCoupon