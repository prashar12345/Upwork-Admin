import React, { useState } from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import methodModel from '../../methods/methods';
import datepipeModel from '../../models/datepipemodel';

const Html = ({
    type,
    add,
    edit,
    ChangeRole,
    statusChange,
    pageChange,
    deleteItem,
    exportfun,
    filters,
    loaging,
    data,
    statuschange,
    reset,
    cattype,
    total,
    dragStart,
    dragEnter,
    drop,
    dargEnterIndex,
    dargIndex,
    isAllow,
    showData,
}) => {
    const [status, setstatus] = useState("")

    const TableRow = ({ itm, className, index, parentCategory }) => {
        return <tr className={`data_row ${className || ''} ${dargIndex == index ? 'dragStart' : ''} ${dargEnterIndex == index ? 'dragEnter' : ''}`} onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={e => drop(e)} key={index} draggable={parentCategory ? false : true}>
            <td className='table_dats' onClick={e => edit(itm.id)}> <div className='user_detail'>
                <img src={methodModel.userImg(itm.banner)} className="user_imgs" />
            </div></td>
            <td className='table_dats'>{itm.name || '--'}</td>
            <td className='table_dats'>{parentCategory?.name || '--'}</td>
            <td className='table_dats'>{itm.catTypeName}</td>
            <td className='table_dats'>{datepipeModel.date(itm.createdAt)}</td>
            <td className='table_dats'>{datepipeModel.date(itm.updatedAt)}</td>
            <td className='table_dats'>{itm?.updatedBy?.fullName || '--'}</td>
            <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                <span className='contract'>
                    {itm.status == 'deactive' ? 'inactive' : 'active'}
                </span>
            </div></td>
            <td className='table_dats'>
                <div className="action_icons">
                    {isAllow(type?'editResellerCategory':'editCategory')?
                        <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                            <i class="material-icons edit" title="Edit">edit</i>
                        </a>
                    :<></>}
                    {isAllow(type?'deleteResellerCategory':'deleteCategory')?
                        <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                            <i class="material-icons delete" title='Delete'> delete</i>
                        </span>
                    :<></>}
                </div>
            </td>
        </tr>
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    {type ? 'Reseller' : ''} Categories
                </h3>

                <article className="d-flex filterFlex phSpace">
                    {isAllow(type?'addResellerCategory':'addCategory')?
                        <a className="btn btn-primary" onClick={e => add()}>
                            Add {type ? 'Reseller' : ''} Category
                        </a>
                    :<></>}
                    <button className="btn btn-primary mr-2 export" onClick={() => exportfun()}>
                        Export
                    </button>
                    {!type ? <div className="dropdown addDropdown">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.catType ? methodModel.find(cattype, filters.catType, 'id')?.name : 'All Type'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.catType == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All Type</a>
                            {cattype && cattype.map(itm => {
                                return <a className={filters.catType == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole(itm.id)}>{itm.name}</a>
                            })}
                        </div>
                    </div> : <></>}

                    <div className="dropdown addDropdown chnagesname">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Status {status == "" ? "All" : status}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" onClick={() => { statuschange(""); setstatus("All") }} >All Status</a>
                            <a class="dropdown-item" onClick={() => { statuschange("active"); setstatus("Active") }} >Active</a>
                            <a class="dropdown-item" onClick={() => { statuschange("deactive"); setstatus("Inactive") }} >Inactive</a>
                        </div>
                    </div>

                    {filters.search || filters.parentCategory || (filters.catType && !type) ? <>
                        <a className="btn btn-primary mr-2" onClick={e => reset()}>
                            Reset
                        </a>
                    </> : <></>}
                </article>
            </div>


            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Image</th>
                            <th scope="col" className='table_data'>Category Name</th>
                            <th scope="col" className='table_data'>Parent Category</th>
                            <th scope="col" className='table_data'>Category Type</th>
                            <th scope="col" className='table_data'>Date Created</th>
                            <th scope="col" className='table_data'>Last Modified</th>
                            <th scope="col" className='table_data'>Last Modified by</th>
                            <th scope="col" className='table_data'>Status</th>
                            <th scope="col" className='table_data'>Actions</th>
                        </tr>
                    </thead>
                    <tbody id='tableBodycat'>
                        {!loaging && data && showData().map((itm, i) => {
                            return <>
                                <TableRow itm={itm} index={i} />
                                {itm?.childCategories && itm?.childCategories.map(citm => {
                                    return <>
                                        <TableRow itm={{ ...citm, id: citm._id }} index={i} className="subCategory" parentCategory={itm} />
                                        {citm.childCategories && citm.childCategories.map(sitm => {
                                            return <TableRow itm={{ ...sitm, id: citm._id }} index={i} className="subSubCategory" parentCategory={citm} />
                                        })}
                                    </>
                                })}
                            </>
                        })
                        }
                    </tbody>
                </table>
            </div>
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
