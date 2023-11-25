import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import Html from './html';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';

const Cities = (p) => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', regionId: '', countryId: '', continentId: '' })
    const [data, setData] = useState([])
    const [tab, setTab] = useState('list')
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [form, setform] = useState()
    const history = useHistory()
    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 1; i++) {
            cols.push(userTableModel.Country[i])
        }
        GetRegionData()
        GetCountryData()
        GetContinentData()
        setTableCols(cols)
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })

        }
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
        // APi for Getting Cities
        ApiClient.get('api/city/listing', filter).then(res => {
            if (res.success) {
                setData(res.data.map(itm => {
                    itm.id = itm._id
                    return itm
                }))
                setTotal(res.total)
            }
            setLoader(false)
        })
    }


    //  Get the Region Data
    const [regiondata, setregiondata] = useState([])
    const GetRegionData = () => {
        ApiClient.get(`api/region/listing`, { status: 'active', count: 500 }).then(res => {
            if (res.success == true) {
                setregiondata(res.data)
            }
        })
    }

    const [countrydata, setcountrydata] = useState([]);
    const GetCountryData = () => {
        ApiClient.get(`api/country/listing`, { status: 'active', count: 500 }).then(res => {
            if (res.success == true) {
                setcountrydata(res.data)
            }
        })
    }

    const [continentdata, setcontinentdata] = useState([]);
    const GetContinentData = () => {
        ApiClient.get(`api/continent/listing`, { status: 'active', count: 500 }).then(res => {
            if (res.success == true) {
                setcontinentdata(res.data);
            }
        })
    }

    const clear = () => {
        setFilter({ ...filters, search: '', page: 1 })
        getData({ search: '', page: 1 })
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/city/delete', { id: id }).then(res => {
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

    const modalResult = (e) => {
        console.log("modalResult", e)
        modalClosed()
    }

    const openModal = (itm) => {
        let extra = new Date().getTime()
        setform({ ...itm, extra })
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

    const statusChange = (itm) => {
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            // Status Change APi For Country
            ApiClient.put(`api/city/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    getData()
                }
                loader(false)
            })
        }
    }

    const view = (id) => {
        history.push("/citydetail/" + id)
    }

    const edit = (id) => {
        history.push(`/cities/edit/${id}`)
    }
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getData({ status: e, page: 1 })
    }
    const tabChange = (tab) => {
        setTab(tab)
    }

    const filter = (p = {}) => {
        setFilter({ ...filters, page: 1, ...p })
        getData({ page: 1, ...p })
    }
    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/export/city/excel`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Cities.xlsx`;
          link.click();
    }
    const reset = () => {
        let p = {
            regionId: '',
            countryId: '',
            continentId:''
        }
        setFilter({ ...filters, page: 1, ...p })
        getData({ page: 1, ...p })
    }

    const isAllow=(key='')=>{
        let permissions=user.role?.permissions[0]
        let value=permissions?.[key]
        if(user.role.id==environment.adminRoleId) value=true
        return value
    }

    return <><Html
        tabChange={tabChange}
        regiondata={regiondata}
        tab={tab}
        continentdata={continentdata}
        countrydata={countrydata}
        ChangeStatus={ChangeStatus}
        filter={filter}
        reset={reset}
        edit={edit}
        view={view}
        exportfun={exportfun}
        colClick={colClick}
        openModal={openModal}
        pageChange={pageChange}
        addCol={addCol}
        deleteItem={deleteItem}
        exportCsv={exportCsv}
        uTableCols={uTableCols}
        removeCol={removeCol}
        filters={filters}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        statusChange={statusChange}
        isAllow={isAllow}
    />
    </>;
};

export default Cities;
