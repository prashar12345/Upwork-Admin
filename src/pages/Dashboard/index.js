import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import './style.scss';
import canvasModel from '../../models/canvas.model';
import SelectDropdown from "../../components/common/SelectDropdown"
import {useHistory} from 'react-router-dom'
var CanvasJSChart = canvasModel.CanvasJSChart;

const Dashboard = () => {
  const Navigate=useHistory()
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    if(user.loggedIn){

    }
  })
  const [loader, setLoader] = useState(false);
  const [filters, setFilter] = useState({
    type: 'day',
    healthClinic: '',
    startDate: '',
    endDate: '',
    country: '',
  });

  const xAxis = {
    labelFontSize: 12,
    titleFontSize: 16,
    interval: 1,
    titleFontWeight: 'bold',
    labelWrap: true,
  };

  const typFormate = (p = filters.type) => {
    let value = 'DD MMM YY';
    if (p == 'day') value = 'DD MMM YY';
    if (p == 'week') value = '';
    if (p == 'month') value = 'MMM YY';
    if (p == 'year') value = 'YYYY';

    return value;
  };

  return (
    <Layout>
      <div className="row d-flex align-items-center">
        <div className="col-md-9 head_cls">
          <h2 className="mb-1 mainHeading_cls">
            {' '}
            <span className="dsh_hedding">Hi</span>
            {user && user.fullName}
          </h2>
          <p className="paraCls">
            Here’s what’s going on with your team Designspace
          </p>
        </div>
        <div className="col-md-3 text-right">
       
          <SelectDropdown
                                    id="statusDropdown"
                                    displayValue="name"
                                    placeholder="2 Jan ’21 - 8 Jan ’21"
                    
                                   
                                    result={e => {  }}
                                    options={
                                      [
                                        {id:'1',name:'Option 1'},
                                        {id:'2',name:'Option 2'},
                                      ]
                                    }
                                />
        </div>
        <div className="cards_sales">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">New Sales</p>
                    </div>
                    <div>
                      <img src="/assets/img/bag.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 22,880.50</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Cost of Goods Sold</p>
                    </div>
                    <div>
                      <img
                        src="/assets/img/wallet.png"
                        className="wallets_img"
                      />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 8,768.00</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Gross Profit</p>
                    </div>
                    <div>
                      <img
                        src="/assets/img/graphrange.png"
                        className="wallets_img"
                      />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">$ 2,768.00</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 mt-3">
              <div className="sales_section">
                <div className="main_sales">
                  <div className="sales_headings">
                    <div>
                      <p className="sub_heading">Quentity</p>
                    </div>
                    <div>
                      <img src="/assets/img/send.png" className="wallets_img" />
                    </div>
                  </div>
                  <div className="sales_icons">
                    <h3 className="Amount_sales">6</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* graph Design */}

          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
              <div className="graph_section">
                <div className="graph_range">
                  <div>
                    <h3 className="Amount_sales">Revenue vs Costs</h3>
                  </div>

                  <div>
                    <p className="view_graph">
                      View full report
                      <span className="arrowss"><i class="material-icons">keyboard_arrow_right</i></span>
                    </p>
                  </div>
                </div>

                <div className="revenue_graph">
                  <img src="/assets/img/Chart (1).png" className="graphs" />
                </div>

                <div className="costs">
                  <p className="costes_para">Revenue</p>
                  <p className="costes_paras">Costs</p>
                </div>
              </div>
            </div>

            {/* 2nd cards */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 cls">
              <div className="graph_section">
                <div className="graph_range">
                  <div>
                    <h3 className="Amount_sales">Total Profit</h3>
                  </div>

                  <div>
                    <p className="view_graph">
                      View full report
                      <span className="arrowss"><i class="material-icons">keyboard_arrow_right</i></span>
                    </p>
                  </div>
                </div>

                <div className="revenue_graph">
                  <img src="/assets/img/Chart.png" className="graphs" />
                </div>
              </div>
            </div>
            {/* 3rd card */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-3">
              <div className="graph_section">
                <div className="graph_range">
                  <div>
                    <h3 className="Amount_sales">Orders to ship</h3>
                  </div>

                  <div>
                    <p className="view_graph">
                      View full report
                      <span className="arrowss"><i class="material-icons">keyboard_arrow_right</i></span>
                    </p>
                  </div>
                </div>

                <div className="revenue_graph">
                  {/* table */}

                  <div className="table-responsive table_section  add mt-0 p-0">
                    <table class="table table-striped">
                      <tbody>
                        <tr className="dashboard">
                          <td>
                            <div className="shipment_section">
                              <div className="orders">
                                <div className="ship_items">
                                  <img
                                    src="/assets/img/Item.png"
                                    className="order_ship"
                                  />
                                </div>
                                <div>
                                  <h3 className="item_no">#SO0005</h3>
                                  <p className="item_name">Rhombus Commerce</p>
                                </div>
                              </div>

                              <div className="item_rate">
                                <div>
                                  <h5 className="item_price">$15.00</h5>
                                  <p className="shipment_time">
                                    Overdue 10 hours
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="dashboard">
                          <td>
                            <div className="shipment_section">
                              <div className="orders">
                                <div className="ship_items">
                                  <img
                                    src="/assets/img/Item.png"
                                    className="order_ship"
                                  />
                                </div>
                                <div>
                                  <h3 className="item_no">#SO0005</h3>
                                  <p className="item_name">Rhombus Commerce</p>
                                </div>
                              </div>

                              <div className="item_rate">
                                <div>
                                  <h5 className="item_price">$15.00</h5>
                                  <p className="shipment_time">
                                    Overdue 10 hours
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="dashboard">
                          <td>
                            <div className="shipment_section">
                              <div className="orders">
                                <div className="ship_items">
                                  <img
                                    src="/assets/img/Item.png"
                                    className="order_ship"
                                  />
                                </div>
                                <div>
                                  <h3 className="item_no">#SO0005</h3>
                                  <p className="item_name">Rhombus Commerce</p>
                                </div>
                              </div>

                              <div className="item_rate">
                                <div>
                                  <h5 className="item_price">$15.00</h5>
                                  <p className="shipment_time">
                                    Overdue 10 hours
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="dashboard">
                          <td>
                            <div className="shipment_section">
                              <div className="orders">
                                <div className="ship_items">
                                  <img
                                    src="/assets/img/Item.png"
                                    className="order_ship"
                                  />
                                </div>
                                <div>
                                  <h3 className="item_no">#SO0005</h3>
                                  <p className="item_name">Rhombus Commerce</p>
                                </div>
                              </div>

                              <div className="item_rate">
                                <div>dashboard
                                  <h5 className="item_price">$15.00</h5>
                                  <p className="shipment_time">
                                    Overdue 10 hours
                                  </p>
                                </div>
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

            {/* 4th card */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 mt-3">
              <div className="graph_section">
                <div className="graph_range">
                  <div>
                    <h3 className="Amount_sales">Revenue vs Units Sold</h3>
                  </div>
                </div>

                <div className="revenue_graph">
                  <img src="/assets/img/Chart (2).png" className="graphs" />
                </div>

                <div className="costst">
                  <p className="costes_para">Units Sold</p>
                  <p className="costes_paras">Total Transaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;


