import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';

const BlogDetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(`blog`, { id: did }).then(res => {
            if (res.success) {
                setData(res.data)
            }
            loader(false)
        })
    };

    const back = () => {
        history.goBack()
    }

    useEffect(() => {
        getDetail(userId ? userId : id)
    }, [id, userId])

    return (
        <Layout>
            <div className="text-right">
                <div>
                <i onClick={e=>history.push(`/AddEditBlogs/${id}`)} class="material-icons edit mr-3" title="Edit">edit</i>
                    <a to="/blog" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12 pprofile1">
                    <h3 className="Profilehedding mt-3 ">
                    Blog Detail
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Title</label>
                            <div className='profiledetailscls'>{data && data.title}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Category</label>
                            <div className='profiledetailscls'> {data && data.category.name}</div>
                      
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Description</label>
                            {/* <div className='profiledetailscls'>{data && data.description}</div> */}
                            <div className='profiledetailscls' dangerouslySetInnerHTML={{__html: data && data.description}}></div>  
                        </div> 

                                             
                                                             
                        <div className="col-md-12 mb-3">
                <label className="profileheddingcls">Image</label>
                <div>
                  <div className="imagethumbWrapper">
                    <img
                      src={methodModel.userImg(data && data?.image)}
                      className="uploadimage"
                    />
                  </div>

            
                </div>
              </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default BlogDetail;
