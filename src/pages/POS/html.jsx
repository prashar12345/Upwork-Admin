import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';

const Html = ({
    edit,
    view,
    viewOrder,
    ChangeStatus,
    refresh,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    loaging,
    data,
    exportfun,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    POS
                </h3>
                <article className="d-flex">
                    <Link className="btn btn-primary mr-2" to="/pos/add">
                        Add POS
                    </Link>
                    {/* <button className="btn btn-primary mr-2" onClick={() => exportfun()}>
                        Export
                    </button> */}
                    <div className="dropdown addDropdown mr-2">
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
            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            {/* <th scope="col" className='table_data'>Added By</th> */}
                            <th scope="col" className='table_data'>Name</th>
                            <th scope="col" className='table_data'>Status</th>
                            <th scope="col" className='table_data'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr className='data_row'>
                                {/* <td className='table_dats' onClick={e => edit(itm.id)}>
                                <div className='user_detail'>
                                            <img src={methodModel.userImg(itm.addedByDetail.image)} className="user_imgs" />

                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.addedByDetail.fullName}
                                                </h4>
                                                <p className='user_info'>
                                                    {itm.addedByDetail.email}
                                                </p>
                                            </div>
                                        </div></td> */}
                                <td className='table_dats' onClick={e => edit(itm.id)}>{itm.name}</td>
                                <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                    <span className='contract'>
                                        {itm.status == 'deactive' ? 'inactive' : 'active'}
                                    </span>
                                </div></td>

                                {/* dropdown */}
                                <td className='table_dats'>
                                    <div className="action_icons">
                                        <a className="edit_icon" onClick={e => edit(itm.id)}>
                                            <i class="material-icons edit" title="Edit">edit</i>
                                        </a>
                                        <span className='edit_icon mr-1' onClick={() => deleteItem(itm.id)}>
                                            <i class="material-icons delete" title='Delete'> delete</i>

                                        </span>
                                        <span className='edit_icon mr-1' onClick={() => refresh(itm.id)}>
                                            <i class="material-icons delete" title='Refresh'> refresh</i>
                                        </span>
                                        <span className='edit_icon' title='Orders' onClick={() => viewOrder(itm.id)}>
                                            <i class="material-icons delete"> list</i>
                                        </span>
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
