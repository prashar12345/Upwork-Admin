import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import datepipeModel from '../../models/datepipemodel';
import methodModel from '../../methods/methods';

const Html = ({
    tab,
    edit,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    loaging,
    data,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Reseller Category
                </h3>
                <article className="d-flex filterFlex">
                    <Link className="btn btn-primary" to="/category/Reseller/add">
                        Add Category
                    </Link>
                    {/* <div className='icons_tab'>
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
                    </div> */}
                </article>
            </div>
            {tab == 'grid' ? <>
                <div className="cardList">
                    <div className='row'>
                        {!loaging && data && data.map((itm, i) => {
                            return <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4'>
                                <div className='new_cards'>
                                    <div className='user_card'>
                                        <div className='user_detail' onClick={e => edit(itm.id)}>
                                            <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.name}
                                                </h4>
                                                {/* <p className='user_info'>
                                                    {itm.email}
                                                </p> */}
                                            </div>
                                        </div>
                                        <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='user_proff'>
                                        <div className='id_name'>
                                            <ul className='user_list'>
                                                <li className='list_name'>
                                                    <a className='id'>
                                                        Date
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='detail_list'>
                                            <ul className='user_list'>
                                                <li className='list_names'>
                                                    <a className='id_name' onClick={e => edit(itm.id)}>
                                                        {datepipeModel.datetime(itm.createdAt)}
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
                                    <th scope="col" className='table_data'>Date</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                        <td className='table_dats' onClick={e => edit(itm.id)}> <div className='user_detail'>
                                            <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.name}
                                                </h4>
                                                {/* <p className='user_info'>
                                                    {itm.email}
                                                </p> */}
                                            </div>
                                        </div></td>
                                        <td className='table_dats pointer' onClick={e => edit(itm.id)}>{datepipeModel.datetime(itm.createdAt)}</td>
                                        <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status}
                                            </span>
                                        </div></td>
                                        {/* dropdown */}
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                                                    <i class="material-icons edit" title="Edit">edit</i>
                                                </a>
                                                <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                    <i class="material-icons delete"title='Delete'> delete</i>
                                                </span>
                                            </div>
                                            {/* <div className="dropdown">
                                                <button className="btn btn-secondary dropdown-toggle dotdrop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h" ></i>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" onClick={e => edit(itm.id)}>Edit</a>
                                                    <a className="dropdown-item" onClick={() => deleteItem(itm.id)}>Delete</a>
                                                </div>
                                            </div> */}
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
                    <span>Show {filters.count} from {total} Reseller Categories</span>
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
