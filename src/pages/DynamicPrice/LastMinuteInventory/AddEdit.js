import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from "react-router-dom";
import ApiClient from "../../../methods/api/apiClient";
import loader from "../../../methods/loader";
import methodModel from "../../../methods/methods";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { earlybirdpricingType } from "../../../models/type.model";
import countModel from "../../../models/count.model";
import Layout from "../../../components/global/layout";
import './style.scss';
import DatePicker from "react-datepicker";
import Select from 'react-select';

const AddEditLastMinuteInventory = () => {
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
    const [inventory, setinventory] = useState([{ availableSpace:'', amountOrPercent:'', number:'' }])
    const [earlyBirdPricing, setearlyBirdPricing] = useState([{ symbol: '', symbolPercentage: '', percentOrAmount: '', percentOrAmountValue: '' }])
    const [country, setcountry] = useState()

    const formValidation = [
        { key: 'name', required: true },
        { key: 'country', required: true },
        { key: 'changesDate', required: true },
        { key: 'changesDateTo', required: true },
        { key: 'lastMinutePricingFromDate', required: true },
        { key: 'lastMinutePricingToDate', required: true },
        { key: 'notApplicableFor', required: true },
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
            type: 'lastminuteinventory', 
            blackOutDates: date, 
            applyEarlyBirdPricing: earlyBirdPricing,
            inventory:inventory
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

    useEffect(()=>{
        getCountry()
    },[])

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
                   
                    if(payload.changesDate) payload.changesDate = new Date(payload.changesDate)
                    if(payload.changesDateTo) payload.changesDateTo = new Date(payload.changesDateTo)
                    if(payload.lastMinutePricingFromDate) payload.lastMinutePricingFromDate = new Date(payload.lastMinutePricingFromDate)
                    if(payload.lastMinutePricingToDate) payload.lastMinutePricingToDate = new Date(payload.lastMinutePricingToDate)

                    if (payload.applyEarlyBirdPricing?.length) {
                        setearlyBirdPricing([...payload.applyEarlyBirdPricing])
                    }

    
                    setinventory([...payload.inventory.map(itm => {
                        return { availableSpace: itm.availableSpace,amountOrPercent : itm.amountOrPercent, number: itm.number }
                    })])
                    setdate([...payload.blackOutDates.map(itm => {
                        return { startDate: new Date(itm.startDate), endDate: new Date(itm.endDate) }
                    })])
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

    // Add More Black Out Dates 
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


     // Add More EarlyBirdPricing
     const addEarlyBirdPricing = () => {
        setearlyBirdPricing([...earlyBirdPricing, { symbol: '', symbolPercentage: '', percentOrAmount: '', percentOrAmountValue: '' }])
    }
    const removeEarlyBirdPricing = (index) => {
        const rows = [...earlyBirdPricing];
        rows.splice(index, 1);
        setearlyBirdPricing(rows);
    }
    const setAllEarlyBirdPricing = (index, value, key) => {
        const field = [...earlyBirdPricing]
        field[index] = { ...field[index], [key]: value }
        setearlyBirdPricing([...field]);
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
                    <h3 className="ViewUser mb-3">{form && form.id && copy == 'false' ? 'Edit' : 'Add'} Last Minute Pricing Inventory Discounting </h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Rule Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Last Minute Pricing'
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
                            <label>Display Date From and To<span className="star">*</span></label>
                            <div className="row">
                                <span className="col-md-6">
                                    <DatePicker
                                        className="form-control"
                                        placeholderText="Choose From Date"
                                        minDate={new Date()}
                                        selected={form.changesDate}
                                        onChange={(date) => { setform({ ...form, changesDate: date,changesDateTo:date }) }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />   
                                </span>
                                <span className="col-md-6">
                                    <DatePicker
                                        className="form-control"
                                        placeholderText="Choose To Date"
                                        selected={form.changesDateTo}
                                        minDate={form.changesDate || new Date()}
                                        onChange={(date) => { setform({ ...form, changesDateTo: date }) }}
                                        onKeyDown={(e) => {
                                            e.preventDefault();
                                        }}
                                    />
                                </span>
                            </div>
                            {submitted && (!form?.startDate || !form?.endDate) ? <div className="text-danger">Display Date Range is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Apply Last Minutes Pricing - From Dates<span className="star">*</span></label>
                            <div>
                                <DatePicker
                                    className="form-control"
                                    placeholderText="Choose a Date"
                                    selected={form.lastMinutePricingFromDate}
                                    minDate={new Date()}
                                    onChange={(date) => { setform({ ...form, lastMinutePricingFromDate: date ,lastMinutePricingToDate:date}) }}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                            </div>
                            {submitted && !form?.lastMinutePricingFromDate ? <div className="text-danger">Apply Last Minutes Pricing From Date is Required</div> : <></>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Apply Last Minutes Pricing - To Dates<span className="star">*</span></label>
                            <div>
                                <DatePicker
                                    className="form-control"
                                    placeholderText="Choose a Date"
                                    selected={form.lastMinutePricingToDate}
                                    minDate={form.lastMinutePricingFromDate || new Date()}
                                    onChange={(date) => { setform({ ...form, lastMinutePricingToDate: date }) }}
                                    onKeyDown={(e) => {
                                        e.preventDefault();
                                    }}
                                />
                            </div>
                            {submitted && !form?.lastMinutePricingToDate ? <div className="text-danger">Apply Last Minutes Pricing To Date is Required</div> : <></>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="h6">Inventory<span className="star">*</span></label>
                            {earlyBirdPricing && earlyBirdPricing.map((item, index) => {
                            return <div className="row mb-3">
                                <div className="col">
                                    <SelectDropdown
                                        id="statusDropdown"
                                        displayValue="name"
                                        placeholder="Select One"
                                        intialValue={item.symbol}
                                        result={e => setAllEarlyBirdPricing(index, e.value, 'symbol')}
                                        options={symbol}
                                    />
                                </div>
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='45'
                                        minLength={1}
                                        maxLength={10}
                                        value={item.symbolPercentage}
                                        onChange={e => setAllEarlyBirdPricing(index, methodModel.isNumber(e), 'symbolPercentage')}
                                    />
                                </div>
                                <div className="col">
                                    <SelectDropdown
                                        id="statusDropdownDiscount"
                                        displayValue="name"
                                        placeholder="Discount (-) Or Add Premium (+)"
                                        intialValue={item.discOrPre}
                                        result={e => setAllEarlyBirdPricing(index, e.value, 'discOrPre')}
                                        options={[
                                            { name: 'Discount', id: 'Discount' },
                                            { name: 'Premium', id: 'Premium' }
                                        ]}
                                    />
                                </div>
                                <div className="col">
                                    <SelectDropdown
                                        id="statusDropdown"
                                        displayValue="name"
                                        placeholder="% or Amount"
                                        intialValue={item.percentOrAmount}
                                        result={e => setAllEarlyBirdPricing(index, e.value, 'percentOrAmount')}
                                        options={countModel.list}
                                    />
                                </div>
                               
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=''
                                        minLength={1}
                                        maxLength={10}
                                        value={item.percentOrAmountValue}
                                        onChange={e => setAllEarlyBirdPricing(index, methodModel.isNumber(e), 'percentOrAmountValue')}
                                    />
                                </div>
                                {index > 0 ?
                                    <i class="material-icons sidenv text-danger ml-1 pointer" title="Remove" onClick={e => removeEarlyBirdPricing(index)}>remove</i>
                                    : null}
                            </div>
                        })}
                        <div className="text-left col-md-6">
                            <i class="material-icons sidenv addIc bg-primary" title="Add More" onClick={e => addEarlyBirdPricing()}>add</i>
                        </div>
                        {submitted && !earlyBirdPricing.length ? <div className="text-danger">Inventory is Required</div> : <></>}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Do not apply early bird pricing if the number of available spaces is<span className="star">*</span></label>
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
                                    required
                                    minLength={1}
                                    maxLength={10}
                                    value={form.notApply}
                                    onChange={e => setform({ ...form, notApply: methodModel.isNumber(e) })}
                                    />
                            </span>
                            {submitted && !form.notApplyCondition ? <div className="text-danger">Early Bird Pricing is Required</div> : <></>}
                        </div> */}
                        <div className="col-md-12 mb-3">
                            <label>Do not apply last minute pricing<span className="star">*</span></label>
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
                            {submitted && !form?.notApplicableFor ? <div className="text-danger">Not apply last minute pricing is Required</div> : <></>}
                        </div>
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
                        </div>
                        {form?.applyToDaysTimeSlot == 'no' ?
                            <div className="col-md-12 mb-3">
                                <label>Select Days to apply<span className="star">*</span></label>
                                <div>
                                    <div className='d-flex'>
                                        <div class="form-check ml-1">
                                            <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={e => setalldays(e.target.checked)} checked={form.daysToApply.includes('monday') && form.daysToApply.includes('tuesday') && form.daysToApply.includes('wednesday') && form.daysToApply.includes('thursday') && form.daysToApply.includes('friday') && form.daysToApply.includes('saturday') && form.daysToApply.includes('sunday')} />
                                            <label class="form-check-label" for="exampleCheck1">All</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Monday" checked={form.daysToApply.includes('monday')} onClick={e => setdays('monday', e.target.checked)} />
                                            <label class="form-check-label" for="Monday">Monday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Tuesday" checked={form.daysToApply.includes('tuesday')} onClick={e => setdays('tuesday', e.target.checked)} />
                                            <label class="form-check-label" for="Tuesday">Tuesday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Wednesday" checked={form.daysToApply.includes('wednesday')} onClick={e => setdays('wednesday', e.target.checked)} />
                                            <label class="form-check-label" for="Wednesday">Wednesday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Thursday" checked={form.daysToApply.includes('thursday')} onClick={e => setdays('thursday', e.target.checked)} />
                                            <label class="form-check-label" for="Thursday">Thursday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Friday" checked={form.daysToApply.includes('friday')} onClick={e => setdays('friday', e.target.checked)} />
                                            <label class="form-check-label" for="Friday">Friday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Saturday" checked={form.daysToApply.includes('saturday')} onClick={e => setdays('saturday', e.target.checked)} />
                                            <label class="form-check-label" for="Saturday">Saturday</label>
                                        </div>
                                        <div class="form-check ml-3">
                                            <input type="checkbox" class="form-check-input" id="Sunday" checked={form.daysToApply.includes('sunday')} onClick={e => setdays('sunday', e.target.checked)} />
                                            <label class="form-check-label" for="Sunday">Sunday</label>
                                        </div>
                                    </div>
                                </div>
                                {submitted && !form.daysToApply ? <div className="text-danger">Days to Apply is Required</div> : <></>}
                            </div>
                            : null} */}
                        {/* <div className="col-md-4 mb-3">
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
                            <label>Add Number<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control py-3"
                                placeholder='10% or $10'
                                minLength={1}
                                maxLength={10}
                                required
                                value={form.number}
                                onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Apply to all price types<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Yes/No"
                                intialValue={form.applypricetype}
                                result={e => { setform({ ...form, applypricetype: e.value }) }}
                                options={requiredModel.list}
                            />
                            {submitted && !form.applypricetype ? <div className="text-danger">All Price Types is Required</div> : <></>}
                        </div>
                        {form?.applypricetype == 'no' ?
                            <div className="col-md-12">
                                <table class="table table-striped">
                                    <thead className="table_head">
                                        <tr className="heading_row">
                                            <th className="table_data" scope="col">Label</th>
                                            <th className="table_data" scope="col">Current Price</th>
                                            <th className="table_data" scope="col"></th>
                                            <th className="table_data" scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row"><label><input type='checkbox' />Adult</label></th>
                                            <td>$220</td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Discount % or $"
                                                    intialValue={form.amountOrPercent}
                                                    result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                                    options={countModel.list}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Amount or %'
                                                    minLength={1}
                                                    maxLength={10}
                                                    required
                                                    value={form.number}
                                                    onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><label><input type='checkbox' />Child</label></th>
                                            <td>$220</td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Discount % or $"
                                                    intialValue={form.amountOrPercent}
                                                    result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                                    options={countModel.list}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Amount or %'
                                                    minLength={1}
                                                    maxLength={10}
                                                    required
                                                    value={form.number}
                                                    onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><label><input type='checkbox' />Family</label></th>
                                            <td>$220</td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Discount % or $"
                                                    intialValue={form.amountOrPercent}
                                                    result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                                    options={countModel.list}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Amount or %'
                                                    minLength={1}
                                                    maxLength={10}
                                                    required
                                                    value={form.number}
                                                    onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><label><input type='checkbox' />Student</label></th>
                                            <td>$220</td>
                                            <td>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Discount % or $"
                                                    intialValue={form.amountOrPercent}
                                                    result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                                    options={countModel.list}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder='Amount or %'
                                                    minLength={1}
                                                    maxLength={10}
                                                    required
                                                    value={form.number}
                                                    onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            : null} */}
                        {/* <div className="col-md-6 mb-3">
                            <label>Apply to all available spaces<span className="star">*</span></label>
                            <SelectDropdown
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Yes/No"
                                intialValue={form.availablespaces}
                                result={e => { setform({ ...form, availablespaces: e.value }) }}
                                options={requiredModel.list}
                            />
                            <div className="table-responsive table_section border">
                                <table class="table table-striped">
                                    <thead className="table_head">
                                        <tr className="heading_row">
                                            <th className="table_data" scope="col">Times</th>
                                            <th className="table_data" scope="col">Spaces</th>
                                            {form.daysToApply && form.daysToApply.map((item, index) => {
                                                return <th scope="col" className="table_data text-capitalize">{item}</th>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyArray && dummyArray.map((itm, i) => {
                                            return <tr>
                                                <td>{itm.time}</td>
                                                {form.daysToApply && form.daysToApply.map((item, index) => {
                                                    return <td scope="row"></td>
                                                })}
                                                <td className="w-50"><input type='text' placeholder="Spaces" className="p-1" /></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {submitted && !form.timeSlots ? <div className="text-danger">Time Slot is Required</div> : <></>}
                        </div> */}
                    </div>
                    <div className="text-right">
                        <Link to={`/dynamicpricelist`} className="btn btn-secondary discard mr-2">Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditLastMinuteInventory