import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiClient from '../../methods/api/apiClient';
import './style.scss';
import { ToastsStore } from 'react-toasts';
import loader from '../../methods/loader';
import userTableModel from '../../models/table.model';
import categoryType from '../../models/categoryType.model';
import Html from './html';
import { CategoryType } from '../../models/type.model';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import environment from '../../environment';

const Holiday = (p) => {
    const year = new Date().getFullYear()
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '',country:'' ,year:'' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loaging, setLoader] = useState(true)
    const [tableCols, setTableCols] = useState([])
    const [contries, setcountries] = useState()
    const types=categoryType.list
    const history=useHistory()
    const years=[
        {year:'2015',id:'2015'},
        {year:'2016',id:'2016'},
        {year:'2017',id:'2017'},
        {year:'2018',id:'2018'},
        {year:'2019',id:'2019'},
        {year:'2020',id:'2020'},
        {year:'2021',id:'2021'},
        {year:'2022',id:'2022'},
        {year:'2023',id:'2023'},
    ]

    useEffect(() => {
        let cols = []
        for (let i = 0; i <= 2; i++) {
            cols.push(userTableModel.category[i])
        }
        setTableCols(cols)
        // getcountries()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getData = (p = {}) => {
        setLoader(true)
        let filter = { ...filters, ...p }
        // ApiClient.get('api/holidays/listing', filter).then(res => {
        //     if (res.success) {
        //         setData(res.data.map(itm=>{
        //             itm.id=itm._id
        //             return itm
        //         }))
        //         setTotal(res.total)
        //     }
            setLoader(false)
        // })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
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

    const filter = (p={}) => {
        setFilter({ ...filters, page: 1,...p })
        getData({ page: 1,...p })
    }

    const exportfun=async()=>{
        const token=await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/`,
            responseType: "blob",
            body:{token:token}
          });
          var blob = new Blob([req.data], {
            type: req.headers["content-type"],
          });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Booking.xlsx`;
          link.click();
    }

    const getcountries=()=>{
        ApiClient.get(`api/holidays/countries`).then(res=>{
            if(res.success){
                setcountries(Object.keys(res.data).map(item=>{
                    return ({...contries,id:item,name:res.data[item]})
                }))
                let data = Object.keys(res.data).map(item=>{
                    return ({...contries,id:item,name:res.data[item]})
                })
                setFilter({ ...filters,country:data[0].id })
            }
        })
    }

    return <><Html
        exportfun={exportfun}
        types={types}
        pageChange={pageChange}
        exportCsv={exportCsv}
        filters={filters}
        filter={filter}
        tableCols={tableCols}
        loaging={loaging}
        data={data}
        total={total}
        contries={contries}
        years={years}
    />
    </>;
};

export default Holiday;
