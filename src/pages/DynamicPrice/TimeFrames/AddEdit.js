import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import methodModel from "../../../methods/methods";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { earlybirdpricingType } from "../../../models/type.model";
import countModel from "../../../models/count.model";
import Layout from "../../../components/global/layout";
import './style.scss';
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import Select from "react-select";

const AddEditEarlyBirdPricing = () => {
    const { id, type, copy } = useParams()
    const defaultvalue = () => {
        let keys = { ...earlybirdpricingType }
        Object.keys(earlybirdpricingType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }

    const symbol = [
        { id: '<', name: '<' },
        { id: '>', name: '>' }
    ]

    const dummyArray = [
        { time: '0900 to 1000' },
        { time: '1000 to 1100' },
        { time: '1400 to 1500' },
        { time: '1500 to 1600' }
    ]
    const [form, setform] = useState(earlybirdpricingType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const [date, setdate] = useState([{ startDate: '', endDate:'' }])
    const [country, setcountry] = useState()

    const formValidation = [
        { key: 'name', required: true },
        { key: 'changesDate', required: true },
        { key: 'notApplyCondition', required: true },
        { key: 'country', required: true },
        { key: 'notApplicableFor', required: true },
        { key: 'amountOrPercent', required: true },
        { key: 'discOrPre', required: true },
        
    ]

    const applicables = ['Public Holidays', 'School Holidays', 'Events']

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/dynamic/pricing'
        let value = {
            ...form,
            type: 'earlybirdtimeframes',
            blackOutDates: date,
            country: form.country || 'us',
        }
        if (value.id && copy == 'false') {
            method = 'put'
            url = 'api/dynamic/pricing/update'
        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/dynamicpricelist")
            }
            loader(false)
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/dynamic/pricing/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = earlybirdpricingType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (payload.changesDate) payload.changesDate =  new Date(payload.changesDate)
                    if (payload.changesDateTo) payload.changesDateTo =  new Date(payload.changesDateTo)
                    if(payload.blackOutDates){
                        setdate([...payload.blackOutDates.map(itm => {
                            return { startDate: new Date(itm.startDate), endDate: new Date(itm.endDate) }
                        })])
                    }
                    if (copy == 'true') {
                        payload.name = `Copy of ${payload.name}`
                    }
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }
        getCountry()
    }, [id])

    const selectAll = (checked) => {
        if (checked) {
            setform({ ...form, notApplicableFor: [...applicables] });
        } else {
            setform({ ...form, notApplicableFor: [] });
        }

    }

    const setchecks = (value, checked) => {
        let applyFor = form.notApplicableFor || []
        if (checked == true) {
            applyFor.push(value)
        }
        else {
            applyFor = applyFor.filter(itm => itm != value)
        }
        setform({ ...form, notApplicableFor: applyFor })
    }

    const addmore = () => {
        setdate([...date, { blackOutDates: '' }])
    }
    const remove = (index) => {
        const rows = [...date];
        rows.splice(index, 1);
        setdate(rows);
    }

    const setalldates = (index, value, key) => {
        const field = [...date]
        let endDate=value
        if(key=='startDate') endDate=value
        field[index] = { ...field[index], [key]: value,endDate:endDate }
        setdate([...field]);
    }

    const setalldays = (checked) => {
        if (checked) {
            setform({ ...form, daysToApply: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] });
        } else {
            setform({ ...form, daysToApply: [] });
        }
    }

    const setdays = (value, checked) => {
        let array = form.daysToApply || []
        if (checked == true) {
            array.push(value)
        }
        else {
            array = array.filter(item => item != value)
        }
        setform({ ...form, daysToApply: array })
    }

    const setTimeSlot = (data, checked) => {
        let timeslotarray = form.timeSlots || []
        if (checked == true) {
            timeslotarray.push(data)
        }
        else {
            timeslotarray = timeslotarray.filter(item => item.time != data.time)
        }
        setform({ ...form, timeSlots: timeslotarray })
    }

    const setAllTimeSlots = (checked) => {
        if (checked == true) {
            setform({ ...form, timeSlots: dummyArray.map(item => item) })
        }
        else {
            setform({ ...form, timeSlots: [] })
        }
    }

    const getCountry = () => {
        ApiClient.get(`api/holidays/countries`).then(res => {
            if (res.success) {
                let data = Object.keys(res.data).map(item => {
                    return ({ ...country, value: item.toLowerCase(), label: res.data[item] })
                })
               data=data.sort((a,b)=>{
                    return a.name-b.name
                })
                setcountry(data)
            }
        })
    }

    const handlecountry=()=>{
        let value = ''
        if(form.country){
            value=country&&country.find(item=>item.value==form.country)
        }
        return value
    }

    const isAllNotApplicable = () => {
        let value = true
        if(form&&!form.notApplicableFor){
            return false
        }
        applicables.map(itm => {
            if (form && !form.notApplicableFor.find(titm => titm == itm)) {
                value = false
            }
        })
        return value
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser eventHeading mb-3">{form && form.id && copy == 'false' ? 'Edit' : 'Add'} Early Bird Pricing Time Frames </h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Rule Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Early Bird Pricing - Time Frames'
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Country<span className="star">*</span></label>
                            <Select
                                options={country}
                                placeholder="Select Country"
                                isClearable={true}
                                value={handlecountry()}
                                onChange={e => setform({ ...form,country:e?e.value:'' })}
                            />
                            {submitted && !form?.country ? <div className="text-danger">Country is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Select days from today to apply early bird pricing<span className="star">*</span></label>
                            <div className="form-row">
                                <div className="col-6">
                                    <DatePicker
                                        className="form-control"
                                        selected={form.changesDate}
                                        minDate={new Date()}
                                        placeholderText="Start Date"
                                        name="changesDate"
                                        required
                                        onChange={(date) => { setform({ ...form, changesDate: date, changesDateTo: '' }) }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div>
                                <div className="col-6">
                                    <DatePicker
                                        className="form-control"
                                        placeholderText="End Date"
                                        selected={form.changesDateTo}
                                        minDate={form.changesDate || new Date()}
                                        onChange={(date) => { setform({ ...form, changesDateTo: date }) }}
                                        name="changesDateTo"
                                        required
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </div>
                            </div>
                            {submitted && (!form?.changesDate || !form?.changesDateTo) ? <div className="text-danger">Date Range is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Apply early bird pricing if the number of available spaces is<span className="star">*</span></label>
                            <span className="d-flex">
                                <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="Select One"
                                    intialValue={form.notApplyCondition}
                                    result={e => { setform({ ...form, notApplyCondition: e.value }) }}
                                    options={symbol}
                                />
                                <input
                                    type="text"
                                    className="form-control w-25 ml-3"
                                    placeholder="50%"
                                    minLength={1}
                                    maxLength={10}
                                    value={form.notApply}
                                    onChange={e => setform({ ...form, notApply: methodModel.isNumber(e) })}
                                />
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Do not apply early bird pricing<span className="star">*</span></label>
                            <div class="checkPrice d-flex">
                            <label>
                                <input type="checkbox" onChange={e => selectAll(e.target.checked)} checked={isAllNotApplicable()} className="mr-1" />
                                All
                            </label>
                            {applicables.map(itm => {
                                return <label>
                                    <input type="checkbox" className="mr-1" checked={form.notApplicableFor.includes(itm)} onChange={e => setchecks(itm, e.target.checked)} />
                                    {itm}
                                </label>
                            })}
                        </div>
                            {submitted && !form.notApplicableFor ? <div className="text-danger">Do not apply early is Required</div> : <></>}
                        </div>
                    </div>
                </div>
                <div className="pprofile1 mt-3 mb-3">
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Add Block out Dates or Date Range<span className="star">*</span></label>
                            <div className="row">
                                {date && date.map((item, index) => {
                                    return <div className="row mb-3">
                                        <span className="col-md-6">
                                            <DatePicker
                                                className="form-control"
                                                placeholderText="Choose From Date"
                                                selected={item.startDate}
                                                minDate={new Date()}
                                                required
                                                onChange={(date) => { setalldates(index, date, 'startDate') }}
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        </span>
                                        <span className="col-md-6">
                                            <DatePicker
                                                className="form-control"
                                                placeholderText="Choose To Date"
                                                selected={item.endDate}
                                                required
                                                minDate={item.startDate || new Date()}
                                                onChange={(date) => { setalldates(index, date, 'endDate') }}
                                                onKeyDown={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        </span>
                                        {submitted && (!item?.startDate || !item?.endDate) ? <div className="text-danger">Black Out Dates Range is Required</div> : <></>}
                                        {index > 0 ?
                                            <i class="material-icons text-danger pointer" title="Remove" onClick={e => remove(index)}>remove</i>
                                            : null}
                                    </div>
                                })}
                                <div className="col-md-6 text-left">
                                    <i class="material-icons bg-primary addIc" title="Add More" onClick={e => addmore()}>add</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pprofile1 mt-3 ">
                    <div className="form-row">
                    <div className="col-md-6 mb-3">
                                        <label>Would you like to Apply Discount (-) or Add Premium (+)<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Discount (-) Or Add Premium (+)"
                                            name="discOrPre"
                                            required={true}
                                            intialValue={form.discOrPre}
                                            result={e => { setform({ ...form, discOrPre: e.value }) }}
                                            options={[
                                                {name:'Discount',id:'Discount'},
                                                {name:'Premium',id:'Premium'}
                                            ]}
                                        />
                                        {submitted && !form?.discOrPre ? <div className="text-danger">Discount (-) or Add Premium (+) is Required</div> : <></>}
                                    </div>
                        <div className="col-md-4 mb-3">
                            <label>Apply % or Amount<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="% or Amount"
                                intialValue={form.amountOrPercent}
                                result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                options={countModel.list}
                            />
                            {submitted && !form.amountOrPercent ? <div className="text-danger">Amount is Required</div> : <></>}
                        </div>
                        <div className="col-md-4 mb-3">
                            <label>Add Number(please add number only not $ or % sign)<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder=''
                                minLength={1}
                                maxLength={10}
                                required
                                value={form.number}
                                onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                            />
                        </div>
                        {/* <div className="col-md-4 mb-3">
                            <label>Apply to all days and all time slots<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Yes/No"
                                intialValue={form.applyToDaysTimeSlot}
                                result={e => { setform({ ...form, applyToDaysTimeSlot: e.value }) }}
                                options={requiredModel.list}
                            />
                            {submitted && !form.applyToDaysTimeSlot ? <div className="text-danger">All days and all time slot is Required</div> : <></>}
                        </div> */}
                    </div>
                    <div className="col-md-12 text-right">
                        <Link to={`/dynamicpricelist`} className="btn btn-secondary discard mr-2">Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditEarlyBirdPricing