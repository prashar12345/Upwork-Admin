import React, { useEffect, useState } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import permissionModel from "../../models/permisstion.model";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown"

const AddEditRole = ({ form, modalClosed }) => {
    const [rolForm,setform]=useState({ role: '', permission: permissionModel.permissions })
    const handleSubmit = (e) => {
        e.preventDefault()
        let method = 'post'
        if (rolForm.id) {
            method = 'put'
        } else {
            delete rolForm.id
        }

        loader(true)
        ApiClient.allApi('permission', rolForm, method).then(res => {
            if (res.success) {
                ToastsStore.success('Permission Updated')
                document.getElementById('closeRoleModal').click()
                modalClosed()
            }
            loader(false)
        })
    }


    const setpermission=(key,value)=>{
        setform({
            ...rolForm,
            permission:{
                ...rolForm.permission,
                [key]:value
            }
        })
    }

    const multiResult=(e)=>{
    console.log("multiResult",e);
    }

    useEffect(()=>{
        if(form){
            setform({
                role:form.role,
                permission:form.permission,
                id:form.id
            })
        }
    },[form])
    return <>
        <a id="openRoleModal" data-toggle="modal" data-target="#roleModal"></a>
        <div className="modal fade" id="roleModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{rolForm.id ? 'Edit' : 'Add'} Permissions</h5>
                        <button type="button" id="closeRoleModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-row roleForm">
                                <div className="col-md-12 mb-3">
                                    <label>Role Name</label>
                                    <input type="text" className="form-control" disabled={rolForm.id ? true : false} value={rolForm.role} onChange={e => setform({ ...rolForm, role: e.target.value })} required />

                                    <MultiSelectDropdown result={multiResult}></MultiSelectDropdown>
                                </div>
                                <div className="col-md-12">
                                    <label>Permissions</label>

                                    <article>
                                        <table className="table permisstionTable mb-0">
                                            <tbody>
                                                <tr >
                                                    <td>Product Management</td>
                                                    <td>
                                                        <div className="checkList">
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.prodMgmtRead} onChange={e=>setpermission('prodMgmtRead',e.target.checked)} /> Read
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.prodMgmtAdd} onChange={e=>setpermission('prodMgmtAdd',e.target.checked)} /> Add
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.prodMgmtEdit} onChange={e=>setpermission('prodMgmtEdit',e.target.checked)} /> Edit
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.prodMgmtDelete} onChange={e=>setpermission('prodMgmtDelete',e.target.checked)} /> Delete
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>User Management</td>
                                                    <td>
                                                        <div className="checkList">
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.userMgmtRead} onChange={e=>setpermission('userMgmtRead',e.target.checked)} /> Read
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.userMgmtAdd} onChange={e=>setpermission('userMgmtAdd',e.target.checked)} /> Add
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.userMgmtEdit} onChange={e=>setpermission('userMgmtEdit',e.target.checked)} /> Edit
                                                            </label>
                                                            <label>
                                                                <input type="checkbox" checked={rolForm.permission.userMgmtDelete} onChange={e=>setpermission('userMgmtDelete',e.target.checked)} /> Delete
                                                            </label>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </article>

                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary discard mr-2"  data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default AddEditRole