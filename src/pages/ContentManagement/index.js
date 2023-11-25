import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
// import Pagination from "react-js-pagination";
import Pagination from "react-pagination-js";
import './style.scss';
import AddEditContent from './AddEditContent';
import ViewContent from './ViewContent';
import environment from '../../environment';
import loader from '../../methods/loader';
import Switch from "react-switch";
import { toast } from 'react-toastify';


const ContentManagement = (p) => {
    let user = useSelector(state => state.user)
    const [filters, setFilter] = useState({ page: 1, count: 5, search: '' })
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoader] = useState(false);
    const [type, setType] = useState()
    const [form, setform] = useState({})
    const searchState = useSelector((state) => state.search);

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getData({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const getData = (p = {}) => {
        // setLoader(true)
        loader(true);
        let filter = { ...filters, ...p }
        ApiClient.get('contents', filter).then(res => {
            if (res.success) {
                setData(res.data)
                setTotal(res.data.total_count)
            }
            // setLoader(false)
            loader(false);
        })
    }

    const pageChange = (e) => {
        setFilter({ ...filters, page: e })
        getData({ page: e })
    }

    const openModal = (itm = '') => {
        setform({ title: '', slug: '', description: '', meta_title: '', meta_description: '', meta_keyword: '' })
        if (itm) {
            setform({
                ...form, ...itm, title: itm.title, slug: itm.slug, description: itm.description, meta_title: itm.meta_title, meta_description: itm.meta_description, meta_keyword: itm.meta_keyword,
            })
        }
        document.getElementById('openContentModal').click()
    }

    const openViewModal = (itm = '') => {
        setform({ ...form, ...itm })
        document.getElementById("openViewContantModal").click()
    }




    const modalClosed = () => {
        setFilter({ ...filters, page: 1 })
        getData()
    }

    const isAllow=(key='')=>{
        let permissions=user.role?.permissions
        let value=permissions?.[key]
        if(user.role.id==environment.adminRoleId) value=true

        return value
    }

    const statusChange=(itm)=>{ 
        let status='active'
        if(itm.status=='active') status='deactive'

        if(window.confirm(`Do you want to ${status=='active'?'Activate':'Deactivate'} this Content`)){
            loader(true)
            ApiClient.put(`change/status?model=contentmanagment`,{status,id:itm.id}).then(res=>{
                if(res.success){
                    getData()
                    toast.success(` Content ${status=='active'?'Activated':'Deactivated'} Successfully`)
                }
                loader(false)
            })
        }
    }
    return (
        <Layout>
            <h3 className="hedding mb-2">
            Managing Content
            </h3>
            <div className="table-responsive table_section">
                <table className="table table-striped">
                    <thead className="table_head">
                        <tr className="heading_row">
                            <th class="table_data">Page Name</th>
                            <th class="table_data" scope="col">Title</th>
                            <th class="table_data" scope="col">Meta Description</th>
                            <th class="table_data" scope='col'>Status</th>
                            <th class="table_data" scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data && data.map((itm, i) => {
                            return <tr key={i}>
                                <td><span className='tuncketcls'>{itm.slug}</span></td>
                                <td><span className=' tuncketcls'>{itm.title}</span></td>
                                <td><span className=' tuncketcls'>{itm.meta_description}</span></td>
                                <td className='table_dats'>   <div className={` `} >
                                        <span className='contract'>
                                        {itm.status == 'deactive' ?<Switch onChange={e=>statusChange(itm)} checked={false} /> : <Switch onChange={e=>statusChange(itm)} checked={true} />}
                                        </span>
                                    </div></td>
                                <td className="nowrap">
                                    <a className="linkclass mx-2"  onClick={() => openViewModal(itm)} title="View"><i className="fa fa-eye" aria-hidden="true"></i></a>{isAllow('editContent')?<>
                                     <a className="linkclass mx-2" onClick={() => openModal(itm)} title="Edit"><i className="fas fa-pen"></i></a></>:null}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>

                {loading ? <div className="text-center py-4">
                    <img src="/assets/img/loader.gif" className="pageLoader" />
                </div> : <></>}
            </div>

            {!loading && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

            {!loading && total > filters.count ? <div>
                {/* <Pagination
                    activePage={filters.page}
                    itemsCountPerPage={filters.count}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    onChange={pageChange}
                /> */}
                <Pagination
                    currentPage={filters.page}
                    totalSize={total}
                    sizePerPage={filters.count}
                    changeCurrentPage={pageChange}
                />
            </div> : <></>}
            <AddEditContent form={form} setform={setform} modalClosed={modalClosed} />
            <ViewContent form={form} setform={setform} modalClosed={modalClosed} />
        </Layout>
    );
};







export default ContentManagement;
