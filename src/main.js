/*
 * @file: index.js
 * @description: App Configration
 * @date: 3 April 2022
 * @author: Mohit
 * */

import React from 'react';
 
import { PersistGate } from 'redux-persist/es/integration/react';
import "react-datepicker/dist/react-datepicker.css";
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import configureStore from './config';
import { createBrowserHistory } from 'history';
import { Auth } from './methods/auth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import Profile from './pages/Profile'
import Roleslist from './pages/Roleslist'
import Settings from './pages/Settings';
import ContentManagement from './pages/ContentManagement';
import './scss/main.scss';
import "react-pagination-js/dist/styles.css"; // import css
import ContactDetails from './pages/Settings/ContactDetails';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Users from './pages/Users';
import AddEditUser from './pages/Users/AddEditUser';
import UserDetail from './pages/Users/Profiledetail';
// import Categories from './pages/Categories';
// import AddEditCategory from './pages/Categories/AddEdit';
// import CategoryDetail from './pages/Categories/Detail';
import ResellerCategories from './pages/ResellerCategories';
import ResellerCategoryDetail from './pages/ResellerCategories/Detail';
import AddEditResellerCategory from './pages/ResellerCategories/AddEdit';
import Employees from './pages/Employees';
import Roles from './pages/Roles';
import AddEditRole from './pages/Roles/AddEdit';
import AddEditContinent from './pages/Continents/AddEditContinent';
import Continent from './pages/Continents/index'
import Countriess from './pages/Countries';
import AddEditCountry from './pages/Countries/AddEditCountry';
import CountryDetail from './pages/Countries/Detail';
import Cities from './pages/CityPages';
import AddEditCity from './pages/CityPages/AddEditCity';
import CityDetail from './pages/CityPages/Detail';
import Plans from './pages/Plans';
import AddEditPlan from './pages/Plans/AddEdit';
import Features from './pages/Features';
import AddEditFeature from './pages/Features/AddEdit';
import Currency from './pages/CurrencyPages';
import AddEditCurrency from './pages/CurrencyPages/AddEditCurrency';
import CurrencyDetail from './pages/CurrencyPages/Detail';
import Coupons from './pages/Coupons';
import AddEditCoupon from './pages/Coupons/AddEdit';
import EmailTemplate from './pages/EmailTemplate';
import AddEditEmailTemplate from './pages/EmailTemplate/AddEdit';
import Regions from './pages/Regions';
import AddEditRegion from './pages/Regions/AddEdit';
import BookingSystem from './pages/BookingSystem';
import AddEditBookingSystem from './pages/BookingSystem/AddEdit';
import Types from './pages/CategoriesType';
import AddEditTypes from './pages/CategoriesType/AddEdit';
import ApplyCurrency from './pages/CurrencyPages/Applycurrencys';
import POS from './pages/POS';
import AddEditPOS from './pages/POS/AddEdit';
import Orders from './pages/POS/Orders/Orders';
import Holiday from './pages/Holiday';
import AddEditPrice from './pages/DynamicPrice/AddEdit';
import DynamicPrice from './pages/DynamicPrice';
import AddEditEarlyBirdPricing from './pages/DynamicPrice/Early/AddEdit';
import AddEditEarlyBirdTimeFrames from './pages/DynamicPrice/TimeFrames/AddEdit';
import AddEditEarlyBirdInventory from './pages/DynamicPrice/Inventory/AddEdit';
// import AddEditProductCategory from './pages/Categories/ProductCategory/AddEdit';
// import productCategory from './pages/Categories/ProductCategory/Product';
import AddEditLastMinuteFixedDates from './pages/DynamicPrice/LastMinuteFixedDates/AddEdit';
import AddEditLastMinuteInventory from './pages/DynamicPrice/LastMinuteInventory/AddEdit';
import Customer from "./pages/Customers";
import ViewCustomer from "./pages/Customers/Profiledetail";
import Reseller from './pages/ResellerPages';
import AddEditReseller from './pages/ResellerPages/AddEditReseller';
import CRM from "./pages/CRM";
import AddEditCRM from "./pages/CRM/AddEdit";
import AddEditSkills from './pages/SkillsPages/AddEditSkills';
import Skills from './pages/SkillsPages';
import Industry from './pages/Industry';
import AddEditIndustry from './pages/Industry/AddEditIndustry';
import { ToastContainer } from 'react-toastify';
import AddEditSubSkills from './pages/SubSkillsPages/AddEditSubSkills';
import SubSkills from './pages/SubSkillsPages';
import Assessments from './pages/Assessment';

import QuestionsLists from './pages/Questions';
;
import AddEditquestion from './pages/Questions/AddEditQuestion';
// import AddEditAssessments from './pages/Assessment/AddEditAssessment ';
import Category from './pages/Blogs';
import Blogs from './pages/Blogs';
import AddEditBlog from './pages/Blogs/AddEditBlogs';
import Faq from './pages/Faq';
import AddEditFaq from './pages/Faq/AddEditFaq';
import AddEditcategory from './pages/category/AddEditcategory';
import CategoryList from './pages/category';
import Categorydetail from './pages/category/categorydetail';
import BlogDetail from './pages/Blogs/Detail';
import FaqDetail from './pages/Faq/Detail';
import Projects from './pages/ProjectManagement';
import Technology from './pages/TechnoLogyPages';
import AddEdittechnology from './pages/TechnoLogyPages/AddEditTechnology';
import Speciality from './pages/Speciality';
import AddEditSpeciality from './pages/Speciality/AddEditSpeciality';
import SpecialityDetail from './pages/Speciality/Detail';
import AddEditAssessments from './pages/Assessment/AddEditAssessment';



export const history = createBrowserHistory();
/************ store configration *********/
const { persistor, store } = configureStore(history);

export default () => {

    return (<>
        <Provider store={store}>
            <PersistGate loading={'loading ...'} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Router>
                        <Switch>
                            <Route exact={true} path="/dashboard" store={store} requireAuth={Auth} component={Dashboard} />
                            <Route exact={true} path="/employees" store={store} requireAuth={Auth} component={Employees} />
                            <Route exact={true} path="/dashboardpage" store={store} requireAuth={Auth} component={DashboardPage} />
                            <Route exact={true} path="/settings/appointment/contact-details" store={store} requireAuth={Auth} component={ContactDetails} />
                            <Route exact={true} path="/rolelist" store={store} requireAuth={Auth} component={Roleslist} />
                            <Route exact={true} path="/pos" store={store} requireAuth={Auth} component={POS} />
                            <Route exact={true} path="/pos/orders" store={store} requireAuth={Auth} component={Orders} />
                            <Route exact={true} path="/pos/add" store={store} requireAuth={Auth} component={AddEditPOS} />
                            <Route exact={true} path="/pos/edit/:id" store={store} requireAuth={Auth} component={AddEditPOS} />
                            <Route exact={true} path="/users" store={store} requireAuth={Auth} component={Users} />
                            <Route exact={true} path="/customer" store={store} requireAuth={Auth} component={Customer} />
                            <Route exact={true} path="/customer/add" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/customer/edit/:id" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/customer/view/:id" store={store} requireAuth={Auth} component={ViewCustomer} />

                            <Route exact={true} path="/industry" store={store} requireAuth={Auth} component={Industry} />
                            <Route exact={true} path="/industry/add" store={store} requireAuth={Auth} component={AddEditIndustry} />
                            <Route exact={true} path="/industry/:role" store={store} requireAuth={Auth} component={Industry} />
                            <Route exact={true} path="/industry/edit/:id" store={store} requireAuth={Auth} component={AddEditIndustry} />
                            <Route exact={true} path="/industry/:role/add" store={store} requireAuth={Auth} component={AddEditIndustry} />
                            <Route exact={true} path="/industry/:role/edit/:id" store={store} requireAuth={Auth} component={AddEditIndustry} />
                            {/* <Route exact={true} path="/industryDetail/:id" store={store} requireAuth={Auth} component={IndustryDetail} /> */}

                        
                            
                            <Route exact={true} path="/roles" store={store} requireAuth={Auth} component={Roles} />
                            <Route exact={true} path="/roles/add" store={store} requireAuth={Auth} component={AddEditRole} />
                            <Route exact={true} path="/roles/edit/:id" store={store} requireAuth={Auth} component={AddEditRole} />
                            <Route exact={true} path="/users/add" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/users/:role" store={store} requireAuth={Auth} component={Users} />
                            <Route exact={true} path="/users/edit/:id" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/users/:role/add" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/users/:role/edit/:id" store={store} requireAuth={Auth} component={AddEditUser} />
                            <Route exact={true} path="/userDetail/:id" store={store} requireAuth={Auth} component={UserDetail} />
                            {/* <Route exact={true} path="/categories" store={store} requireAuth={Auth} component={Categories} />
                            <Route exact={true} path="/categories/add" store={store} requireAuth={Auth} component={AddEditCategory} />
                            <Route exact={true} path="/categories/edit/:id" store={store} requireAuth={Auth} component={AddEditCategory} />
                            <Route exact={true} path="/category/:type" store={store} requireAuth={Auth} component={Categories} />
                            <Route exact={true} path="/category/:type/add" store={store} requireAuth={Auth} component={AddEditCategory} />
                            <Route exact={true} path="/category/product/:type" store={store} requireAuth={Auth} component={productCategory} />
                            <Route exact={true} path="/category/product/:type/add" store={store} requireAuth={Auth} component={AddEditProductCategory} />
                            <Route exact={true} path="/category/product/:type/edit/:id" store={store} requireAuth={Auth} component={AddEditProductCategory} />
                            <Route exact={true} path="/category/:type/edit/:id" store={store} requireAuth={Auth} component={AddEditCategory} /> */}
                            <Route exact={true} path="/reseller-categories" store={store} requireAuth={Auth} component={ResellerCategories} />
                            <Route exact={true} path="/reseller-categories/add" store={store} requireAuth={Auth} component={AddEditResellerCategory} />
                            <Route exact={true} path="/reseller-categories/edit/:id" store={store} requireAuth={Auth} component={AddEditResellerCategory} />
                            <Route exact={true} path="/reseller-categories/detail/:id" store={store} requireAuth={Auth} component={ResellerCategoryDetail} />
                            {/* <Route exact={true} path="/categoryDetail/:id" store={store} requireAuth={Auth} component={CategoryDetail} /> */}
                            <Route exact={true} path="/content" store={store} requireAuth={Auth} component={ContentManagement} />
                            <Route exact={true} path="/profile" store={store} requireAuth={Auth} component={Profile} />
                            <Route exact={true} path="/profile/:tab" store={store} requireAuth={Auth} component={Settings} />
                            <Route exact={true} path="/login" store={store} requireAuth={Auth} component={Login} />
                            <Route exact={true} path="/forgotpassword" store={store} requireAuth={Auth} component={Forgotpassword} />
                            <Route exact={true} path="/resetpassword" store={store} requireAuth={Auth} component={Resetpassword} />
                            {/* Categories Type */}
                            <Route exact={true} path="/types" store={store} requireAuth={Auth} component={Types} />
                            <Route exact={true} path="/types/add" store={store} requireAuth={Auth} component={AddEditTypes} />
                            <Route exact={true} path="/types/edit/:id" store={store} requireAuth={Auth} component={AddEditTypes} />
                            {/* Feature */}
                            <Route exact={true} path="/features" store={store} requireAuth={Auth} component={Features} />
                            <Route exact={true} path="/features/add" store={store} requireAuth={Auth} component={AddEditFeature} />
                            <Route exact={true} path="/features/edit/:id" store={store} requireAuth={Auth} component={AddEditFeature} />
                            {/* Continents */}
                            <Route exact={true} path="/continents" store={store} requireAuth={Auth} component={Continent} />
                            <Route exact={true} path="/continents/add" store={store} requireAuth={Auth} component={AddEditContinent} />
                            <Route exact={true} path="/continents/edit/:id" store={store} requireAuth={Auth} component={AddEditContinent} />
                            {/* Plans */}
                            <Route exact={true} path="/plans" store={store} requireAuth={Auth} component={Plans} />
                            <Route exact={true} path="/plans/add" store={store} requireAuth={Auth} component={AddEditPlan} />
                            <Route exact={true} path="/plans/edit/:id/:copy" store={store} requireAuth={Auth} component={AddEditPlan} />
                            {/* Booking System */}
                            <Route exact={true} path="/bookingSystem" store={store} requireAuth={Auth} component={BookingSystem} />
                            <Route exact={true} path="/bookingSystem/add" store={store} requireAuth={Auth} component={AddEditBookingSystem} />
                            <Route exact={true} path="/bookingSystem/edit/:id" store={store} requireAuth={Auth} component={AddEditBookingSystem} />
                            {/* Coupon */}
                            <Route exact={true} path="/coupon" store={store} requireAuth={Auth} component={Coupons} />
                            <Route exact={true} path="/coupon/add" store={store} requireAuth={Auth} component={AddEditCoupon} />
                            <Route exact={true} path="/coupon/edit/:id" store={store} requireAuth={Auth} component={AddEditCoupon} />
                            {/* Country */}
                            <Route exact={true} path="/countries" store={store} requireAuth={Auth} component={Countriess} />
                            <Route exact={true} path="/countries/add" store={store} requireAuth={Auth} component={AddEditCountry} />
                            <Route exact={true} path="/countries/edit/:id" store={store} requireAuth={Auth} component={AddEditCountry} />
                            <Route exact={true} path="/countries/:id" store={store} requireAuth={Auth} component={CountryDetail} />
                            {/* Region */}
                            <Route exact={true} path="/regions" store={store} requireAuth={Auth} component={Regions} />
                            <Route exact={true} path="/regions/add" store={store} requireAuth={Auth} component={AddEditRegion} />
                            <Route exact={true} path="/regions/edit/:id" store={store} requireAuth={Auth} component={AddEditRegion} />
                            {/* City */}
                            <Route exact={true} path="/cities" store={store} requireAuth={Auth} component={Cities} />
                            <Route exact={true} path="/cities/add" store={store} requireAuth={Auth} component={AddEditCity} />
                            <Route exact={true} path="/cities/edit/:id" store={store} requireAuth={Auth} component={AddEditCity} />
                            <Route exact={true} path="/cities/:id" store={store} requireAuth={Auth} component={CityDetail} />
                            {/* Currency */}
                            <Route exact={true} path="/currency" store={store} requireAuth={Auth} component={Currency} />
                            <Route exact={true} path="/currency/add" store={store} requireAuth={Auth} component={AddEditCurrency} />
                            <Route exact={true} path="/currency/edit/:id" store={store} requireAuth={Auth} component={AddEditCurrency} />
                            <Route exact={true} path="/currency/:id" store={store} requireAuth={Auth} component={CurrencyDetail} />
                            {/* Apply Currency */}
                            <Route exact={true} path="/applycurrency" store={store} requireAuth={Auth} component={ApplyCurrency} />
                            {/* Holiday */}
                            <Route exact={true} path="/holiday" store={store} requireAuth={Auth} component={Holiday} />
                            {/* Last Minute Pricing */}
                            <Route exact={true} path="/dynamicprice/lastminutefixeddates/add" requireAuth={Auth} component={AddEditLastMinuteFixedDates} />
                            <Route exact={true} path="/dynamicprice/lastminutefixeddates/edit/:id/:copy" requireAuth={Auth} component={AddEditLastMinuteFixedDates} />
                            <Route exact={true} path="/dynamicprice/lastminuteinventory/add" requireAuth={Auth} component={AddEditLastMinuteInventory} />
                            <Route exact={true} path="/dynamicprice/lastminuteinventory/edit/:id/:copy" requireAuth={Auth} component={AddEditLastMinuteInventory} />
                            {/* Early Bird Pricing */}
                            <Route exact={true} path="/dynamicprice/earlybirdcustomdates/add" requireAuth={Auth} component={AddEditEarlyBirdPricing} />
                            <Route exact={true} path="/dynamicprice/earlybirdcustomdates/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdPricing} />
                            <Route exact={true} path="/dynamicprice/earlybirdtimeframes/add" requireAuth={Auth} component={AddEditEarlyBirdTimeFrames} />
                            <Route exact={true} path="/dynamicprice/earlybirdtimeframes/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdTimeFrames} />
                            <Route exact={true} path="/dynamicprice/earlybirdinventory/add" requireAuth={Auth} component={AddEditEarlyBirdInventory} />
                            <Route exact={true} path="/dynamicprice/earlybirdinventory/edit/:id/:copy" requireAuth={Auth} component={AddEditEarlyBirdInventory} />
                            {/* Dynamic Price */}
                            <Route exact={true} path="/dynamicpricelist" store={store} requireAuth={Auth} component={DynamicPrice} />
                            <Route exact={true} path="/dynamicprice/add" store={store} requireAuth={Auth} component={AddEditPrice} />
                            <Route exact={true} path="/dynamicprice/:type" store={store} requireAuth={Auth} component={DynamicPrice} />
                            <Route exact={true} path="/dynamicprice/:type/add" store={store} requireAuth={Auth} component={AddEditPrice} />
                            <Route exact={true} path="/dynamicprice/:type/edit/:id/:copy" store={store} requireAuth={Auth} component={AddEditPrice} />

                            <Route exact={true} path="/crm" store={store} requireAuth={Auth} component={CRM} />
                            <Route exact={true} path="/crm/add" store={store} requireAuth={Auth} component={AddEditCRM} />
                            <Route exact={true} path="/crm/edit/:id" store={store} requireAuth={Auth} component={AddEditCRM} />

                            {/* Email Template */}
                            <Route exact={true} path="/emailtemplate" store={store} requireAuth={Auth} component={EmailTemplate}/>
                            <Route exact={true} path="/emailtemplate/add" store={store} requireAuth={Auth} component={AddEditEmailTemplate} />
                            <Route exact={true} path="/emailtemplate/edit/:id" store={store} requireAuth={Auth} component={AddEditEmailTemplate} />

                            {/*  For Reseller  */}
                            <Route exact={true} path="/reseller" store={store} requireAuth={Auth} component={Reseller}/>
                            <Route exact={true} path="/reseller/addedit/:id?" store={store} requireAuth={Auth} component={AddEditReseller}/>
                            {/*  Routes for Skills  */}
                            <Route exact={true} path="/addeditskill/:id?" requireAuth={Auth} store={store} component={AddEditSkills}/> 
                            <Route exact={true} path="/skills" requireAuth={Auth} store={store} component={Skills}/>
                            {/* ###### Routes for Master Skills############## */}
                            <Route exact={true} path="/masterskils" requireAuth={Auth} store={store} component={SubSkills}/>
                            <Route exact={true} path="/addeditmasterskils/:id?" requireAuth={Auth} store={store} component={AddEditSubSkills}/>

                          
                    
                            <Route exact={true} path="/assessment" store={store} requireAuth={Auth} component={Assessments} />
                            <Route exact={true} path="/AddEditAssessment" requireAuth={Auth} store={store} component={AddEditAssessments}/>
                            <Route exact={true} path="/AddEditAssessment/:id?" requireAuth={Auth} store={store} component={AddEditAssessments}/>

                             {/* <Route exact={true} path="/category" store={store} requireAuth={Auth} component={Category} />
                            <Route exact={true} path="/AddEditCategory" requireAuth={Auth} store={store} component={AddEditcategory}/>
                            <Route exact={true} path="/AddEditCategory/:id?" requireAuth={Auth} store={store} component={AddEditcategory}/>  */}

                            <Route exact={true} path="/questions/:id?" store={store} requireAuth={Auth} component={QuestionsLists} />
                            <Route exact={true} path="/AddEditquestions" requireAuth={Auth} store={store} component={AddEditquestion}/>
                            <Route exact={true} path="/AddEditquestions/:id?" requireAuth={Auth} store={store} component={AddEditquestion}/>

                            <Route exact={true} path="/blogs" store={store} requireAuth={Auth} component={Blogs} />
                            <Route exact={true} path="/AddEditBlogs" requireAuth={Auth} store={store} component={AddEditBlog}/>
                            <Route exact={true} path="/AddEditBlogs/:id?" requireAuth={Auth} store={store} component={AddEditBlog}/>
                            <Route exact={true} path="/blogsDetails/:id?" requireAuth={Auth} store={store} component={BlogDetail}/>


                            <Route exact={true} path="/faq" store={store} requireAuth={Auth} component={Faq} />
                            <Route exact={true} path="/AddEditfaq" requireAuth={Auth} store={store} component={AddEditFaq}/>
                            <Route exact={true} path="/AddEditfaq/:id?" requireAuth={Auth} store={store} component={AddEditFaq}/>
                            <Route exact={true} path="/faqDetails/:id?" requireAuth={Auth} store={store} component={FaqDetail}/>

                            <Route exact={true} path="/speciality" store={store} requireAuth={Auth} component={Speciality} />
                            <Route exact={true} path="/AddEditspeciality" requireAuth={Auth} store={store} component={AddEditSpeciality}/>
                            <Route exact={true} path="/AddEditspeciality/:id?" requireAuth={Auth} store={store} component={AddEditSpeciality}/>
                            <Route exact={true} path="/specialityDetails/:id?" requireAuth={Auth} store={store} component={SpecialityDetail}/>

                            <Route exact={true} path="/categorylist" store={store} requireAuth={Auth} component={CategoryList} />
                            <Route exact={true} path="/AddEditcategory" requireAuth={Auth} store={store} component={AddEditcategory}/>
                            <Route exact={true} path="/AddEditcategory/:id?" requireAuth={Auth} store={store} component={AddEditcategory}/>
                            <Route exact={true} path="/categorydetail/:id?" requireAuth={Auth} store={store} component={Categorydetail}/>
                            {/* Routes for Project Management */}
                            <Route exact={true} path="/projects" requireAuth={Auth} store={store} component={Projects}/>

                            {/* Routes for Technology  */}
                            <Route exact={true} path="/technologies" requireAuth={Auth} store={store} component={Technology}/>
                            <Route exact={true} path="/technology/:id?" requireAuth={Auth} store={store} component={AddEdittechnology}/>


                            <Route exact path="/">
                                <Redirect to="/login" />
                            </Route>
                        </Switch>
                    </Router>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
        <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
        <ToastContainer position='top-right'/>
    </>
    );
};
