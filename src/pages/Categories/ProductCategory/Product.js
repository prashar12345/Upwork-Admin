import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from '../../../components/global/layout';
import environment from '../../../environment';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import methodModel from '../../../methods/methods';
import datepipeModel from '../../../models/datepipemodel';

const productCategory = () => {
    let user = useSelector(state => state.user)
    const searchState = useSelector((state) => state.search);
    const [data, setdata] = useState()
    const history = useHistory()
    const { type } = useParams()
    const [filters, setFilter] = useState({ page: 1, count: 50, search: '', catType: type ? type : '', parentCategory: '',status:'' })

    const getProducts = (p={}) => {
        loader(true)
        let filter = { ...filters, ...p }
        ApiClient.get(`api/categories/listing`, filter).then(res => {
            if (res.success) {
                setdata(res.data)
            }
            loader(false)
        })
    }
    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (user && user.loggedIn) {
            setFilter({ ...filters, search: searchState.data })
            getProducts({ search: searchState.data, page: 1 })
        }
    }, [searchState])

    const statusChange = (itm) => {
        let modal = 'category'
        let status = 'active'
        if (itm.status == 'active') status = 'deactive'

        if (window.confirm(`Do you want to ${status == 'active' ? 'Activate' : 'Deactivate'} this`)) {
            loader(true)
            ApiClient.put(`api/category/status/change`, { id: itm.id, status }).then(res => {
                if (res.success) {
                    toast.success(res.message)
                    getProducts()
                }
                loader(false)
            })
        }
    }

    const edit = (id) => {
        history.push(`/category/product/${type}/edit/${id}`)
    }

    const deleteItem = (id) => {
        if (window.confirm("Do you want to delete this")) {
            loader(true)
            ApiClient.delete('api/category/delete', { id: id }).then(res => {
                if (res.success) {
                    toast.success(res.message)
                    getProducts()
                }
                loader(false)
            })
        }
    }

    const TableRow = ({ itm, className, index, parentCategory }) => {
        return <tr className={`data_row ${className || ''}`} >
            <td className='table_dats' onClick={e => edit(itm.id)}> <div className='user_detail'>
                <img src={methodModel.userImg(itm.banner)} className="user_imgs" />
            </div></td>
            <td className='table_dats'>{itm.name || '--'}</td>
            <td className='table_dats'>{parentCategory?.name || '--'}</td>
            <td className='table_dats'>{itm.catTypeName}</td>
            <td className='table_dats'>{datepipeModel.date(itm.createdAt)}</td>
            <td className='table_dats'>{datepipeModel.date(itm.updatedAt)}</td>
            <td className='table_dats'>{itm?.updatedBy?.fullName || '--'}</td>
            <td className='table_dats'> <div className={`user_hours ${itm.status}`} onClick={() => statusChange(itm)}>
                <span className='contract'>
                    {itm.status == 'deactive' ? 'inactive' : 'active'}
                </span>
            </div></td>
            <td className='table_dats'>
                <div className="action_icons">
                    <a className='edit_icon' title="Edit" onClick={e => edit(itm.id)}>
                        <i class="material-icons edit" title="Edit">edit</i>
                    </a>
                    <span className='edit_icon' onClick={() => deleteItem(itm.id)}>
                        <i class="material-icons delete" title='Delete'> delete</i>
                    </span>
                </div>
            </td>
        </tr>
    }

    const exportfun = async () => {
        const token = await localStorage.getItem("token");
        const req = await axios({
            method: "get",
            url: `${environment.api}api/categories/export?catType=${type}`,
            responseType: "blob",
            body: { token: token }
        });
        var blob = new Blob([req.data], {
            type: req.headers["content-type"],
        });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `Product Category.xlsx`;
        link.click();
    }
    
    const ChangeStatus = (e) => {
        setFilter({ ...filters, status: e, page: 1 })
        getProducts({ status: e, page: 1 })
    }

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="hedding">
                    Product Categories
                </h3>
                <article className="d-flex filterFlex phSpace">
                    <Link to={`/category/product/${type}/add`} className="btn btn-primary">
                        Add Product Category
                    </Link>
                    <button className="btn btn-primary mr-2 export" onClick={() => exportfun()}>
                        Export
                    </button>
                    <span>
                        <div className="dropdown addDropdown region_status">
                            <button className="btn btn-primary dropdown-toggle removeBg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {filters.status ? filters.status=="deactive"?"Inactive":filters.status : 'All Status'}
                            </button>
                            <div className="dropdown-menu shadow bg_hover" aria-labelledby="dropdownMenuButton">
                                <a  className={filters.status == '' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("")}>All Status</a> 
                                <a className={filters.status == 'active' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("active")} >Active</a>
                                <a className={filters.status == 'Inactive' ? 'dropdown-item active' : 'dropdown-item'} onClick={() => ChangeStatus("deactive")} >Inactive</a>
                            </div>
                        </div>
                    </span>
                </article>
            </div>

            <div className="table-responsive table_section">
                <table class="table table-striped">
                    <thead className='table_head'>
                        <tr className='heading_row'>
                            <th scope="col" className='table_data'>Image</th>
                            <th scope="col" className='table_data'>Category Name</th>
                            <th scope="col" className='table_data'>Parent Category</th>
                            <th scope="col" className='table_data'>Category Type</th>
                            <th scope="col" className='table_data'>Date Created</th>
                            <th scope="col" className='table_data'>Last Modified</th>
                            <th scope="col" className='table_data'>Last Modified by</th>
                            <th scope="col" className='table_data'>Status</th>
                            <th scope="col" className='table_data'>Actions</th>
                        </tr>
                    </thead>
                    <tbody id='tableBodycat'>
                        {data && data.map((itm, i) => {
                            return <>
                                <TableRow itm={itm} index={i} />
                                {itm?.childCategories && itm?.childCategories.map(citm => {
                                    return <>
                                        <TableRow itm={{ ...citm, id: citm._id }} index={i} className="subCategory" parentCategory={itm} />
                                        {citm.childCategories && citm.childCategories.map(sitm => {
                                            return <TableRow itm={{ ...sitm, id: citm._id }} index={i} className="subSubCategory" parentCategory={citm} />
                                        })}
                                    </>
                                })}
                            </>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default productCategory