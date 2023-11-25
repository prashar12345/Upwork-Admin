import React from "react";
import Layout from "../../components/global/layout";
import Pagination from "react-pagination-js";
import "./style.scss";
import { Link } from "react-router-dom";
import methodModel from "../../methods/methods";
import datepipeModel from "../../models/datepipemodel";
import environment from "../../environment";
import Switch from "react-switch";
import { useHistory } from "react-router-dom";


const Html = ({
  tab,
  edit,
  ChangeStatus,
  statusChange,
  pageChange,
  deleteItem,
  filters,
  loaging,
  data,
  isAllow,
  total = { total },
}) => {
  const Navigate = useHistory();
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="hedding">Blog</h3>

        <article className="d-flex">
          {isAllow("addSkillType") ? (
            <Link className="btn btn-primary mr-2" to="/AddEditblogs">
              Add Blog
            </Link>
          ) : (
            <></>
          )}

          <div className="dropdown addDropdown">
            <button
              className="btn btn-primary dropdown-toggle removeBg"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {filters.status
                ? filters.status == "deactive"
                  ? "Inactive"
                  : filters.status
                : "All Status"}
            </button>
            <div
              className="dropdown-menu shadow bg_hover"
              aria-labelledby="dropdownMenuButton"
            >
              <a
                className={
                  filters.status == ""
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => ChangeStatus("")}
              >
                All Status
              </a>
              <a
                className={
                  filters.status == "active"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => ChangeStatus("active")}
              >
                Active
              </a>
              <a
                className={
                  filters.status == "Inactive"
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => ChangeStatus("deactive")}
              >
                Inactive
              </a>
            </div>
          </div>

          {/* <div className="col-md-6 mb-3">
                <label>
                category<span className="star">*</span>
                </label>
          <select className='form-control' required onChange={e=>setform({...form,category:e.target.value})} value={form.category} >
            <option value="">Select Master category</option>
            {categoriesdata.map((item,index)=>(
                <option className='text-capitalize' value={item.id}>{item.name}</option>
            ))}
          </select>
              </div>  */}
        </article>
      </div>

      {tab == "grid" ? (
        <></>
      ) : (
        <>
          <div className="table-responsive">
            <div className="table_section">
              <table class="table table-striped">
                <thead className="table_head">
                  <tr className="heading_row">
                    <th scope="col" className="table_data">
                      Title
                    </th>
                    <th scope="col" className="table_data">
                      Description
                    </th>
                    <th scope="col" className="table_data">
                      Category
                    </th>
                    <th scope="col" className="table_data">
                      Status
                    </th>
                    <th scope="col" className="table_data">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((itm, index) => (
                    <tr className="data_row">
                      <td className="table_dats" onClick={(e) => edit(itm.id)}>
                        {itm.title}
                      </td>

                      {/* <td className='table_dats' onClick={e => edit(itm.id)}> <img src={methodModel.userImg(itm.images)} className="user_imgs" /></td>                                */}
                      <td className="table_dats" >
                        <div className="text-truncate"
                          dangerouslySetInnerHTML={{ __html: itm.description }}
                        ></div>
                      </td>
                      <td className="table_dats" >
                        {itm.categoryDetail.name}
                      </td>
                      <td className="table_dats">
                        {" "}
                        <div className={` ${itm.status}`}>
                          <span className="contract">
                            {itm.status == "deactive" ? (
                              <Switch
                                onChange={(e) => statusChange(itm)}
                                checked={false}
                              />
                            ) : (
                              <Switch
                                onChange={(e) => statusChange(itm)}
                                checked={true}
                              />
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="table_dats">
                        <div className="action_icons">
                          {isAllow("editSkillType") ? (
                            <>
                              <a
                                className="edit_icon"
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
                          {isAllow("deleteSkillType") ? (
                            <span
                              className="edit_icon"
                              onClick={() => deleteItem(itm.id)}
                            >
                              <i class="material-icons delete" title="Delete">
                                {" "}
                                delete
                              </i>
                            </span>
                          ) : (
                            <></>
                          )}

                          <span
                            className="edit_icon"
                            title="View"
                            onClick={() =>
                              Navigate.push(`blogsDetails/${itm.id}`)
                            }
                          >
                            <i className="fa fa-eye"></i>
                          </span>
                        </div>
                      </td>

                      {/* end */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            Show {filters.count} from {total} Categories
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
