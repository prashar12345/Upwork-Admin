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
    ChangeStatus,
    statusChange,
    pageChange,
    deleteItem,
    filters,
    filter,
    loaging,
    data,
    exportfun,
    contries,
    years,
    total
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">Holidays</h3>
                <article className="d-flex">
                    <span className='mr-2'>
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            displayValue="name"
                            placeholder='All Countries'
                            intialValue={filters.country}
                            result={e => filter({ country: e.value?e.value:contries[0].id })}
                            options={contries}
                        />
                    </span>
                    <SelectDropdown
                        isSingle={true}
                        id="statusDropdown"
                        displayValue="year"
                        placeholder='All Years'
                        intialValue={filters.year}
                        result={e => filter({ year: e.value?e.value:years[0].id })}
                        options={years}
                    />

                    {/* <button className="btn btn-primary mr-2" onClick={()=>exportfun()}>
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
                    </div> */}
                </article>
            </div>

            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Name</th>
                            <th scope="col" className='table_data'>Rule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loaging && data && data.map((itm, i) => {
                            return <tr className='data_row'>
                                <td className='table_dats' onClick={e => edit(itm.id)}>{itm.name}</td>
                                <td className='table_dats'>{itm.rule}</td>
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
                    <span>Show {filters.count} from {total} Holidays</span>
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
