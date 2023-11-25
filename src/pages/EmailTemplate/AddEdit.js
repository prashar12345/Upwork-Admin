import React, { useState, useEffect, useRef } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { emailType } from "../../models/type.model";
import { Link, useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Editor } from "@tinymce/tinymce-react";

const AddEditEmailTemplate = () => {
    const defaultvalue = () => {
        let keys = { ...emailType }
        Object.keys(emailType).map(itm => {
            if (itm != 'permissions') keys[itm] = ''
        })
        keys.status = 'active'
        return keys
    }
    const { id } = useParams()
    const [form, setform] = useState(emailType)
    const [tab, setTab] = useState('form')
    const history = useHistory()
    const [submitted, setSubmitted] = useState(false)
    const user = useSelector((state) => state.user);
    const specialChars=useRef([])

    const formValidation = [
        { key: 'subject', required: true },
    ]

    const handleSubmit = (e) => {
        if(e) e.preventDefault()
        setSubmitted(true)
        let invalid = methodModel.getFormError(formValidation, form)
        if (invalid){
            setTab('form')
            return
        } 
        let method = 'post'
        let url = 'api/email'
        let value = {
            ...form,
            content: form.tiny_body
        }
        if (value.id) {
            method = 'put'
            url = `api/update/template?id=${value.id}`
        } else {
            delete value.id
        }
        loader(true)
        ApiClient.allApi(url, value, method).then(res => {
            if (res.success) {
                ToastsStore.success(res.message)
                history.push("/emailtemplate")
            }
            loader(false)
        })
    }

    const getConstants=()=>{
        ApiClient.get('api/constants').then(res=>{
            if(res.success){
                let data=res.data.map(itm=>{
                    return {
                        text: itm, value: itm
                    }
                })
                // console.log("data",data)
                specialChars.current=data
            }
        })
    }

    useEffect(() => {
        getConstants()
        if (id) {
            loader(true)
            ApiClient.get('api/template', { id }).then(res => {
                if (res.success) {
                    let value = res.data
                    let payload = emailType
                    Object.keys(payload).map(itm => {
                        payload[itm] = value[itm]
                    })
                    payload.tiny_body = value.content
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

    const onSelect = (e) => {
        console.log("onSelect", e)
    }

    const onRemove = (e) => {
        console.log("onRemove", e)
    }

    
    return <>
        <Layout>
            {tab=='form'?<>
            <form onSubmit={handleSubmit}>
                <div className="pprofile1">
                    <h3 className="ViewUser mb-3">{form && form.id ? 'Edit' : 'Add'} Email</h3>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label>Subject<span className="star">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.subject}
                                onChange={e => setform({ ...form, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-12 mb-3">
                            <label>Body<span className="star">*</span></label>
                            <Editor textareaName='content' initialValue={form.content ? form.content : ''} className='tuncketcls'
                                onEditorChange={(newValue, editor) => {
                                    setform({ ...form, tiny_body: newValue })
                                }}
                              
                                init={{
                                    selector: 'textarea#autocompleter-cardmenuitem',
                                    height: 250,
                                    setup: (editor) => {
                                      const onAction = (autocompleteApi, rng, value) => {
                                        editor.selection.setRng(rng);
                                        editor.insertContent(value);
                                        autocompleteApi.hide();
                                        console.log("specialChars",specialChars)
                                      };
                                      const getMatchedChars = (pattern) => {
                                        return specialChars.current.filter(char => char.text.indexOf(pattern) !== -1);
                                      };
                                     
                                      /**
                                       * An autocompleter that allows you to insert special characters.
                                       * Items are built using the CardMenuItem.
                                       */
                                      editor.ui.registry.addAutocompleter('specialchars_cardmenuitems', {
                                        trigger: '$',
                                        minChars: 0,
                                        columns: 1,
                                        highlightOn: ['char_name'],
                                        onAction: onAction,
                                        fetch: (pattern) => {
                                          return new Promise((resolve) => {
                                           
                                            const results = getMatchedChars(pattern).map(char => ({
                                              type: 'cardmenuitem',
                                              value: '${'+char.value+'}',
                                              label: char.text,
                                              items: [
                                                {
                                                  type: 'cardcontainer',
                                                  direction: 'vertical',
                                                  items: [
                                                    {
                                                      type: 'cardtext',
                                                      text: char.text,
                                                      name: 'char_name'
                                                    }
                                                  ]
                                                }
                                              ]
                                            }));
                                            resolve(results);
                                          });
                                        }
                                      });
                                    }
                                  }}
                                // init={{
                                //     selector: "#tinymce-textarea",
                                //     setup: function (ed) {
                                //         ed.on("keyup", function (data) {
                                //             if (data.key == '@') {
                                //                 ApiClient.get(`api/users/listing`).then(res => {
                                //                     if (res.success) {
                                //                         setuserlist(res.data)
                                //                         console.log(res.data, 'dsfsd');
                                //                     }
                                //                 })
                                //             }
                                //         });
                                //     },
                                // }}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right">
                        <Link type="button" className="btn btn-secondary discard mr-2" to="/emailtemplate">Back</Link>
                        <button type="button" className="btn btn-primary mr-2" onClick={e=>setTab('preview')}>Preview</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>

               
            </form>
            </>:<>
            <div className="pprofile1">
                    <h3 className="ViewUser mb-3">Preview</h3>
                    <div className="p-2 border" dangerouslySetInnerHTML={{ __html: form?.tiny_body }}></div>
                    <div className="text-right mt-3">
                        <button type="button" className="btn btn-secondary discard mr-2" onClick={e=>setTab('form')}>Back</button>
                        <button className="btn btn-primary" onClick={e=>handleSubmit()}>Save</button>
                    </div>
                </div>
            </>}
           
            <div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Body</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <span dangerouslySetInnerHTML={{ __html: form.tiny_body }}></span>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    </>
}

export default AddEditEmailTemplate