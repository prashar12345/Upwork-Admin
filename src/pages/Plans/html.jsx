import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import SelectDropdown from '../../components/common/SelectDropdown';
import planTypeModel from '../../models/planType.model';

const Html = ({
    tab,
    edit,
    reset,
    filter,
    currencys,
    view,
    tabChange,
    colClick,
    ChangeRole,
    ChangeStatus,
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
    total,
    dragStart,
    dragEnter,
    drop,
    dargIndex,
    dargEnterIndex,
    isAllow,
    showData
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Plans
                </h3>
                <article className="d-flex filterFlex phSpace">
                    {isAllow('addPlan')?
                        <Link className="btn btn-primary" to="/plans/add">
                            Add Plan
                        </Link>
                    :<></>}
                    <button className="btn btn-primary mr-2 export" onClick={e=>exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>  
                    {/* <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="name"
                        placeholder="All Plan Type"
                        intialValue={filters.interval}
                        result={e => { filter({ interval: e.value }) }}
                        options={planTypeModel.list}
                    /> */}
                    {/* <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="currency"
                        placeholder="All Currency"
                        intialValue={filters.currencyId}
                        result={e => { filter({ currencyId: e.value }) }}
                        options={currencys}
                    /> */}
                    {filters.interval || filters.currencyId?<>
                        <button className="btn btn-primary" onClick={reset}>
                        Reset
                    </button>
                    </>:<></>}
                </article>
            </div>
            {tab == 'grid' ? <>
            </> : <>
                <div className="table-responsive table_section">
                        <table class="table table-striped">
                            <thead className='table_head'>
                                <tr className='heading_row'>
                                    <th scope="col" className='table_data'>Name</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'></th>
                                </tr>
                            </thead>
                            <tbody className='planDrag'>
                                {!loaging && data && showData().map((itm, index) => {
                                    return <tr className={`data_row ${dargIndex==index?'dragStart':''} ${dargEnterIndex==index?'dragEnter':''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e=>drop(e)} key={index} draggable>
                                        <td className='table_dats' onClick={e => edit(itm.id,'false')}>{itm.name}</td>
                                        <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                            {itm.status=='deactive'?'inactive':'active'}
                                            </span>
                                        </div></td>

                                        {/* dropdown */}
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                {isAllow('editPlan')?
                                                    <a className="edit_icon" onClick={e => edit(itm.id,'false')}>
                                                        <i class="material-icons edit" title="Edit">edit</i>
                                                    </a>
                                                :<></>}
                                                {isAllow('deletePlan')?
                                                    <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                        <i class="material-icons delete" title='Delete'> delete</i>
                                                    </span>
                                                :<></>}
                                                <a className="edit_icon ml-2" onClick={e => edit(itm.id,'true')}>
                                                    <i class="fa fa-copy" title="Copy"></i>
                                                </a>
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
                    <span>Show {filters.count} from {total} Categories</span>
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
