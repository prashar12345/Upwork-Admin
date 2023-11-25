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
    tab,
    edit,
    view,
    tabChange,
    colClick,
    openModal,
    statusChange,
    ChangeStatus,
    pageChange,
    addCol,
    deleteItem,
    exportCsv,
    uTableCols,
    removeCol,
    filters,
    filter,
    tableCols,
    loaging,
    data,
    types,
    CurrencyData,
    ContinentData,
    reset,
    search,
    exportfun,
    isAllow,
    total = { total }
}) => {
    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center ">
                <h3 className="hedding">
                    Countries
                </h3>
                <article className="d-flex">
                    {isAllow('addCountries')?
                        <Link className="btn btn-primary mr-2" to="/countries/add">
                            Add Country
                        </Link>
                    :<></>}
                    <button className="btn btn-primary mr-2 " onClick={()=>exportfun()}>
                        Export  
                    </button>
                
                    <span className='mx-0'>
                    <div className="dropdown addDropdown chnages mr-2">
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            placeholder='All Continents'
                            displayValue="name"
                            intialValue={filters.continentId}
                            result={e => { filter({ continentId: e.value }) }}
                            options={ContinentData}
                        />
                        </div>
                    </span>
                    
                    <span className='mx-0'>
                    <div className="dropdown addDropdown chnages mr-2">
                        <SelectDropdown
                            isSingle={true}
                            id="statusDropdown"
                            placeholder='All Currency'
                            displayValue="currency"
                            intialValue={filters.currencyId}
                            result={e => { filter({ currencyId: e.value }) }}
                            options={CurrencyData}
                        />
                         </div>
                    </span>
                   
                    <div className="dropdown addDropdown chnagess">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                             <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                             <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>

                    <span className='mx-2'>
                        {filters.continentId || filters.currencyId || search ?
                            <a className="btn btn-primary mr-0 btnreset" onClick={e => reset()}>
                                Reset
                            </a>
                        : <></>}
                    </span>
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
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.name}
                                                </h4>
                                                
                                            </div>
                                            <div className='user_name'>
                                                <h4 className='user'>
                                                    {itm.region}
                                                </h4>
                                            </div>
                                        </div>
                                        <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract'>
                                                {itm.status}
                                            </span>
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
                                    <th scope="col" className='table_data'>Continent</th>
                                    <th scope="col" className='table_data'>Country Name</th>
                                    <th scope="col" className='table_data'>Currency</th>
                                    <th scope="col" className='table_data'>Status</th>
                                    <th scope="col" className='table_data'>Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {!loaging && data && data.map((itm, i) => {
                                    return <tr className='data_row'>
                                             <td className=''>{itm.continent?itm.continent.name:''}</td>
                                        <td className='table_dats' onClick={e => edit(itm.id)}> <div className='user_detail'>
                                            <h4 className='user'>
                                                {itm.name}
                                            </h4>
                                        </div></td>
                                   
                                        <td className=''>{itm.currencyId?itm.currencyId.currency:''}</td>
                                        
                                        {/* <td className='table_dats pointer'>{itm.productCount}</td> */}
                                        <td> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                                            <span className='contract table_dats'>
                                                {itm.status}
                                            </span>
                                        </div></td>

                                        {/* dropdown */}
                                        <td className='table_dats'>
                                            <div className="action_icons">
                                                {isAllow('editCountries')?
                                                    <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                                                        <i class="material-icons edit" title="Edit">edit</i>
                                                    </a>
                                                :<></>}
                                                {isAllow('deleteCountries')?
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
