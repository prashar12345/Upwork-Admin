import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';

const Html = ({
    edit,
    search,
    reset,
    statusChange,
    ChangeStatus,
    pageChange,
    deleteItem,
    filters,
    loaging,
    data,
    checkedItems,
    handlecheckbox,
    exportfun,
    isAllow,
    total = { total }
}) => {
    
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Currency
                </h3>

                <article className="d-flex">
                    {isAllow('addCurrency')?
                        <Link className="btn btn-primary mr-2" to="/currency/add">
                            Add Currency
                        </Link>
                    :<></>}
                    <button className="btn btn-primary exports mr-2 " onClick={()=>exportfun()}>
                        Export  
                    </button>
                    <div className="dropdown addDropdown  chnages_status mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                             <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                             <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                    {/* <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.country ? methodModel.find(allcountry,filters.country,'id')?.name : 'All Country'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.country == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => Country('')}>All Country</a>
                            {allcountry && allcountry.map(itm => {
                                return <a className={filters.country == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => Country(itm.id)}>{itm.name}</a>
                            })}
                        </div>
                    </div> */}
                    {filters.country || search ?
                        <a className="btn btn-primary mr-2" onClick={e => reset()}>
                            Reset
                        </a>
                        : <></>}
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
                <div className="table-responsive table_section">
                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'>Name</th>
                                    <th scope="col" className='table_data'>Country</th>
                                    <th scope="col" className='table_data'>Symbol</th>
                                    <th scope="col" className='table_data'>ISO</th>
                                    <th scope="col" className='table_data'>Apply Currency for Plans</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>

                                        <td className='table_dats' >
                                            <div className='user_detail'>
                                                {/* <img src={methodModel.userImg(itm.image)} className="user_imgs" /> */}
                                                <div className=''><h4 className='user' onClick={e => edit(itm.id)}>{itm.currency}</h4></div>
                                            </div>
                                        </td>
                                        <td className='table_dats pointer'>{itm.country?itm.country.name:''}</td>
                                        <td className='table_dats pointer'>{itm.symbol}</td>
                                        <td className='table_dats pointer'>{itm.isoCode}</td>
                                        <td className='table_dats pointer'>
                                        <input
                                            type="checkbox"
                                            className="ml-1"
                                            name="course"
                                            value={itm.currency}
                                            onClick={e=>handlecheckbox(itm.id)}
                                            checked={checkedItems.includes(itm.id)}
                                            />
                                        </td>
                                        <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                            </span>
                                        </div></td>

                                        {/* dropdown */}
                                        <td className='table_dats'>
                                            <div className="dropdown">
                                                <div className="action_icons">
                                                    {isAllow('editCurrency')?
                                                        <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                                                            <i class="material-icons edit" title="Edit">edit</i>
                                                        </a>
                                                    :<></>}
                                                    {isAllow('deleteCurrency')?
                                                        <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                            <i class="material-icons delete" title='Delete'> delete</i>
                                                        </span>
                                                    :<></>}
                                                </div>
                                                {/* <button className="btn btn-secondary dropdown-toggle dotdrop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fa fa-ellipsis-h" ></i>
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                    <a className="dropdown-item" onClick={e => edit(itm.id)}>Edit</a>
                                                    <a className="dropdown-item" onClick={() => deleteItem(itm.id)}>Delete</a>
                                                </div> */}
                                            </div>
                                        </td>
                                        {/* end */}
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                </div>
            {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}
            {
                !loaging && total > filters.count ? <div className='paginationWrapper'>
                    <span>Show {filters.count} from {total} Countries</span>
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
