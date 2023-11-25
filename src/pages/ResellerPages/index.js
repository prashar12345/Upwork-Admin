import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'; 
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader'; 
import Html from './Html.jsx'; 
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ApiClient from '../../methods/api/apiClient';
import environment from '../../environment';

const Reseller = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '' })
    const [dargIndex, setDragIndex] = useState(-1)
    const [dargEnterIndex, setDargEnterIndex] = useState(-1)
    const [data, setData] = useState([]) 
    const [tab,setTab]=useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])  
    const history=useHistory()
   
 

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 }) 
        }
    }, [searchState])


  
    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        ApiClient.get('api/reseller/listing',filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm=>{
                    itm.id=itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
        })
    }


    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const filter = (p={}) => {
        setFilter({ ...filters, page: 1,...p })
        getData({ page: 1,...p })
    }

    const reset = () => {
        let p={
            interval:'',
            currencyId:''
        }
        setFilter({ ...filters, page: 1,...p })
        getData({ page: 1,...p })
    }
    

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/reseller/delete', {id: id }).then(res => {
                if (res.success) {
                    ToastsStore.success(res.message)
                    clear()
                }
                loader(false)
            })
        }
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    } 
   
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    
    const exportCsv = () => {
        loader(true)
        ApiClient.get('user/csv').then(res => {
            if (res.success) {
                let url = res.path
                let downloadAnchor = document.getElementById("downloadJS")
                downloadAnchor.href = url
                downloadAnchor.click()
            }
            loader(false)
        })
    }
 

    const statusChange=(itm)=>{
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this`)){
            loader(true)
            ApiClient.put(`api/reseller/status/change`,{id:itm.id,status}).then(res=>{
                if(res.success){
                    getData()
                }
                loader(false)
            })
        }
    }

    const view=(id)=>{
        history.push("//"+id)
    }

    const edit=(id,copy)=>{
        history.push(`/reseller/addedit/${id}`)
    }

    const tabChange=(tab)=>{
        setTab(tab)
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/reseller/excel`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Plans.xlsx`;
          link.click();
    }


    const showData=()=>{
        let value=data
        if(dragItems && dragItems.current) value=dragItems.current
        return value
    }

    const isAllow = (key = '') => {
        let permissions = user.role?.permissions[0]
        let value = permissions?.[key]
        if (user.role.id == environment.adminRoleId) value = true
        return value
    }

    return <><Html
    view={view} 
    edit={edit}
    isAllow={isAllow}
    filter={filter} 
        tabChange={tabChange}
        tab={tab}
        reset={reset}  
        ChangeStatus={ChangeStatus} 
        pageChange={pageChange} 
        deleteItem={deleteItem}
        exportCsv={exportCsv}  
        filters={filters} 
        loaging={loaging}
        data={data}
        total={total} 
        statusChange={statusChange}
        exportfun={exportfun} 
        showData={showData}  
    />
    </>;
};

export default Reseller;

