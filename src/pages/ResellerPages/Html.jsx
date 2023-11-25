import React from 'react';
import Pagination from "react-pagination-js";
import Layout from '../../components/global/layout';
import { useHistory } from 'react-router';
import moment from 'moment';

const Html = ({
    tab,
    edit,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    ChangeStatus,
    loaging,
    data,
    exportfun,
    total
}) => {
    const Navigate = useHistory();
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Reseller
                </h3>
                <a id='downloadFile'></a>
                <article className="d-flex">
                    <button className='btn btn-primary mr-2' onClick={e => Navigate.push("/reseller/addedit")}>Add Reseller</button>
                    <button className="btn btn-primary mr-2" onClick={() => exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'deactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
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
                                        <div className='user_detail' onClick={e => edit(itm.id)}>
                                            <img src={methodModel.userImg(itm.image)} className="user_imgs" />
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.name}
                                                </h4>
                                                <p className='user_info'>
                                                    {itm.contractDate}
                                                </p>
                                                <p className='user_info'>
                                                    {itm.booking}
                                                </p>
                                                <p className='user_info'>
                                                    {itm.pax}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status == 'deactive' ? 'inactive' : 'active'}
                                            </span>
                                        </div>
                                    </div>
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
                                    <th scope="col" className='table_data'>Reseller Type</th>
                                    {/* <th scope='col' className='table_data'>Category</th> */}
                                    {/* <th scope="col" className='table_data'>Contract Date</th> */}
                                    <th scope="col" className='table_data'>Created At</th>
                                    <th scope="col" className='table_data'>Updated At</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                        <td className='table_dats' onClick={e => edit(itm.id)}>{itm.name}</td>
                                        <td className='table_dats'>{itm?.category?.name}</td>
                                        {/* <td className='table_dats' onClick={e => edit(itm.id)} >{itm?.category?.name}</td> */}
                                        {/* <td className='table_dats pointer' onClick={e => edit(itm.id)}>{moment(itm.contractDate).format("DD MMM YYYY")}</td> */}
                                        <td className='table_dats pointer'>{moment(itm.createdAt).format("DD MMM YYYY")}</td>
                                        <td className='table_dats pointer'>{moment(itm.updatedAt).format("DD MMM YYYY")}</td>
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
                                                <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                    <i class="material-icons delete" title='Delete'> delete</i>
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
