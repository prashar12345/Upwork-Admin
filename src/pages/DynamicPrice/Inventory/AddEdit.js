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
import requiredModel from "../../../models/required.model";
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
            keys[itm] = ''
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
    const [earlyBirdPricing, setearlyBirdPricing] = useState([{ symbol: '', symbolPercentage: '', percentOrAmount: '', percentOrAmountValue: '' }])

    const formValidation = [
        { key: 'name', required: true },
        { key: 'changesDate', required: true },
        { key: 'notApplicableFor', required: true },
        { key: 'country', required: true },
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
            type: 'earlybirdinventory',
            blackOutDates: date,
            country: form.country || 'us',
            applyEarlyBirdPricing: earlyBirdPricing
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
                    if (payload.changesDate) payload.changesDate = new Date(payload.changesDate)
                    if (payload.changesDateTo) payload.changesDateTo = new Date(payload.changesDateTo)
                    if(payload.blackOutDates){
                        setdate([...payload.blackOutDates.map(itm => {
                            return { startDate: new Date(itm.startDate), endDate: new Date(itm.endDate) }
                        })])
                    }
                    if(payload.applyEarlyBirdPricing){
                        setearlyBirdPricing([...payload.applyEarlyBirdPricing.map(item=>{
                            return { symbol: item.symbol, symbolPercentage: item.symbolPercentage, percentOrAmount: item.percentOrAmount, percentOrAmountValue:item.percentOrAmountValue }
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

    // Add More EarlyBirdPricing
    const addEarlyBirdPricing = () => {
        setearlyBirdPricing([...earlyBirdPricing, { symbol:'', symbolPercentage:'', percentOrAmount:'', percentOrAmountValue:'' }])
    }
    const removeEarlyBirdPricing = (index) => {
        const rows = [...earlyBirdPricing];
        rows.splice(index, 1);
        setearlyBirdPricing(rows);
    }
    const setAllEarlyBirdPricing = (index, value, key) => {
        const field = [...earlyBirdPricing]
        field[index]={...field[index],[key]:value}
        setearlyBirdPricing([...field]);
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
                    <h3 className="ViewUser mb-3">{form && form.id && copy == 'false' ? 'Edit' : 'Add'} Early Bird Pricing Inventory </h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Rule Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='Early Bird Pricing - Inventory'
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
                            <label>Select Days From Today To Apply Early Bird Pricing<span className="star">*</span></label>
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
                        <div className="col-md-12 mb-3">
                            <label>Apply early bird pricing if the number of available spaces is<span className="star">*</span></label>
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
                                            className="form-control py-3"
                                            placeholder='80%'
                                            minLength={1}
                                            maxLength={10}
                                            value={item.symbolPercentage}
                                            onChange={e => setAllEarlyBirdPricing(index, e.target.value, 'symbolPercentage')}
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
                                            className="form-control py-3"
                                            placeholder=''
                                            minLength={1}
                                            maxLength={10}
                                            value={item.percentOrAmountValue}
                                            onChange={e => setAllEarlyBirdPricing(index, e.target.value, 'percentOrAmountValue')}
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
                            {submitted && !earlyBirdPricing.length ? <div className="text-danger">Early Bird Pricing is Required</div> : <></>}
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
                        {/* <div className="col-md-6 mb-3">
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
                        </div> */}
                        {/* <div className="col-md-12 mb-3">
                            <label>Select Time Slots to apply<span className="star">*</span></label>
                            <div class="form-check ml-1">
                                <input type="checkbox" class="form-check-input" id="timeslot" onClick={e => setAllTimeSlots(e.target.checked)} />
                                <label class="form-check-label" for="timeslot">All Slots</label>
                            </div>
                            <div className="table-responsive table_section border">
                                <table class="table table-striped">
                                    <thead className="table_head">
                                        <tr className="heading_row">
                                            <th className="table_data" scope="col">Select</th>
                                            <th className="table_data" scope="col">Times</th>
                                            {form.daysToApply && form.daysToApply.map((item, index) => {
                                                return <th scope="col" className="table_data text-capitalize">{item}</th>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyArray && dummyArray.map((itm, i) => {
                                            return <tr>
                                                <th scope="row"><input type="checkbox" id="timeslotchecks" checked={form?.timeSlots && form?.timeSlots?.find(i => i.time == itm.time) ? true : false} onClick={e => setTimeSlot(itm, e.target.checked)} /></th>
                                                <td>{itm.time}</td>
                                                {form.daysToApply && form.daysToApply.map((item, index) => {
                                                    return <td scope="row"></td>
                                                })}
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

export default AddEditEarlyBirdPricing