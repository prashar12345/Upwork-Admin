

let host = document.location.host;
let apiUrl ='http://portal.jcsoftwaresolution.in:6040/'
if(host.includes('localhost')){
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}else if(host.includes('stage.dazhboards.com/')){
  apiUrl='https://endpoint.jcsoftwaresolution.com/'
}else if(host.includes('jcsoftwaresolution.com')){
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}else{
  apiUrl='http://portal.jcsoftwaresolution.in:6040/'
}
const environment = {
    api: apiUrl,
    map_api_key:'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
    planTypeId:'64ad2ebce5aa778d26a54f02',
    userRoleId:'64b15102b14de6c28838f7d2',
    adminRoleId:'64b6af9ed91c0152642aa581',
    resellerTypeId:'64b23b7d690d1d5f7ae76102',
    productTypeId:'64a7d198fa039f179c0320ca'
  };
  export default environment;
