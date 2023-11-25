import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model'; 
import Html from './html'; 
import { useHistory } from 'react-router-dom';
import { search_success } from '../../actions/search';
import environment from '../../environment';
import axios from 'axios';

const Countriess = (p) => {
    const dispatch = useDispatch()
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', currencyId: '', continentId: '' })
    const [data, setData] = useState([])
    const [tab,setTab]=useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState() 
    const history=useHistory()
    const [CurrencyData, setCurrencyData] = useState([])
    const [ContinentData, setContinentData] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 1; i++) {
            cols.push(userTableModel.Country[i])
        }
        setTableCols(cols)
        GetCurrencies()
        GetContinent()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
        setSearch(searchState.data)
    }, [searchState])

    const uTableCols = () => {
        let exp = []
        if (tableCols) exp = tableCols
        let value = []
        userTableModel.relellerCategory.map(itm => {
            if (itm != exp.find(it => it.key == itm.key)) {
                value.push(itm)
            }
        })
        return value
    }

    const addCol = (itm) => {
        setTableCols([...tableCols, itm])
    }


    const removeCol = (index) => {
        let exp = tableCols
        exp.splice(index, 1);
        setTableCols([...exp])
    }

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        // APi for Getting Countriess
        ApiClient.get('api/country/listing', filter).then(res => {
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

    const filter = (p={}) => {
        setFilter({ ...filters, page: 1,...p })
        getData({ page: 1,...p })
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/country/delete', {id: id }).then(res => {
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

    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData({ page: 1 })
    }

    const modalResult=(e)=>{
        console.log("modalResult",e)
        modalClosed()
    }

    const openModal = (itm) => {
        let extra=new Date().getTime()
        setform({...itm,extra})
        document.getElementById("openuserModal").click()
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

    const colClick = (col, itm) => {
        if (col.key == 'healthClinicId') {
        }
    }

    const statusChange=(itm)=>{ 
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this`)){
            loader(true)
            // Status Change APi For Country
            ApiClient.put(`api/country/status/change`,{id:itm.id,status}).then(res=>{
                if(res.success){
                    getData()
                }
                loader(false)
            })
        }
    }

    const view=(id)=>{
        history.push("/countries/"+id)
    }

    const edit=(id)=>{
        history.push(`/countries/edit/${id}`)
    }

    const tabChange=(tab)=>{
        setTab(tab)
    }

    const GetCurrencies=()=>{
        ApiClient.get(`api/currency/listing`).then(res=>{
            setCurrencyData(res.data)
        })
    }

    const GetContinent=()=>{
        ApiClient.get(`api/continent/listing`).then(res=>{
            setContinentData(res.data)
        })
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/country/excel`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Countries.xlsx`;
          link.click();
    }
    const reset=()=>{
        let filter={
            page: 1, count: 50, search: '', currencyId: '', continentId: ''
        }
        setFilter({ ...filters, ...filter})
        getData({ ...filter })
        setSearch('')
        dispatch(search_success(''))
    }

    const isAllow = (key = '') => {
        let permissions = user.role?.permissions[0]
        let value = permissions?.[key]
        if (user.role.id == environment.adminRoleId) value = true
        return value
    }

    return <><Html
    tabChange={tabChange}
    tab={tab}
    edit={edit}
    view={view}
    isAllow={isAllow}
        colClick={colClick} 
        exportfun={exportfun}
        openModal={openModal}
        pageChange={pageChange}
        ChangeStatus={ChangeStatus}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        filter={filter}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        CurrencyData={CurrencyData}
        ContinentData={ContinentData}
        search={search}
        reset={reset}
    />
    </>;
};

export default Countriess;
