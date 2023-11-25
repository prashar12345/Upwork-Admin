import React, { useState, useEffect, useRef } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { planType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import statusModel from "../../models/status.model";
import SelectDropdown from "../../components/common/SelectDropdown";
import requiredModel from "../../models/required.model";

const AddEditPlan = () => {
    const [features, setFeatures] = useState([])
    const [currencys, setCurrencys] = useState([])
    const [oneMonth, setoneMonth] = useState()
    const [threeMonth, setthreeMonth] = useState()
    const [sixMonth, setsixMonth] = useState()
    const [year, setyear] = useState()
    const [extraProductPrice, setextraProductPrice] = useState()

    const defaultvalue = () => {
        let keys = { ...planType }
        Object.keys(planType).map(itm => {
            keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id,copy } = useParams()
    const [form, setform] = useState(planType);
    const [checkedItems, setCheckedItems] = useState([]);
    const [startIndex, setStartIndex] = useState(-1);
    const [enterIndex, setEnterIndex] = useState(-1);
    const [selectedItem, setSelectedItem] = useState('');
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const dragItem = useRef();
    const dragItems = useRef();
    const dragOverItem = useRef();
    const formValidation = [
        // { key: 'feature', required: true },
        { key: 'status', required: true },
        { key: 'recommended', required: true },
    ]

    const selectfeatures = (value, key, index) => {
        if (checkedItems.includes(value)) {
            const updatedCheckedItems = checkedItems.filter(item => item !== value);
            setCheckedItems(updatedCheckedItems);
        }
        else {
            setCheckedItems([...checkedItems, value]);
        }

        let checked = features[key][index].checked
        features[key][index].checked = checked ? false : true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid) return
        let method = 'post'
        let url = 'api/plan'
        let value = {
            ...form,
            feature: features,
            monthlyPrice: oneMonth,
            threeMonthPrice: threeMonth,
            sixMonthPrice: sixMonth,
            yearlyPrice: year,
            extraProductPrice: extraProductPrice
        }

        if (value.id && copy == 'false') {
            method = 'put'
            url = 'api/plan/update'
        } else {
            delete value.id
        }

        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/plans")
            }
            loader(false)
        })
    }

    const getFeatures = (feature = {}) => {
        let f = feature
        ApiClient.get('api/grouped/features', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                let data = res.data

                const checked = (id) => {
                    let value = { checked: false, index: 1000 }
                    if (f) {
                        Object.keys(f).map(oitm => {
                            f[oitm].map((itm, i) => {
                                if (itm.id == id) {
                                    value = { checked: itm.checked || false, index: i }
                                }
                            })
                        })
                    }

                    return value
                }
                Object.keys(data).map(oitm => {
                    data[oitm].map((itm, i) => {
                        let ext = checked(itm.id)
                        data[oitm][i].checked = ext.checked
                        data[oitm][i].index = ext.index
                    })
                })
                Object.keys(data).map(oitm => {
                    data[oitm].sort(function (a, b) { return a.index - b.index })
                })
                setFeatures(data)
            }
        })
    }

    const getCurrency = () => {
        ApiClient.get('api/currency/applied', { page: 1, count: 100, status: 'active' }).then(res => {
            if (res.success) {
                setCurrencys(res.data)
            }
        })
    }

    useEffect(() => {
        if (id) {
            loader(true)
            ApiClient.get('api/plan/detail', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = planType

                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })

                    payload.monthlyPrice = value.monthlyPrice
                    payload.threeMonth = value.threeMonthPrice
                    payload.sixMonth = value.sixMonthPrice
                    payload.yearlyPrice = value.yearlyPrice
                    payload.extraPrice = value.extraProductPrice
                    if (payload.category) {
                        payload.category = value.category.id
                    }
                    payload.id = value._id
                    if(copy == 'true'){
                        payload.name = `Copy of ${value.name}`
                    }
                    console.log(payload, "Payload");
                    getFeatures(value.feature)
                    setform({
                        ...payload
                    })
                }
                loader(false)
            })
        } else {
            setform(defaultvalue())
        }
        if (!id) {
            getFeatures()
        }

        getCurrency()
    }, [id])

    const dragStart = (e, position,key='') => {
        dragItem.current = position;
        setStartIndex(position)
        setSelectedItem(key)
    };

    const dragEnter = (e, position,key='') => {
        dragOverItem.current = position;
        setEnterIndex(position)
        const copyListItems = [...features[key]];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItems.current={...dragItems.current,[key]:copyListItems}
    };

    const drop = (e, key = '') => {
        setStartIndex(-1)
        setEnterIndex(-1)
        setSelectedItem('')
        const copyListItems = [...features[key]];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        dragItems.current={...dragItems.current,[key]:copyListItems}
        setFeatures({ ...features, [key]: copyListItems });
    };

    const requiredCheck = (key) => {
        let value = false
        currencys.map(itm => {
            if (form?.[key]?.[itm.isoCode]) value = true
        })
        return value
    }

    const showData=(key)=>{
        let value=features[key]
        if(dragItems && dragItems.current?.[key]){
            value=dragItems.current?.[key]
        }
        return value
    }

    return <>
        <Layout>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id && copy == 'false' ? 'Edit' : 'Add'} Plan</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label>Name<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.name}
                                onChange={e => setform({ ...form, name: e.target.value })}
                                required
                            />
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Price<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.price}
                                maxLength="10"
                                disabled={id ? true : false}
                                onChange={e => setform({ ...form, price: methodModel.isNumber(e) })}
                                required
                            />
                        </div> */}
                        <div className="col-md-6 mb-3">
                            <label>Status<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Status"
                                intialValue={form.status}
                                result={e => { setform({ ...form, status: e.value }) }}
                                options={statusModel.list}
                            />
                            {submitted && !form.status ? <div className="text-danger">Status is Required</div> : <></>}
                        </div>
                        {/* <div className="col-md-6 mb-3">
                            <label>Plan Type<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Plan Type"
                                intialValue={form.interval}
                                result={e => { setform({ ...form, interval: e.value }) }}
                                options={planTypeModel.list}
                            />
                            {submitted && !form.interval ? <div className="text-danger">Plan Type is Required</div> : <></>}
                        </div> */}
                        <div className="col-md-6 mb-3">
                            <label>Recommended<span className="star">*</span></label>
                            <SelectDropdown
                                isSingle={true}
                                id="statusDropdown"
                                displayValue="name"
                                placeholder="Select Recommendation"
                                intialValue={form.recommended}
                                result={e => { setform({ ...form, recommended: e.value }) }}
                                options={requiredModel.list}
                            />
                            {submitted && !form.recommended ? <div className="text-danger">Recommended is Required</div> : <></>}
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 1 Month<span className="star">*</span></h5>
                            <div className="row">
                                {currencys && currencys.map((item, index) => {
                                    return (
                                        <div className="col-md-3 pl-3 mb-3">
                                            <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                            <input className="form-control" disabled={id && copy == 'false' ? true : false} name={item.isoCode} value={form.monthlyPrice ? form.monthlyPrice[item.isoCode] : ''} required={requiredCheck('monthlyPrice')} maxLength="10" onChange={e => { setoneMonth({ ...oneMonth, [e.target.name]: methodModel.isNumber(e) }); setform({ ...form, monthlyPrice: { ...form.monthlyPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 3 Months<span className="star">*</span></h5>
                            <div className="row">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-md-3 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="form-control" disabled={id && copy == 'false' ? true : false} name={item.isoCode} value={form.threeMonth ? form.threeMonth[item.isoCode] : ''} required={requiredCheck('threeMonth')} maxLength="10" onChange={e => { setthreeMonth({ ...threeMonth, [e.target.name]: methodModel.isNumber(e) }); setform({ ...form, threeMonth: { ...form.threeMonth, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 6 Months<span className="star">*</span></h5>
                            <div className="row">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-md-3 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="form-control" disabled={id && copy == 'false' ? true : false} name={item.isoCode} value={form.sixMonth ? form.sixMonth[item.isoCode] : ''} required={requiredCheck('sixMonth')} maxLength="10" onChange={e => { setsixMonth({ ...sixMonth, [e.target.name]: methodModel.isNumber(e) }); setform({ ...form, sixMonth: { ...form.sixMonth, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <h5 className="monthTerm">Term: 12 Months<span className="star">*</span></h5>
                            <div className="row">
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-md-3 pl-3 mb-3">
                                        <label>Price <span className="text-uppercase">[{item.isoCode}]</span><span className="star">*</span></label>
                                        <input className="form-control" disabled={id && copy == 'false' ? true : false} name={item.isoCode} value={form.yearlyPrice ? form.yearlyPrice[item.isoCode] : ''} required={requiredCheck('yearlyPrice')} maxLength="10" onChange={e => { setyear({ ...year, [e.target.name]: methodModel.isNumber(e) }); setform({ ...form, yearlyPrice: { ...form.yearlyPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <div className="row">
                                <div className="col-md-12 mb-3 pl-3">
                                    <label>Number Of Products Allowed</label>
                                    <input className="form-control" value={form.allowedProducts} onChange={e => setform({ ...form, allowedProducts: e.target.value })} placeholder="Number Of Products Allowed"></input>
                                </div>
                                {currencys && currencys.map((item, index) => (
                                    <div className="col-md-3 pl-3 mb-3">
                                        <label>Extra Product Price [{item.isoCode.toUpperCase()}]<span className="star">*</span></label>
                                        <input className="form-control" disabled={id && copy == 'false' ? true : false} name={item.isoCode} value={form.extraPrice ? form.extraPrice[item.isoCode] : ''} maxLength="10" onChange={e => { setextraProductPrice({ ...extraProductPrice, [e.target.name]: methodModel.isNumber(e) }); setform({ ...form, extraPrice: { ...form.extraPrice, [e.target.name]: methodModel.isNumber(e) } }) }} placeholder={`Extra Product Price ${item.isoCode.toUpperCase()}`}></input>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <hr className="borderHr" />
                            <h5>Features </h5>
                            {/* <Multiselect
                                options={features}
                                selectedValues={form.feature}
                                onSelect={e => setform({...form,feature:e})}
                                onRemove={e => setform({...form,feature:e})}
                                displayValue="name"
                                id="featuresDropdown"
                            /> */}
                            {Object.keys(features).map((oitm,i) => {
                                return <div className="mb-3">
                                    <label className="mb-2 d-block text-uppercase"><b>{oitm}</b></label>
                                    {features && showData(oitm)?.map((item, index) => {
                                        return <>
                                            <div className={`col-md-11 mt-2 ml-2 cursor-pointer DragDrop ${startIndex==index&&selectedItem==oitm?'dragStart':''} ${enterIndex==index&&selectedItem==oitm?'dragEnter':''}`} onDragStart={(e) => dragStart(e, index, oitm)} onDragEnter={(e) => dragEnter(e, index, oitm)} onDragEnd={e => drop(e, oitm)} key={index} draggable={id && copy == 'false'?false:true}>
                                                <label class="form-check-label pointer">
                                                    <input class="form-check-input" type="checkbox" value={form.feature} onChange={e => selectfeatures(item.id, oitm, index)} checked={item.checked ? true : false} />
                                                    {item.name}
                                                </label>
                                            </div>
                                        </>
                                    })}
                                </div>
                            })}
                        </div>
                    </div>
                    <div className="text-right">
                        <Link to="/plans" className="btn btn-secondary discard mr-2">Back</Link>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Layout>
    </>
}

export default AddEditPlan