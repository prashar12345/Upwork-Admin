import React from 'react';
import Layout from '../../components/global/layout';
import Pagination from "react-pagination-js";
import './style.scss';
import { Link } from 'react-router-dom';
import userTableModel from '../../models/table.model';
import datepipeModel from '../../models/datepipemodel';
import methodModel from '../../methods/methods';
import SelectDropdown from '../../components/common/SelectDropdown';

const Html = ({
    filter,
    reset,
    countrydata,
    continentdata,
    regiondata,
    tab,
    edit,
    ChangeStatus,
    view,
    tabChange,
    colClick,
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
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center ">
                <h3 className="hedding">
                    Cities
                </h3>
                <article className="d-flex filterFlex">
                    {isAllow('addCities')?
                    <Link className="btn btn-primary mr-2 " to="/cities/add">
                        Add City
                    </Link>:<></>
                    }
                    <button className="btn btn-primary mr-2 " onClick={() => exportfun()}>
                        Export
                    </button>
                    <div className="dropdown addDropdown ">
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown "
                            placeholder="All Continent"
                            displayValue="name"
                            intialValue={filters.continentId}
                            result={e => { filter({ continentId: e.value }) }}
                            options={continentdata}
                        />
                    </div>
                    <div className="dropdown addDropdown ">
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            placeholder="All Country"
                            displayValue="name"
                            intialValue={filters.countryId}
                            result={e => { filter({ countryId: e.value }) }}
                            options={countrydata}
                        />
                    </div>
                    <div className="dropdown addDropdown city_region ">
                        {/* chnageset */}
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            placeholder="All Region"
                            displayValue="name"
                            intialValue={filters.regionId}
                            result={e => { filter({ regionId: e.value }) }}
                            options={regiondata}
                        />
                    </div>
                    <div className="dropdown addDropdown city_status ">
                        {/* chnageses */}
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>

                    {filters.regionId || filters.countryId || filters.continentId ? <>
                        <button className="btn btn-primary btnreset" onClick={reset}>
                            Reset
                        </button>
                    </> : <></>}
                </article>
            </div>
            {tab == 'grid' ? <>
            </> : <>
                <div className="table-responsive table_section">

                    <table class="table table-striped">
                        <thead className='table_head'>
                            <tr className='heading_row'>
                                <th scope="col" className='table_data'>Continent</th>
                                <th scope='col' className='table_data'>Country</th>
                                <th scope='col' className='table_data'>Region</th>
                                <th scope="col" className='table_data'>City Name</th>
                                <th scope="col" className='table_data'>Status</th>
                                        
                                <th scope="col" className='table_data'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loaging && data && data.map((itm, i) => {
                                return <tr className='data_row'>

                                    
                                    <td>{itm.continent ? itm.continent.name : ''}</td>
                                    <td>{itm.countryId ? itm.countryId.name : ''}</td>
                                    <td>{itm.region ? itm.region.name : ''}</td>
                                    <td><div className='user_detail' onClick={e => edit(itm.id)}>
                                        <div className='table_dats'>
                                            <h4 className='user'>
                                                {itm.name}
                                            </h4>
                                        </div>
                                    </div></td>
                                    <td> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                        <span className='contract table_dats'>
                                            {itm.status}
                                        </span>
                                    </div></td>
                                    <td className='table_dats'>
                                        <div className="action_icons">
                                            {isAllow('editCities')?
                                            <a className="edit_icon" onClick={e => edit(itm.id)}>
                                                <i class="material-icons edit" title="Edit">edit</i>
                                            </a>
                                            :<></>}
                                            {isAllow('deleteCities')?
                                            <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                                                <i class="material-icons delete" title='Delete'>delete</i>
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
                    <span>Show {filters.count} from {total} Cities</span>
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
