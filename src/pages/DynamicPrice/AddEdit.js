import React, { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import { holidaysType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import requiredModel from "../../models/required.model";
import daysModel from "../../models/days.modal";
import NowLaterModel from "../../models/nowlater.model";
import countModel from "../../models/count.model";
import dynamicPriceModel from "../../models/dynamicPrice.model";
import datepipeModel from "../../models/datepipemodel";
import formModel from "../../models/form.model";
import methodModel from "../../methods/methods";
import Select from "react-select";
import countryStateModel from "../../models/countryState.model";

const AddEditPrice = () => {
    const { id, type, copy } = useParams()
    const year = new Date().getFullYear()
    const defaultvalue = () => {
        let keys = { ...holidaysType }
        Object.keys(holidaysType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        keys.type = type
        return keys
    }

    const [form, setform] = useState(holidaysType)
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const [holidays, setHolidays] = useState([])
    const [nholidays, setNHolidays] = useState([])
    const [sholidays, setSHolidays] = useState([])
    const [selectedHoliday, setSelectedHolidy] = useState([])
    const user = useSelector((state) => state.user);
    const [filter, setFilter] = useState({ country: 'us', year: year,counties:'',type:'national' })
    const [country, setcountry] = useState([])
    const [states, setStates] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = formModel.getFormError('dynamicPricing')
        if (invalid) return
        let method = 'post'
        let url = 'api/dynamic/pricing'
        let value = {
            ...form,
            country: filter.country || 'us',
            counties:filter.counties,
            dates: selectedHoliday
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

    const getError = (key) => {
        return formModel.getError('dynamicPricing', key)
    }

    const getHolidays = (p = {}) => {
        let payload = { ...filter, ...p ,type:''}
        if(payload.country && payload.counties)
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setSHolidays(res.data)
                setHolidays(res.data)
            }
        })
    }

    const holidayType=(t)=>{
        setFilter({...filter,type:t})
        let value=sholidays
        if(t=='national') value=nholidays
        setHolidays([...value])
    }

    const getNHolidays = (p = {}) => {
        let payload = {country: filter.country, year: year, ...p,type:'' }
        if(payload.country)
        ApiClient.get("api/holidays/listing", payload).then(res => {
            if (res.success) {
                setNHolidays(res.data)
                setHolidays(res.data)
            }
        })
    }

    const getCountry = () => {
        ApiClient.get(`api/holidays/countries`).then(res => {
            if (res.success) {
                let data = Object.keys(res.data).map(item => {
                    return ({ ...country, value: item.toLowerCase(), label: res.data[item] })
                })
                data = data.sort((a, b) => {
                    return a.label - b.label
                })
                setcountry(data)
            }
        })
    }

    const getState = (ciso) => {
        let arr=countryStateModel.getStates(ciso).map(itm=>{
            return{
                value:itm.state_code.toLowerCase(),
                label:itm.name
            }
        })
        setStates([...arr])
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/dynamic/pricing/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = holidaysType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    if (payload.changesDate) payload.changesDate = new Date(payload.changesDate)
                    if (payload.changesDateTo) payload.changesDateTo = new Date(payload.changesDateTo)
                    if (id && copy == 'true') {
                        payload.name = `Copy of ${payload.name}`
                    }
                    if (payload.country) {
                        getHolidays({ country: payload.country,counties:payload.counties })
                        getNHolidays({country:payload.country})
                        getState(payload.country)
                    }
                    setform({
                        ...payload
                    })
                    setFilter({ ...filter, country: payload.country,counties:payload.counties })
                    setSelectedHolidy(value.dates || [])
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
            setSelectedHolidy([])
        }
        setSubmitted(false)
        setFilter({ ...filter,country:'' })
        getNHolidays()
    }, [id, type])

    useEffect(() => {
        getCountry()
        getState('us')
    }, [])

    const selectAll = (checked) => {
        if (checked) {
            setform({ ...form, applyFor: ['state', 'national'] });
            setSelectedHolidy([
                ...holidays
            ])
        } else {
            setform({ ...form, applyFor: [] });
            setSelectedHolidy([])
        }
    }

    const setchecks = (value, checked) => {
        let applyFor = form.applyFor || []
        if (checked == true) {
            applyFor.push(value)
        }
        else {
            applyFor = applyFor.filter(itm => itm != value)
        }

        if(applyFor.includes('national')){
            setSelectedHolidy([...nholidays])
        }else if(applyFor.includes('state')){
            setSelectedHolidy([...sholidays])
        }
        console.log("applyFor",applyFor)
        setform({ ...form, applyFor: applyFor })
    }

    const back = () => {
        history.goBack()
    }


    const holidayCheck = (item) => {
        let ext = selectedHoliday.find(itm => itm._id == item._id)
        let value = selectedHoliday
        if (ext) {
            value = value.filter(itm => itm._id != item._id)
        } else {
            value.push(item)
        }
        setSelectedHolidy([...value])
    }

    const holdayAllCheckValue = () => {
        let value = true
        holidays.map(itm => {
            let ext = selectedHoliday.find(sitm => sitm._id == itm._id)
            if (!ext) value = false
        })
        return value
    }

    const holdayAllCheck = () => {
        let checked = holdayAllCheckValue()
        if (!checked) {
            setSelectedHolidy([
                ...holidays
            ])
        } else {
            let arr = []
            setSelectedHolidy([...arr])
        }
    }

    const setCountrysearch = (e) => {
        let value = e || ''
        setFilter({ ...filter, country: value,counties:'',type:'national' })
        if (value) {
            getState(value)
            getNHolidays({ country: value })
        }
    }

    const seStatesearch = (e) => {
        let value = e || ''
        setFilter({ ...filter, counties: value,type:'state' })
        if (value) {
            getHolidays({ counties: value })
        }
    }

    const handlecountry=()=>{
        let ext=country&&country.find(item=>item.value==filter.country)
        return ext?ext:''
    }
    const handlestate=()=>{
        let ext=states&&states.find(item=>item.value==filter.counties)
        return ext?ext:''
    }

    return <>
        <Layout>
            {type ? <>
                <div className="pprofile1">
                    <div className="row">
                        <div className="col-md-8">
                            <h3 className="ViewUser mb-3">{id && copy == 'false' ? 'Edit' : 'Add'} {dynamicPriceModel.name(type)}</h3>
                            <form onSubmit={handleSubmit} name="dynamicPricing">
                                <div className="form-row">
                                    <div className="col-md-6 mb-3">
                                        <label>Rule Name<span className="star">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder={dynamicPriceModel.name(form.type)}
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
                                            name="country"
                                            onChange={e => setCountrysearch(e?e.value:'')}
                                        />
                                    </div>
                                    {filter.country?<>
                                        <div className="col-md-6 mb-3">
                                        <label>State<span className="star">*</span></label>
                                        <Select
                                            options={states}
                                            placeholder="Select State"
                                            isClearable={true}
                                            value={handlestate()}
                                            name="counties"
                                            onChange={e => seStatesearch(e?e.value:'')}
                                        />
                                    </div>
                                    </>:<></>}
                            
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
                                    <div className="col-md-6 mb-3">
                                        <label>Apply % or Amount<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="% or Amount"
                                            name="amountOrPercent"
                                            required={true}
                                            intialValue={form.amountOrPercent}
                                            result={e => { setform({ ...form, amountOrPercent: e.value }) }}
                                            options={countModel.list}
                                        />
                                        {submitted && !form?.amountOrPercent ? <div className="text-danger">Amount is Required</div> : <></>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Add Number(please add number only not $ or % sign)<span className="star">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder=""
                                            minLength={1}
                                            maxLength={10}
                                            value={form.number}
                                            onChange={e => setform({ ...form, number: methodModel.isNumber(e) })}
                                        />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Apply for {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                        <div class="form-check ml-1 chekss">
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="all" name="all" onChange={e => selectAll(e.target.checked)} checked={form.applyFor.includes('state') && form.applyFor.includes('national')} />
                                                <label class="form-check-label" for="all">
                                                    All
                                                </label>
                                            </div>
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="state" name="state" checked={form.applyFor.includes('state')} onChange={e => setchecks('state', e.target.checked)} />
                                                <label class="form-check-label" for="state">
                                                    State
                                                </label>
                                            </div>
                                            <div className="inside_check">
                                                <input class="form-check-input" type="checkbox" id="national" name="national" checked={form.applyFor.includes('national')} onChange={e => setchecks('national', e.target.checked)} />
                                                <label class="form-check-label" for="national">
                                                    National
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" name="applyFor" value={form?.applyFor} required />
                                    {submitted && !form?.applyFor?.length ? <div className="text-danger">Apply for is Required</div> : <></>}
                                    <div className="col-md-6 mb-3">
                                        <label>Apply pre and post days?<span className="star">*</span></label>
                                        <SelectDropdown
                                            id="statusDropdown"
                                            displayValue="name"
                                            placeholder="Select Yes/No"
                                            name="preOrPost"
                                            required={true}
                                            intialValue={form.preOrPost}
                                            result={e => { setform({ ...form, preOrPost: e.value }) }}
                                            options={requiredModel.list}
                                        />
                                        {submitted && !form?.preOrPost ? <div className="text-danger">Pre Or Post is Required</div> : <></>}
                                    </div>
                                    {form.preOrPost == 'yes' ?
                                        <>
                                            <div className="col-md-6 mb-3">
                                                <label>Apply to days preceding {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Select days"
                                                    name="preDays"
                                                    required={true}
                                                    intialValue={form.preDays}
                                                    result={e => { setform({ ...form, preDays: e.value }) }}
                                                    options={daysModel.list}
                                                />
                                                {submitted && !form?.preDays ? <div className="text-danger">Preceding days are Required</div> : <></>}
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label>Apply to days post {dynamicPriceModel.name(form.type)}<span className="star">*</span></label>
                                                <SelectDropdown
                                                    id="statusDropdown"
                                                    displayValue="name"
                                                    placeholder="Select days"
                                                    name="postDays"
                                                    intialValue={form.postDays}
                                                    result={e => { setform({ ...form, postDays: e.value }) }}
                                                    options={daysModel.list}
                                                />
                                                {submitted && !form?.postDays ? <div className="text-danger">Post days are Required</div> : <></>}
                                            </div>
                                        </>
                                        : null}
                                    <div className="col-md-6 mb-3">
                                        <label>Apply change Now or later?<span className="star">*</span></label>
                                        <div>
                                            <SelectDropdown
                                                id="statusDropdown"
                                                displayValue="name"
                                                placeholder="Select Now/Later"
                                                intialValue={form.changesApply}
                                                name="changesApply"
                                                required={true}
                                                result={e => { setform({ ...form, changesApply: e.value,changesDate:''}) }}
                                                options={NowLaterModel.list}
                                            />
                                            {submitted && !form?.changesApply ? <div className="text-danger">Apply change is Required</div> : <></>}
                                        </div>
                                    </div>
                                    {/* {form.changesApply=='now'?<></>:<>
                                    <div className="col-md-6 mb-3">
                                        <label>Select Date to apply this rule from<span className="star">*</span></label>
                                        <DatePicker
                                                    className="form-control"
                                                    selected={form.changesDate}
                                                    minDate={new Date()}
                                                    placeholderText="Start Date"
                                                    name="changesDate"
                                                    required
                                                    disabled={form.changesApply=='now'?true:false}
                                                    onChange={(date) => { setform({ ...form, changesDate: date, changesDateTo: '' }) }}
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                />
                                        {submitted && (!form?.changesDate || !form?.changesDateTo) ? <div className="text-danger">Date Range is Required</div> : <></>}
                                    </div>
                                    </>} */}
                                  
                                    <div className="text-right col-md-12">
                                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e => back()}>Back</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                            <ul class="nav nav-tabs">
                                    {/* <li class="nav-item">
                                        <a className={`nav-link ${filter.type==''?'active':''}`} onClick={e=>holidayType('')}>All</a>
                                    </li> */}
                                    <li class="nav-item">
                                        <a className={`nav-link ${filter.type=='state'?'active':''}`} onClick={e=>holidayType('state')}>State</a>
                                    </li>
                                    <li class="nav-item">
                                        <a className={`nav-link ${filter.type=='national'?'active':''}`} onClick={e=>holidayType('national')}>National</a>
                                    </li>
                                </ul>
                                <div className="p-3 overLapList">
                                    <h5>List of {dynamicPriceModel.name(type)}</h5>
                                    <p className="small mb-1">
                                        Choose Holidays
                                    </p>
                                    <div onClick={e => holdayAllCheck()} className={`holidays ${holdayAllCheckValue() ? 'active' : ''}`}>
                                        <input type="checkbox" checked={holdayAllCheckValue()} />
                                        All</div>
                                    {holidays.map(itm => {
                                        return <div onClick={e => holidayCheck(itm)} className={`holidays ${selectedHoliday.find(sitm => itm._id == sitm._id) ? 'active' : ''}`}>
                                            <input type="checkbox" checked={selectedHoliday.find(sitm => itm._id == sitm._id) ? true : false} />
                                            {itm.name} <span className="bold">({datepipeModel.date(itm.date)})</span></div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </> : <>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">Select Pricing Rule</h3>
                    <div className="text-center">
                        {dynamicPriceModel.list.map(itm => {
                            return <Link className="btn btn-secondary discard m-1" to={`/dynamicprice/${itm.id}/add`}>{itm.name}</Link>
                        })}
                    </div>
                </div>
            </>}
        </Layout>
    </>
}

export default AddEditPrice