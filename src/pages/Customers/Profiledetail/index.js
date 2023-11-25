import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import rolesModel from '../../../models/roles.model';

const UserDetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`profile`, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            loader(false)
        })
    };

    const back = () => {
        history.goBack()
    }

    useEffect(() => {
        getDetail(userId ? userId : id)
    }, [id, userId])

    return (
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/users" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                    <h3 className="Profilehedding mt-3">Customer Details</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.fullName}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Email</label>
                            <div className='profiledetailscls'>{data && data.email || '--'}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Mobile No</label>
                            <div className='profiledetailscls'>{data?.dialCode ? <>({data && data.dialCode}) {data && data.mobileNo}</> : <>--</>}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Country of Origin</label>
                            <div className='profiledetailscls'>--</div>
                        </div>
                    </div>

                    <h3 className="Profilehedding mt-3">Name of all pax on tour</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Pax Name</th>
                                <th scope="col">Age</th>
                                <th scope="col">Passport Number</th>
                                <th scope="col">Dietary Requirements</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="Profilehedding mt-3">Products Details</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name of Product</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Order ID</th>
                                <th scope="col">Reseller reference</th>
                                <th scope="col">Number of pax</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Discount Code</th>
                                <th scope="col">Net Amount</th>
                                <th scope="col">Ancillary Revenue (Photos)</th>
                                <th scope="col">Ancillary Revenue ($)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="Profilehedding mt-3">Booking Details</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Order Date</th>
                                <th scope="col">Booking Time & Date</th>
                                <th scope="col">Lead Times (Days)</th>
                                <th scope="col">Booked from where?</th>
                                <th scope="col">Pickup Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                            <tr>
                                <th scope="row">--</th>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                                <td>--</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="Profilehedding mt-3">Payment Details</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Payment Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">--</th>
                            </tr>
                            <tr>
                                <th scope="row">--</th>
                            </tr>
                        </tbody>
                    </table>

                    <h3 className="Profilehedding mt-3">Reseller Infromation</h3>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name of Reseller</th>
                                <th scope="col">Reseller Commission</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">--</th>
                                <th scope="row">--</th>
                            </tr>
                            <tr>
                                <th scope="row">--</th>
                                <th scope="row">--</th>
                            </tr>
                        </tbody>
                    </table>
                    {/* <h3 className="Profilehedding mt-3 ">Company Information</h3>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Address</label>
                            <div className='profiledetailscls'>{data && data?.companyAddress || '--'}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Contact Name</label>
                            <div className='profiledetailscls'>{data && data.contactName || '--'}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Time Zone</label>
                            <div className='profiledetailscls'>{data && data.companytimezone || '--'}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Website</label>
                            <div className='profiledetailscls'>{data && data.website || '--'}</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </Layout >

    );
};

export default UserDetail;
