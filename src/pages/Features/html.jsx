import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';
import SelectDropdown from '../../components/common/SelectDropdown';

const Html = ({
    tab,
    edit,
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
    filter,
    categories,
    tableCols,
    loaging,
    data,
    types,
    exportfun,
    dragStart,
    dragEnter,
    drop,
    dargEnterIndex,
    dargIndex,
    showData,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Plan Features
                </h3>
                <article className="d-flex">
                    {isAllow('addPlanFeatures')?
                        <Link className="btn btn-primary mr-2" to="/features/add">
                            Add Plan Feature
                        </Link>
                    :<></>}
                    <button className="btn btn-primary mr-2" onClick={() => exportfun()}>
                        Export
                    </button>
                    <div className="mr-2 phBottomSpace">
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Category'
                            intialValue={filters.category}
                            result={e => filter({ category: e.value })}
                            options={categories}
                        />
                    </div>

                    <div className="dropdown addDropdown features mr-2">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                </article>


            </div>


            {tab == 'grid' ? <>
            </> : <>

                <div className="table-responsive table_section">
                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Name</th>
                                <th scope="col" className='table_data'>Category</th>
                                <th scope="col" className='table_data'>Status</th>
                                <th scope="col" className='table_data'></th>

                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && showData().map((itm, index) => {
                                return <tr className={`data_row ${dargIndex==index?'dragStart':''} ${dargEnterIndex==index?'dragEnter':''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e => drop(e)} key={index} draggable>
                                    <td className='table_dats' onClick={e => edit(itm.id)}>{itm.name}</td>
                                    <td className='table_dats'>{itm.category ? itm.category.name : ''}</td>
                                    <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                        <span className='contract'>
                                            {itm.status == 'deactive' ? 'inactive' : 'active'}
                                        </span>
                                    </div></td>

                                    {/* dropdown */}
                                    <td className='table_dats'>
                                        <div className="action_icons">
                                            {isAllow('editPlanFeatures')?
                                                <a className="edit_icon" onClick={e => edit(itm.id)}>
                                                    <i class="material-icons edit" title="Edit">edit</i>
                                                </a>
                                            :<></>}
                                            {isAllow('deletePlanFeatures')?
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
