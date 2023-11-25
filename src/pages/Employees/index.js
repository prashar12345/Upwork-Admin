import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import './style.scss'
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';


const Employees = () => {

  return (
    <Layout>
      <div className='main_header'>
        <div>
          <h2 className='main_heading'>Employee’s</h2>
        </div>

        <div className='side_btns'>
          <div className='icons_tab'>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="employee-tab" data-toggle="tab" data-target="#employee" type="button" role="tab" aria-controls="employee" aria-selected="true">
                  <img src="/assets/img/icon1.png" className='apps' />
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link staff" id="staff-tab" data-toggle="tab" data-target="#staff" type="button" role="tab" aria-controls="staff" aria-selected="false">
                  <img src="/assets/img/icon2.png" className='apps' />
                </button>
              </li>

            </ul>
          </div>

          <div className='employee'>
            <button type="button" class="btn btn-primary">Add Employee</button>
          </div>

        </div>

      </div>




      {/* main section */}

      <div class="main_section">

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="employee" role="tabpanel" aria-labelledby="employee-tab">

            <div className='cards_detail'>
              <div className='row'>
                <div className='col-md-4'>
                  <div className='new_cards'>
                    <div className='user_card'>
                      <div className='user_detail'>
                        <img src="/assets/img/Oval.png" className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            Maria Roselia
                          </h4>
                          <p className='user_info'>
                            vaz@vid.io
                          </p>
                        </div>
                      </div>

                      <div className='user_hours'>
                        <span className='contract'>
                          Contract
                        </span>
                      </div>
                    </div>


                    <div className='user_proff'>
                      <div className='id_name'>
                        <ul className='user_list'>
                          <li className='list_name'>
                            <a className='id'>
                              ID
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Position
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Department
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Phone number
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='detail_list'>
                        <ul className='user_list'>
                          <li className='list_names'>
                            <a className='id_name'>
                              ADM221-10
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              Sr. Digital Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span class="dot"></span>Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                              (847) 785-2310
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='new_cards'>
                    <div className='user_card'>
                      <div className='user_detail'>
                        <img src="/assets/img/Oval.png" className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            Maria Roselia
                          </h4>
                          <p className='user_info'>
                            vaz@vid.io
                          </p>
                        </div>
                      </div>

                      <div className='user_hours'>
                        <span className='contract'>
                          Contract
                        </span>
                      </div>
                    </div>


                    <div className='user_proff'>
                      <div className='id_name'>
                        <ul className='user_list'>
                          <li className='list_name'>
                            <a className='id'>
                              ID
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Position
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Department
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Phone number
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='detail_list'>
                        <ul className='user_list'>
                          <li className='list_names'>
                            <a className='id_name'>
                              ADM221-10
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              Sr. Digital Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span class="dot"></span>Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                              (847) 785-2310
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='new_cards'>
                    <div className='user_card'>
                      <div className='user_detail'>
                        <img src="/assets/img/Oval.png" className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            Maria Roselia
                          </h4>
                          <p className='user_info'>
                            vaz@vid.io
                          </p>
                        </div>
                      </div>

                      <div className='user_hours'>
                        <span className='contract'>
                          Contract
                        </span>
                      </div>
                    </div>


                    <div className='user_proff'>
                      <div className='id_name'>
                        <ul className='user_list'>
                          <li className='list_name'>
                            <a className='id'>
                              ID
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Position
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Department
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Phone number
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='detail_list'>
                        <ul className='user_list'>
                          <li className='list_names'>
                            <a className='id_name'>
                              ADM221-10
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              Sr. Digital Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span class="dot"></span>Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                              (847) 785-2310
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='new_cards'>
                    <div className='user_card'>
                      <div className='user_detail'>
                        <img src="/assets/img/Oval.png" className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            Maria Roselia
                          </h4>
                          <p className='user_info'>
                            vaz@vid.io
                          </p>
                        </div>
                      </div>

                      <div className='user_hours'>
                        <span className='contract'>
                          Contract
                        </span>
                      </div>
                    </div>


                    <div className='user_proff'>
                      <div className='id_name'>
                        <ul className='user_list'>
                          <li className='list_name'>
                            <a className='id'>
                              ID
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Position
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Department
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Phone number
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='detail_list'>
                        <ul className='user_list'>
                          <li className='list_names'>
                            <a className='id_name'>
                              ADM221-10
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              Sr. Digital Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span class="dot"></span>Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                              (847) 785-2310
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='new_cards'>
                    <div className='user_card'>
                      <div className='user_detail'>
                        <img src="/assets/img/Oval.png" className="user_imgs" />

                        <div className='user_name'>
                          <h4 className='user'>
                            Maria Roselia
                          </h4>
                          <p className='user_info'>
                            vaz@vid.io
                          </p>
                        </div>
                      </div>

                      <div className='user_hours'>
                        <span className='contract'>
                          Contract
                        </span>
                      </div>
                    </div>


                    <div className='user_proff'>
                      <div className='id_name'>
                        <ul className='user_list'>
                          <li className='list_name'>
                            <a className='id'>
                              ID
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Position
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Department
                            </a>
                          </li>
                          <li className='list_name'>
                            <a className='id'>
                              Phone number
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className='detail_list'>
                        <ul className='user_list'>
                          <li className='list_names'>
                            <a className='id_name'>
                              ADM221-10
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              Sr. Digital Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span class="dot"></span>Marketing
                            </a>
                          </li>
                          <li className='list_names'>
                            <a className='id_name'>
                              <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                              (847) 785-2310
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>




          </div>


          <div class="tab-pane fade" id="staff" role="tabpanel" aria-labelledby="staff-tab">
            <div className='table_section'>

              <table class="table">
                <thead className='table_head'>
                  <tr className='heading_row'>
                    <th scope="col" className='table_data'>ID</th>
                    <th scope="col" className='table_data'>Name </th>
                    <th scope="col" className='table_data'>Position</th>
                    <th scope="col" className='table_data'>Department</th>
                    <th scope="col" className='table_data'>Phone number</th>
                    <th scope="col" className='table_data'>Status</th>
                    <th scope="col" className='table_data'></th>

                  </tr>
                </thead>
                <tbody>
                  <tr className='data_row'>

                    <td className='table_dats'>ADM221-10</td>
                    <td className='table_dats'> <div className='user_detail'>
                      <img src="/assets/img/Oval.png" className="user_imgs" />

                      <div className='user_name'>
                        <h4 className='user'>
                          Maria Roselia
                        </h4>
                        <p className='user_info'>
                          vaz@vid.io
                        </p>
                      </div>
                    </div></td>
                    <td className='table_dats'>@Sr. Digital Marketing</td>
                    <td className='table_dats'><a className='id_name'>
                      <span class="dot"></span>Marketing
                    </a></td>

                    <td className='table_dats'> <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                      (847) 785-2310</td>
                    <td className='table_dats'>   <div className='user_hours'>
                      <span className='contract'>
                        Contract
                      </span>
                    </div></td>


                    {/* dropdown */}
                    <td className='table_dats'>

                      <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle dotdrop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-ellipsis-h" ></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" href="#">Edit</a>
                          <a className="dropdown-item" href="#">Delete</a>

                        </div>
                      </div>
                    </td>

                    {/* end */}

                  </tr>
                  <tr className='data_row'>

                    <td className='table_dats'>ADM221-10</td>
                    <td className='table_dats'> <div className='user_detail'>
                      <img src="/assets/img/Oval.png" className="user_imgs" />

                      <div className='user_name'>
                        <h4 className='user'>
                          Maria Roselia
                        </h4>
                        <p className='user_info'>
                          vaz@vid.io
                        </p>
                      </div>
                    </div></td>
                    <td className='table_dats'>@Sr. Digital Marketing</td>
                    <td className='table_dats'><a className='id_name'>
                      <span class="dot"></span>Marketing
                    </a></td>

                    <td className='table_dats'> <span className='call_icon'><i class="fa fa-phone" aria-hidden="true"></i></span>

                      (847) 785-2310</td>
                    <td className='table_dats'>   <div className='user_hours'>
                      <span className='contract'>
                        Contract
                      </span>
                    </div></td>
                    <td className='table_dats'>

                      <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle dotdrop" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="fa fa-ellipsis-h" ></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a className="dropdown-item" href="#">Edit</a>
                          <a className="dropdown-item" href="#">Delete</a>

                        </div>
                      </div>
                    </td>
                  </tr>





                </tbody>
              </table>


            </div>


          </div>

        </div>
      </div>




    </Layout>
  );
};

export default Employees;
