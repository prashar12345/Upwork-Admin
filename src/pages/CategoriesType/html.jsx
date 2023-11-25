import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import environment from '../../environment';

const Html = ({
    tab,
    edit,
    view,
    tabChange,
    colClick,
    ChangeRole,
    openModal,
    statusChange,
    pageChange,
    addCol,
    deleteItem,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    tableCols,
    loaging,
    data,
    types,
    exportfun,
    changestatus,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Types
                </h3>
                <a id='downloadFile'></a>

                <article className="d-flex">
                    {isAllow('addTypes')?
                        <Link className="btn btn-primary mr-2" to="/types/add">
                            Add Type
                        </Link>
                    :<></>}
                    <button className="btn btn-primary mr-2" onClick={()=>exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => changestatus("")}>All Status</a> 
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => changestatus("active")} >Active</a>
                            <a className={filters.status == 'deactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => changestatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                    {/* <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Type: {filters.catType ? filters.catType : 'All'}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className={filters.catType == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All</a>
                            {types && types.map(itm => {
                                return <a className={filters.catType == itm.key ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole(itm.key)}>{itm.name}</a>
                            })}
                        </div>
                    </div> */}

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
                    {/* 
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuColumns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Columns
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuColumns">
                            {uTableCols().map(itm => {
                                return <a className="dropdown-item" onClick={() => addCol(itm)} key={itm.value}>{itm.value}</a>
                            })}
                        </div>
                    </div> */}

                    {/* <button onClick={exportCsv} className="btn btn-primary" type="button">
                        Export
                    </button> */}
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
                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                            </span>
                                        </div>
                                    </div>


                                    {/* <div className='user_proff'>
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
                                    </div> */}
                                </div>
                            </div>
                        })}

                    </div>

                </div>
            </> : <>

                <div className="table-responsive">

                    <div className='table_section'>

                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'>Name</th>
                                    {/* <th scope="col" className='table_data'>Date</th> */}
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                        <td className='table_dats' onClick={e => edit(itm.id)}>{itm.name}</td>
                                        {/* <td className='table_dats pointer' onClick={e => edit(itm.id)}>{datepipeModel.datetime(itm.createdAt)}</td> */}
                                        <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                            </span>
                                        </div></td>

                                        {/* dropdown */}
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                {isAllow('editTypes')?
                                                    <a className="edit_icon" onClick={e => edit(itm.id)}>
                                                        <i class="material-icons edit" title="Edit">edit</i>
                                                    </a>
                                                :<></>}
                                                {itm.id!=environment.planTypeId && itm.id!=environment.resellerTypeId && itm.id!=environment.productTypeId && isAllow('deleteTypes')?<span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                    <i class="material-icons delete" title='Delete'> delete</i>
                                                </span>:<></>}
                                            </div>
                                        </td>
                                        {/* end */}
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>


                </div>

            </>}


            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Types</span>
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
