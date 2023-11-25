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
    tabChange,
    colClick,
    openModal, 
    pageChange,
    ChangeStatus,
    addCol,
    deleteItem,
    statusChange,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    tableCols,
    loaging,
    data,
    types,
    isAllow,
    exportfun,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Continents
                </h3>
                <article className="d-flex">
                    {isAllow('addContinents')?
                        <Link className="btn btn-primary mr-2" to="/continents/add">
                            Add Continent
                        </Link>
                    :<></>}
                    <button className="btn btn-primary mr-2" onClick={()=>exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                             <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                             <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
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
                            return <div className='col-md-4'>
                                <div className='new_cards'>
                                    <div className='user_card'>
                                        <div className='user_detail' onClick={e => view(itm.id)}>
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
                                                    <a className='id_name' onClick={e => view(itm.id)}>
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
                                    <th scope="col" className='table_data'>Continent Name</th>
                                    <th scope="col" className='table_data'>Status</th> 
                                    <th scope="col" className='table_data'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                        <td className='table_dats'>
                                            <div className='user_detail'>
                                                <div className='user_name'>
                                                    <h4 className='user' onClick={e => edit(itm.id)}>
                                                        {itm.name}
                                                    </h4> 
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                                <span className='contract table_dats'>
                                                    {itm.status == 'deactive' ? 'inactive' : 'active'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                {isAllow('editContinents')?
                                                    <a className="edit_icon" onClick={e => edit(itm.id)}>
                                                        <i class="material-icons edit" title="Edit">edit</i>
                                                    </a>
                                                :<></>}
                                                {isAllow('deleteContinents')?
                                                    <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                        <i class="material-icons delete" title='Delete'> delete</i>
                                                    </span>
                                                :<></>}
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
                    <span>Show {filters.count} from {total} Continents</span>
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
