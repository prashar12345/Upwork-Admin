import React from 'react';
import './style.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Html from './Html';
import permissionModel from '../../../models/permisstion.model';
import environment from '../../../environment';

const Sidebar = () => {
  const user = useSelector(state => state.user)
  const history = useHistory()
  const menus={
    user:['roles','users'],
    category:['masterskils','skills','industry'],
    plan:['features','plans'],
    api:['bookingSystem','pos','reviews','accounting-system'],
    geo:['continents','countries','regions','cities'],
    dynamicPricing:['dynamicprice'],
    customer:['customer']
  }

  const ListItemLink = ({ to, type = 'link',disabled=false, ...rest }) => {
    let url = location.href
    const host = location.host
    url = url.split(host)[1]
    return (<>
      {type == 'link' ? <li className={`nav-item ${url.includes(to) ? 'active' : ''} ${disabled?'disabled':''}`}>
        {/* {...rest} */}
        <Link to={to} {...rest} className="nav-link hoverclass" />
      </li> : <li className={`nav-item main ${url.includes(to) ? 'active' : ''}`} {...rest}></li>}
    </>
    );
  };

  const tabclass=(tab)=>{
    let url = location.href
    let value=false
    menus[tab].map(itm=>{
      if(url.includes(itm)) value=true
    })
    return value
  }

  const urlAllow=(url)=>{
    let permissions=user.role?.permissions 
    let value = false
    if(user?.role?.id==environment.adminRoleId){value=true}else{
  if(permissions) {  Object.keys(permissions).map((item)=>{
      if(item==url){ 
         value= permissions[item]
      }
    })}
  } 
    // if(user.role.id=environment.adminRoleId){value=true}
    // else{
    // arr.map(itm=>{
    //   if(permissionModel.urlAllow(permissions,itm)) value=true
    // })
    // }
    // alert(value)
    return value 
  }

  const route=(p)=>{
    history.push(p)
  }

  return <>
  <Html
  route={route}
  tabclass={tabclass}
  urlAllow={urlAllow}
  ListItemLink={ListItemLink}
  />
  </>
};

export default Sidebar;
