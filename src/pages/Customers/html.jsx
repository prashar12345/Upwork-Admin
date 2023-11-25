import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';

const Html = ({
    tab,
    tabChange,
    ChangeStatus,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    loaging,
    data,
    exportfun,
    edit,
    view,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                Customer Data
                </h3>

                <article className="d-flex">
                    <div className="buttons_Section">
                        {/* <Link className="btn btn-primary mr-2" to={`/customer/add`}>
                            Add Customer
                        </Link> */}
                        <button onClick={exportfun} className="btn btn-primary mr-2">
                            Export
                        </button>
                        <div className="dropdown addDropdown">
                            <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                            </button>
                            <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                                <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                                <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                                <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                            </div>
                        </div>
                    </div>

                    <div className='icons_tab'>
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link ${tab == 'grid' ? 'active' : ''}`} id="employee-tab" onClick={e => tabChange('grid')}>
                                    <i className="fa fa-th"></i>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class={`nav-link staff ${tab == 'list' ? 'active' : ''}`} id="staff-tab" onClick={e => tabChange('list')}>
                                    <i className="fa fa-list"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>

            {tab == 'grid' ? <>
                <div className="cardList">
                    <div className='row'>
                        {!loaging && data && data.map((itm, i) => {
                            return <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4'>
                                <div className='new_cards'>
                                    <div className='user_card'>
                                        <div className='user_detail' onClick={e => view(itm.id)}>
                                            <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.fullName}
                                                </h4>
                                                <p className='user_info'>
                                                    {itm.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status}
                                            </span>
                                        </div>
                                    </div>

                                    <div className='user_proff user_proff1'>
                                        <div className='id_name'>
                                            <ul className='user_list'>
                                                <li className='list_name'>
                                                    <a className='id'>
                                                        Role
                                                    </a>
                                                </li>
                                                <li className='list_name'>
                                                    <a className='id'>
                                                        Phone number
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='detail_list'>
                                            <ul className='user_list'>
                                                <li className='list_names'>
                                                    <a className='id_name' onClick={e => view(itm.id)}>
                                                        {itm.role?.name}
                                                    </a>
                                                </li>
                                                <li className='list_names'>
                                                    <a className='id_name' onClick={e => view(itm.id)}>
                                                        <span className='call_icon'></span>
                                                        {itm.mobileNo ?
                                                            <>
                                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                                {itm.dialCode} {itm.mobileNo}
                                                            </>
                                                            :
                                                            ''
                                                        }
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </> : <>
                <div className="table-responsive table_section">
                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Name</th>
                                <th scope="col" className='table_data'>Country of Origin</th>
                                <th scope="col" className='table_data'>Number of Orders</th>
                                <th scope="col" className='table_data'>Total Pax</th>
                                <th scope="col" className='table_data'>Order Amount</th>
                                <th scope="col" className='table_data'>Last Travel Date</th>

                                {/* <th scope="col" className='table_data'>Last Login</th>
                                <th scope="col" className='table_data'>Account Status</th>
                                <th scope="col" className='table_data'>Date Created</th>
                                <th scope="col" className='table_data'>Last Modified</th> */}
                                <th scope="col" className='table_data'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>
                                    <td className='table_dats' onClick={e => view(itm.id)}>
                                        <div className='user_detail'>
                                            <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.fullName}
                                                </h4>
                                                <p className='user_info'>
                                                    {itm.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='table_dats'>--</td>
                                    <td className='table_dats'>--</td>
                                    <td className='table_dats'>--</td>
                                    <td className='table_dats'>--</td>
                                    <td className='table_dats'>--</td>
                                    {/* <td className='table_dats'>{datepipeModel.date(itm.lastLogin)}</td>
                                    <td className='table_dats'>   <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                        <span className='contract'>
                                            {itm.status == 'deactive' ? 'inactive' : 'active'}
                                        </span>
                                    </div></td>
                                    <td className='table_dats'>{datepipeModel.date(itm.createdAt)}</td>
                                    <td className='table_dats'>{datepipeModel.date(itm.updatedAt)}</td> */}

                                    {/* dropdown */}
                                    <td className='table_dats'>
                                        <div className="action_icons">
                                            <a className='edit_icon' title="View" onClick={e => view(itm.id)}>
                                                <i class="material-icons edit">visibility</i>
                                            </a>
                                            {/* <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                <i class="material-icons delete" title='Delete'> delete</i>
                                            </span> */}
                                        </div>
                                    </td>
                                    {/* end */}
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </>}

            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Customers</span>
                    <Pagination
                        currentPage={filters.page}
                        totalSize={total}
                        sizePerPage={filters.count}
                        changeCurrentPage={pageChange}
                    />
                </div> : <></>
            }

            {loaging ? <div className="text-center py-4">
                <img src="/assets/img/loader.gif" className="pageLoader" />
            </div> : <></>}
        </Layout>
    );
};

export default Html;
