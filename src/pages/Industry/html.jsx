import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import rolesModel from "../../models/roles.model";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import environment from "../../environment";
import Switch from 'react-switch'

const Html = ({
  view,
  edit,
  reset,
  add,
  colClick,
  tab,
  tabChange,
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
  blockunblock,
  loaging,
  data,
  exportfun,
  roles,
  role,
  isAllow,
  total = { total },
}) => {
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="hedding">{role ? rolesModel.name(role) : "Industry Type"}</h3>

        <article className="d-flex filterFlex phView">
          {isAllow("addTypes") ? (
            <>
              <a className="btn btn-primary mr-2" onClick={(e) => add()}>
                Add {role ? rolesModel.name(role) : "Industry Type"}
              </a>
            </>
          ) : (
            <></>
          )}
          {/* 
                    <button onClick={exportfun} className="btn btn-primary">
                        Export
                    </button> */}
          <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status == "deactive" ? "Inactive" : filters.status : 'All Status'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a>
                            <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                            <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                        </div>
                    </div>
          {/* {!role ? <div className="dropdown addDropdown chnagesg">
                        <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.role ? methodModel.find(roles, filters.role, 'id')?.name : 'All User'}
                        </button>
                        <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                            <a className={filters.role == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole('')}>All User</a>
                            {roles && roles.map(itm => {
                                if(itm.id!=environment.userRoleId)
                                return <a className={filters.role == itm.id ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeRole(itm.id)}>{itm.name}</a>
                            })}
                        </div>
                    </div> : <></>} */}

          {/* {filters.status || filters.role ? <>
                        <a className="btn btn-primary" onClick={e => reset()}>
                            Reset
                        </a>
                    </> : <></>} */}

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

          {/* <div className="dropdown addDropdown mr-2">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuColumns" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add Columns
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuColumns">
                            {uTableCols().map(itm => {
                                return <a className="dropdown-item" onClick={() => addCol(itm)} key={itm.value}>{itm.value}</a>
                            })}
                        </div>
                    </div> */}
          {/* <button onClick={exportCsv} className="btn btn-primary" type="button">
                        Export
                    </button> */}
        </article>
      </div>

      {tab == "grid" ? (
        <>
          {/* <div className="cardList">
            <div className="row">
              {!loaging &&
                data &&
                data.map((itm, i) => {
                  return (
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4">
                      <div className="new_cards">
                        <div className="user_card">
                          <div
                            className="user_detail"
                            onClick={(e) => edit(itm.id)}
                          >
                            <img
                              src={methodModel.userImg(itm.image)}
                              className="user_imgs"
                            />

                            <div className="user_name">
                              <h4 className="user">{itm.fullName}</h4>
                              <p className="user_info">{itm.email}</p>
                            </div>
                          </div>

                          <div
                            className={`user_hours ${itm.status}`}
                            onClick={() => statusChange(itm)}
                          >
                            <span className="contract">{itm.status}</span>
                          </div>
                        </div>

                        <div className="user_proff user_proff1">
                          <div className="id_name">
                            <ul className="user_list">
                              <li className="list_name">
                                <a className="id">Role</a>
                              </li>
                              <li className="list_name">
                                <a className="id">Phone number</a>
                              </li>
                            </ul>
                          </div>
                          <div className="detail_list">
                            <ul className="user_list">
                              <li className="list_names">
                                <a
                                  className="id_name"
                                  onClick={(e) => edit(itm.id)}
                                >
                                  {itm.role?.name}
                                </a>
                              </li>
                              <li className="list_names">
                                <a
                                  className="id_name"
                                  onClick={(e) => edit(itm.id)}
                                >
                                  <span className="call_icon"></span>
                                  {itm.mobileNo ? (
                                    <>
                                      <i
                                        class="fa fa-phone"
                                        aria-hidden="true"
                                      ></i>
                                      {itm.dialCode} {itm.mobileNo}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div> */}
        </>
      ) : (
        <>
          <div className="table-responsive table_section">
            <table class="table table-striped">
              <thead className="table_head">
                <tr className="heading_row">
                  <th scope="col" className="table_data">
                    Name
                  </th>
                  {/* <th scope="col" className="table_data">
                    image
                  </th> */}
                  {/* <th scope="col" className='table_data'>Role</th>
                                <th scope="col" className='table_data'>Last Login</th> */}
                  <th scope="col" className="table_data">
                    Status
                  </th>
                  {/* <th scope="col" className='table_data'>Date Created</th>
                                <th scope="col" className='table_data'>Last Modified</th> */}
                  <th scope="col" className="table_data">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!loaging &&
                  data &&
                  data.map((itm, i) => {
                    return (
                      <tr className="data_row">
                        <td
                          className="table_dats"
                          onClick={(e) => edit(itm.id)}
                        >
                          <div className="user_name">
                            <h4 className="user">{itm.industryName}</h4>
                          </div>
                        </td>

                        {/* <td
                          className="table_dats"
                          onClick={(e) => edit(itm.id)}
                        >
                          <div className="user_detail">
                            <img
                              src={methodModel.userImg(itm.image)}
                              className="user_imgs"
                            />
                          </div>
                        </td> */}
                        {/* <td className='table_dats'>{itm.role?.name}</td> */}
                        {/* <td className='table_dats'>{datepipeModel.date(itm.lastLogin)}</td> */}
                        <td className="table_dats">
                          {" "}
                          <div
                            className={` ${itm.status}`} 
                          >
                            <span className="contract">
                            {itm.status == 'deactive' ?<Switch onChange={e=>statusChange(itm)} checked={false} /> : <Switch onChange={e=>statusChange(itm)} checked={true} />}
                            </span>
                          </div>
                        </td>
                        {/* <td className='table_dats'>{datepipeModel.date(itm.createdAt)}</td>
                                    <td className='table_dats'>{datepipeModel.date(itm.updatedAt)}</td> */}
                        {/* <td className='table_dats'> <span className='call_icon'></span>
                                        {itm.mobileNo ?
                                            <>
                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                {itm.dialCode} {itm.mobileNo}
                                            </>
                                            :
                                            ''
                                        }
                                    </td> */}

                        {/* dropdown */}
                        <td className="table_dats">
                          <div className="action_icons">
                            {isAllow("editTypes") ? (
                              <>
                                <a
                                  className="edit_icon"
                                  title="Edit"
                                  onClick={(e) => edit(itm.id)}
                                >
                                  <i class="material-icons edit" title="Edit">
                                    edit
                                  </i>
                                </a>
                              </>
                            ) : (
                              <></>
                            )}

                            {isAllow("deleteTypes") ? (
                              <>
                                <span
                                  className="edit_icon"
                                  onClick={() => deleteItem(itm.id)}
                                >
                                  <i
                                    class="material-icons delete"
                                    title="Delete"
                                  >
                                    {" "}
                                    delete
                                  </i>
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {!loaging && total == 0 ? (
        <div className="py-3 text-center">No Data</div>
      ) : (
        <></>
      )}

      {!loaging && total > filters.count ? (
        <div className="paginationWrapper">
          <span>
            Show {filters.count} from {total} Sub Admin’s
          </span>
          <Pagination
            currentPage={filters.page}
            totalSize={total}
            sizePerPage={filters.count}
            changeCurrentPage={pageChange}
          />
        </div>
      ) : (
        <></>
      )}

      {loaging ? (
        <div className="text-center py-4">
          <img src="/assets/img/loader.gif" className="pageLoader" />
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default Html;
