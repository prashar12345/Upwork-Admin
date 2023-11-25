import React from "react";
import environment from "../../../environment";
import dynamicPriceModel from "../../../models/dynamicPrice.model";

const Html = ({ ListItemLink, tabclass, urlAllow, route }) => {
  return (
    // <ul className="nav flex-column" component="siderbar">
    <ul className="nav flex-column" component="siderbar">
      {urlAllow("readDashboard") ? (
        <ListItemLink to="/dashboard">
          <i class="material-icons  mr-2" title="Dashboard">
            dashboard
          </i>
          <span class="side_head">Dashboard</span>
        </ListItemLink>
      ) : null}

      <li className="nav-item">
        {urlAllow("readRole") || urlAllow("readAdmins") ? (
          <>
            <a
              class={`col_side ${tabclass("user") ? "" : "collapsed"}`}
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <div className="sidees">
                <i class="material-icons mr-2" title="User Management">
                  manage_accounts
                </i>
                <span>User Management</span>
              </div>
              <div>
                <span className="side_icon">
                  <i class="material-icons">keyboard_arrow_right</i>
                </span>
              </div>
            </a>
          </>
        ) : (
          <></>
        )}

        <div
          class={`collapse ${tabclass("user") ? "show" : ""}`}
          id="collapseExample"
        >
          <div class="card card-body sides">
            {urlAllow("readRole") ? (
              <>
                <ListItemLink to="/roles">
                  {/* <i class="material-icons sidenv mr-2" title="Roles">supervised_user_circle</i> */}
                  <i class="fa fa-tasks sideicon mr-2" aria-hidden="true"></i>{" "}
                  <span>Roles</span>
                </ListItemLink>
              </>
            ) : (
              <></>
            )}
            {urlAllow("readAdmins") ? (
              <>
                <ListItemLink to="/users">
                  <i class="fa fa-users sideicon mr-2" aria-hidden="true"></i>{" "}
                  <span>Users</span>
                </ListItemLink>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </li>

      {urlAllow("readTypes") ||
      urlAllow("readSkillType") ||
      urlAllow("readSkills") ? (
        <>
          <a
            class={`col_side ${tabclass("category") ? "" : "collapsed"}`}
            data-bs-toggle="collapse"
            href="#collapseExample1"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <div className="sidees">
              <i class="material-icons mr-2" title="Categories Management">
                category
              </i>
              <span>Categories</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
        </>
      ) : (
        <></>
      )}
      <div
        class={`collapse ${tabclass("category") ? "show" : ""}`}
        id="collapseExample1"
      >
        <div class="card card-body sides">
          {urlAllow("readTypes") ? (
            <ListItemLink to="/industry">
              <i class="fa fa-industry sideicon mr-2" aria-hidden="true"></i>
              <span class="side_head">Industry Type</span>
            </ListItemLink>
          ) : null}

          {urlAllow("readSkillType") ? (
            <ListItemLink to="/masterskils">
              <i class="fa fa-cogs sideicon mr-2" aria-hidden="true"></i>{" "}
              <span class="side_head">Skill Types</span>
            </ListItemLink>
          ) : null}
          {urlAllow("readSkills") ? (
            <ListItemLink to="/skills">
              <i class="fa fa-cogs sideicon mr-2" aria-hidden="true"></i>{" "}
              <span class="side_head">Skills</span>
            </ListItemLink>
          ) : null}

          {urlAllow("readSkills") ? (
            <ListItemLink to="/categorylist">
        <i class="fa fa-list-alt mr-2" aria-hidden="true"></i>
        <span>Blog/FAQ Category</span>
      </ListItemLink>
          ) : null}

     
        </div>
      </div>

      {/* <li className="nav-item">
        {urlAllow('types,categories,category') ? <>
          <a class={`col_side ${tabclass('catalogue') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
            <div className="sidees">
              <i class="material-icons mr-2" title="Catalogue">menu_book</i>
              <span >Catalogue</span>
            </div>   

            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>

          </a>
        </> : <></>}
      </li> */}

      {/* <div class={`collapse ${tabclass('catalogue') ? 'show' : ''}`} id="collapseExample2">
        <div class="card card-body sides">
          {urlAllow('types') ? <>
            <ListItemLink to="/types">
              <i className="material-icons sidenv mr-2" title="Types">category</i>
              <span>Types</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('categories') ? <>
            <ListItemLink to="/categories">
              <i className="material-icons sidenv mr-2" title="category">category</i>
              <span>Categories</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('category') ? <>
            <ListItemLink to={"/category/" + environment.resellerTypeId}>
              <i className="fa fa-list sidenv mr-2" aria-hidden="true" title="Reseller Category"></i>
              <span>Reseller Categories</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('category') ? <>
            <ListItemLink to={"/category/product/" + environment.productTypeId}>
              <i className="fa fa-list sidenv mr-2" aria-hidden="true" title="Product Category"></i>
              <span>Product Categories</span>
            </ListItemLink>
          </> : <></>}
        </div>
      </div> */}

      {/* <li className="nav-item">
        {urlAllow('features,plans') ? <>
          <a class={`col_side ${tabclass('plan') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
            <div className="sidees">
              <i class="material-icons mr-2" >subscriptions</i>
              <span >Subscription Plan</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
        </> : <></>}  
      </li> */}

      {/* 
      <div class={`collapse ${tabclass('plan') ? 'show' : ''}`} id="collapseExample3">
        <div class="card card-body sides">
          {urlAllow('features') ? <>
            <ListItemLink to="/features">
              <i class="material-icons sidenv" title="Plans Features">list_alt</i>
              <span>Plan Features</span>
            </ListItemLink>   
          </> : <></>}
          {urlAllow('plans') ? <>
            <ListItemLink to="/plans">
              <i class="material-icons sidenv" title="Plans">featured_play_list</i>
              <span>Plans</span>
            </ListItemLink>
          </> : <></>}
        </div>
      </div> */}
       <ListItemLink to="/projects">
            <i class="material-icons mr-2" title="Coupons">
              wallet_membership
            </i>
            <span>Job Posts</span>
          </ListItemLink>
          <ListItemLink to="/technologies">
        <i class="fa fa-desktop mr-2" aria-hidden="true"></i>
        <span>Technology</span>
      </ListItemLink>
      {urlAllow("readContent") ? (
        <>
          <ListItemLink to="/content">
            <i class="material-icons mr-2" title="Coupons">
              wallet_membership
            </i>
            <span>Content Management</span>
          </ListItemLink>
        </>
      ) : (
        <></>
      )}
      {urlAllow("readAssessment") ?
      <ListItemLink to="/assessment">
        <i class="fas fa-tasks mr-2"></i>
        <span>Assessment module </span>
      </ListItemLink>:null}
    {/* {urlAllow("readQuestion")?   <ListItemLink to="/questions">
        <i class="fa fa-question-circle mr-2" aria-hidden="true"></i>
        <span>Questions</span>
      </ListItemLink>:null} */}

      {/* <ListItemLink to="/questions">
        <i class="fa fa-question-circle mr-2" aria-hidden="true"></i>
          <span>Questions</span>
        </ListItemLink> */}

     

      <ListItemLink to="/blogs">
        <i class="fas fa-blog mr-2"></i>
        <span>Blogs</span>
      </ListItemLink>

      <ListItemLink to="/faq">
        <i class="fa fa-question-circle mr-2" aria-hidden="true"></i>
        <span>FAQs</span>
      </ListItemLink>

      <ListItemLink to="/speciality">
      <i class="fa fa-building mr-2" aria-hidden="true"></i>
        <span>Speciality</span>
      </ListItemLink>


      {/*
      {urlAllow('currency') ? <>  
        <ListItemLink to="/currency">
          <i class="material-icons mr-2" title="Currency">currency_exchange</i>
          <span>Currency</span>
        </ListItemLink>
      </> : <></>} */}

      {/* <li className="nav-item">
        {urlAllow('bookingSystem') ? <>
          <a class={`col_side ${tabclass('api') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#apiIntegrations" role="button" aria-expanded="false" aria-controls="apiIntegrations">
            <div className="sidees">
              <i class="material-icons  mr-2" title="Catalogue">menu_book</i>
              <span >API Integrations</span>
            </div>

            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>

          </a>
        </> : <></>}
      </li> */}
      {/* 
      <div id="apiIntegrations" class={`collapse ${tabclass('api') ? 'show' : ''}`}>
        <div class="card card-body sides">
          {urlAllow('bookingSystem,reviews,accounting-system') ? <>
            <ListItemLink to="/bookingSystem">
              <i class="material-icons sidenv">book_online</i>
              <span>Booking System</span>
            </ListItemLink>
          </> : <></>}
          <ListItemLink to="/reviews" disabled>
            <i class="material-icons sidenv">book_online</i>
            <span>Reviews</span>
          </ListItemLink>
          <ListItemLink to="/accounting-system" disabled>
            <i class="material-icons sidenv">book_online</i>
            <span>Accounting System</span>
          </ListItemLink>
        </div>
      </div> */}

      {/* <li className="nav-item">
        {urlAllow('continents,countries,regions,cities') ? <>
          <a class={`col_side ${tabclass('geo') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#geoCollapse" role="button">
            <div className="sidees">
              <i class="material-icons mr-2" title="Catalogue">map</i>
              <span >Geo</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
        </> : <></>}
      </li> */}

      {/* <div id="geoCollapse" class={`collapse ${tabclass('geo') ? 'show' : ''}`}>
        <div class="card card-body sides">
          {urlAllow('continents') ? <>
            <ListItemLink to="/continents">
              <i class="fa fa-globe sidenv " aria-hidden="true"></i>
              <span>Continents</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('countries') ? <>
            <ListItemLink to="/countries">
              <i class="fa fa-globe sidenv" aria-hidden="true"></i>
              <span>Countries</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('regions') ? <>
            <ListItemLink to="/regions">
              <i class="material-icons sidenv">reduce_capacity</i>
              <span>Regions</span>
            </ListItemLink>
          </> : <></>}
          {urlAllow('cities') ? <>
            <ListItemLink to="/cities">
              <i class="material-icons sidenv">location_city</i>
              <span>Cities</span>
            </ListItemLink>
          </> : <></>}
        </div>
      </div> */}

      {/* <ListItemLink to={`/dynamicpricelist`}>
        <i class="material-icons mr-2" title="Dynamic Pricing">subscriptions</i>
        <span>Dynamic Pricing</span>
      </ListItemLink> */}

      {/* <ListItemLink to={`/crm`}>
        <i class="material-icons mr-2" title="Dynamic Pricing">subscriptions</i>
        <span>Contract Templates</span>
      </ListItemLink> */}

      {/* <li className="nav-item">
        {urlAllow('features,plans') ? <>
          <a class={`col_side ${tabclass('dynamicPricing') ? '' : 'collapsed'}`} onClick={e => route('/dynamicpricelist')} data-bs-toggle="collapse" href="#collapseExampledynamicPricing" role="button" aria-expanded="false" aria-controls="collapseExampledynamicPricing">
            <div className="sidees">
              <i class="material-icons mr-2" title="Dynamic Pricing" >subscriptions</i>
              <span >Dynamic Pricing</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
        </> : <></>}
      </li>

      <div class={`collapse ${tabclass('dynamicPricing') ? 'show' : ''}`} id="collapseExampledynamicPricing">
        <div class="card card-body sides">
          {urlAllow(`dynamicpricelist`) ? <>
            <ListItemLink to={`/dynamicpricelist`}>
              <i class="material-icons sidenv" title="Dynamic Pricing">subscriptions</i>
              <span>Dynamic Pricing</span>
            </ListItemLink>
          </> : <></>}
          {dynamicPriceModel.list.map(itm => {
            return <>
              {urlAllow(`dynamicprice/${itm.id}`) ? <>
                <ListItemLink to={`/dynamicprice/${itm.id}/add`} title={itm.name}>
                  <i class="material-icons sidenv" title={itm.name}>{itm.icon}</i>
                  <span className="text-truncate">{itm.name}</span>
                </ListItemLink>
              </> : <></>}
            </>
          })}
        </div>
      </div> */}

      {/* <li className="nav-item">
      <a class={`col_side ${tabclass('customer') ? '' : 'collapsed'}`} data-bs-toggle="collapse" href="#collapseExamplecustomer" role="button" aria-expanded="false" aria-controls="collapseExamplecustomer">
            <div className="sidees">
              <i class="material-icons mr-2" title="Dynamic Pricing" >subscriptions</i>
              <span >Customers</span>
            </div>
            <div>
              <span className="side_icon">
                <i class="material-icons">keyboard_arrow_right</i>
              </span>
            </div>
          </a>
      </li> */}

      {/* <div class={`collapse ${tabclass('customer') ? 'show' : ''}`} id="collapseExamplecustomer">
        <div class="card card-body sides">
          <ListItemLink to={`/customer`}>
            <i class="material-icons sidenv" title="Dynamic Pricing">subscriptions</i>
            <span>Customer Data</span>
          </ListItemLink>

        </div>
      </div> */}
      {/* 
      <ListItemLink to="/customer">
        <i class="material-icons mr-2" title="Currency">currency_exchange</i>
      
        <span>Customers</span>
      </ListItemLink> */}

      {/* {urlAllow('emailtemplate') ? <>
        <ListItemLink to="/emailtemplate">
          <i class="material-icons mr-2" title="Currency">currency_exchange</i>
       
          <span>Email Template</span>
        </ListItemLink>
      </> : <></>} */}
      {/* <ListItemLink to="/reseller">
        <i class="material-icons mr-2" title="Dynamic Pricing">subscriptions</i>
        <span>Reseller</span>
      </ListItemLink> */}
    </ul>
  );
};

export default Html;
