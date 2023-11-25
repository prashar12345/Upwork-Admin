import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const ViewContant = ({ form }) => {
    const user = useSelector(state => state.user)


    useEffect(() => {
        if (user && user.loggedIn) {
        }
    }, [])
    return <>
        <a id="openViewContantModal" data-toggle="modal" data-target="#viewContantModal"></a>
        <div className="modal fade" id="viewContantModal" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">View Content</h5>
                        <button type="button" id="closeviewContantModal" className="close" data-dismiss="modal" aria-label="Close" title="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="form-row roleForm">
                            <div className="col-md-6 mb-3">
                                <label>Title</label>
                                <p className="mb-0">{form && form.title}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Meta Title</label>
                                <p className="mb-0">{form && form.meta_title}</p>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Description</label>
                                <p className="mb-0" dangerouslySetInnerHTML={{ __html: form && form.description }}></p>
                            </div>

                          
                            <div className="col-md-6 mb-3">
                                <label>Meta Keyword</label>
                                <p className="mb-0">{form && form.meta_key}</p>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Meta Description</label>
                                <p className="mb-0" >{form && form.meta_description}</p>
                            </div>

                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div> */}

                </div>
            </div>
        </div>
    </>
}

export default ViewContant