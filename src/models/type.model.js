export const userType={ id:'',fullName: '',role:'', email: '', mobileNo: '', dialCode: '',aboutUs:'',address:'',image:'',logo:''}
export const AssessmentsType={ id:'',name: "" ,passingScrore:0,weightagePerQuestion:0,skillType:""}
export const Category={id:'',name:'',catType:'',subParentCategory:'',description:'',image:'',order:'',parentCategory:'',status:'active',icon:'',banner:'',altImageName:'',altIconName:'',bannerOverlayHeading:'',bannerOverlayBody:'',description:'',featured:'No',urlKey:'',metaTitle:'',metaDescription:'',keywords:''}
export const CategoryType={id:'',name:'',cat_type:'',image:'',status:'active',}
export const roleType={id:'',name:'',loginPannel:"",status:'active',permissions:{
    //  Done
    readDashboard:false,
    readContent:false,
    editContent:false,
    readAssessment:false,
    addAssessment:false,
    editAssessment:false,
     deleteAssessment:false,
     addQuestion:false,
     editQuestion:false,
     readQuestion:false,
     deleteQuestion:false,

    

    // readCustomer:false,
    // addCustomer:false,
    // editCustomer:false,
    // deleteCustomer:false,
    readRole:false,
    addRole:false,
    editRole:false,
    deleteRole:false,
    readSkillType:false,
    addSkillType:false,
    editSkillType:false,
    deleteSkillType:false,
    // Done
    // readCategory:false,
    // addCategory:false,
    // editCategory:false,
    // deleteCategory:false,
    // readResellerCategory:false,
    // addResellerCategory:false,
    // editResellerCategory:false,
    // deleteResellerCategory:false,
    readAdmins:false,
    addAdmins:false,
    editAdmins:false,
    deleteAdmins:false,
    readTypes:false,
    addTypes:false,
    editTypes:false,
    deleteTypes:false,
    readSkills:false,
    addSkills:false,
    editSkills:false,
    deleteSkills:false,
    // readCategory:false,
    // addCategory:false,
    // editCategory:false,
    // deleteCategory:false,
    // readResellerCategory:false,
    // addResellerCategory:false,
    // editResellerCategory:false,
    // deleteResellerCategory:false,
    // readPlanFeatures:false,
    // addPlanFeatures:false,
    // editPlanFeatures:false,
    // deletePlanFeatures:false,
    // readPlan:false,
    // addPlan:false,
    // editPlan:false,
    // deletePlan:false,
    // readCoupons:false,
    // addCoupons:false,
    // editCoupons:false,
    // deleteCoupons:false,
    // readCurrency:false,
    // addCurrency:false,
    // editCurrency:false,
    // deleteCurrency:false,
    // readBooking:false,
    // addBooking:false,
    // editBooking:false,
    // deleteBooking:false,
    // refreshBooking:false,
    // readContinents:false,
    // addContinents:false,
    // editContinents:false,
    // deleteContinents:false,
    // readCountries:false,
    // addCountries:false,
    // editCountries:false,
    // deleteCountries:false,
    // readRegion:false,
    // addRegion:false,
    // editRegion:false,
    // deleteRegion:false,
    // readCities:false,
    // addCities:false,
    // editCities:false,
    // deleteCities:false,
    // readEmailTemplate:false,
    // addEmailTemplate:false,
    // editEmailTemplate:false,
    
}}
export const resellerCategoryType={id:'',name:'',catType:'Reseller',description:'',image:''}
export const planType={id:'',name:'',price:'',status:'active',interval:'Monthly',category:'',recommended:'',allowedProducts:'',feature:[]}
export const continentType={id:'',name:'',status:'active'}
export const featureType={id:'',name:'',description:'',status:'active'}
export const emailType={id:'',subject:'',content:'',status:'active'}
export const cityType={id:'',name:'',status:'active',countryId:'',regionId:'',continent:''}
export const bookingSystemType={id:'',name:'',apiKey:'',secretKey:''}
export const holidaysType={id:'',discOrPre:'',name:'',type:'',country:'',counties:'',amountOrPercent:'',number:'',applyFor:[],preOrPost:'',preDays:'',postDays:'',changesApply:'',changesDate:'',changesDateTo:''}
export const earlybirdpricingType={id:'',name:'',discOrPre:'',startDate:'',country:'',counties:'',applyEarlyBirdPricing:[],endDate:'',inventory:[],lastMinutePricingFromDate:'',lastMinutePricingToDate:'',applyPriceType:'',changesDate:'',changesDateTo:'',notApply:'',notApplyCondition:'',notApplicableFor:[],blackOutDates:[],amountOrPercent:'',number:'',applyToDaysTimeSlot:'',daysToApply:[],timeSlots:[]}
export const posType={id:'',name:'',apiKey:'',url:''}
export const crmType={id:'',name:'',image:'',content:''}
export const resellerType={id:'',name:"",logo:"",category:"",contractDate:"",booking:"",pax:"",country:'',contactPerson:'',contactPhone:'',contactEmail:''}
export const couponType={id:'',title:'',status:'active',description:'',couponCode:'',usesPerCoupon:'',usesPerCustomer:'',dateFrom:'',dateTo:'',discountType:'',discountAmount:'',}