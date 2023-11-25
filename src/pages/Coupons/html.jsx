import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import methodModel from '../../methods/methods';
// import DatePicker from "react-datepicker";
import datepipeModel from '../../models/datepipemodel';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

const Html = ({
    tab,
    minDate,
    filter,
    reset,
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
    tableCols,
    loaging,
    data,
    dateconvert,
    types,
    exportfun,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Coupons
                </h3>
                <article className="d-flex filterFlex">
                    {isAllow('addCoupons')?
                        <Link className="btn btn-primary mr-2" to="/coupon/add">
                            Add Coupon
                        </Link>
                    :<></>}
                    <button onClick={() => exportfun()} className="btn btn-primary mr-2">
                        Export
                    </button>
                    <div className="dropdown addDropdown ">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
                    <div className='dropdown addDropdown  chnages_date'>
                    <RangePicker
                        format="MM-DD-YYYY"
                        isClearable={filters.dateTo ? false : true}
                        onChange={(date) => dateconvert(date)} 
                        placeholder={["Start Date", "End Date"]}
                    />
                    {/* <DatePicker
                        selected={datepipeModel.stringToDate(filters.dateFrom)}
                        className="form-control"
                        minDate={minDate}
                        placeholderText="Date From & Date To"
                        onChange={(date) => filter({ dateFrom: datepipeModel.datetostring(date) })}
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    /> */}
                    {/* <DatePicker
                        selected={datepipeModel.stringToDate(filters.dateTo)}
                        className="form-control"
                        placeholderText="Date To"
                        minDate={datepipeModel.stringToDate(filters.dateFrom) || minDate}
                        onChange={(date) => filter({ dateTo: datepipeModel.datetostring(date) })}
                        onKeyDown={(e) => {
                            e.preventDefault();
                        }}
                    /> */}
                    {filters.dateFrom || filters.dateTo || filters.status ? <>
                        <button className="btn btn-primary" onClick={e => reset()}>
                            Reset
                        </button>
                    </> : <></>}
                    </div>
                </article>

                <div className="table-responsive table_section">
                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Title</th>
                                <th scope="col" className='table_data'>Date</th>
                                <th scope="col" className='table_data'>Discount Type</th>
                                <th scope="col" className='table_data'>Discount Amount</th>
                                <th scope="col" className='table_data'>Status</th>
                                <th scope="col" className='table_data'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>
                                    <td className='table_dats' onClick={e => edit(itm.id)}>{itm.title}</td>
                                    {/* <td className='table_dats' onClick={e => edit(itm.id)}>{itm.dateFrom} - {itm.dateTo}</td> */}
                                    <td className='table_dats'>{datepipeModel.date(itm.dateFrom)} - {datepipeModel.date(itm.dateTo)}</td>
                                    <td className='table_dats'>{itm.discountType}</td>
                                    <td className='table_dats'>{itm.discountAmount}</td>
                                    {/* <td className='table_dats pointer' onClick={e => edit(itm.id)}>{datepipeModel.datetime(itm.createdAt)}</td> */}
                                    <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                        <span className='contract'>
                                            {itm.status == 'deactive' ? 'inactive' : 'active'}
                                        </span>
                                    </div></td>

                                    {/* dropdown */}
                                    <td className='table_dats'>
                                        <div className="action_icons">
                                            {isAllow('editCoupons')?
                                                <a className="edit_icon" onClick={e => edit(itm.id)}>
                                                    <i class="material-icons edit" title="Edit">edit</i>
                                                </a>
                                            :<></>}
                                            {isAllow('deleteCoupons')?
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
