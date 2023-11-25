import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux'; 

const CountryDetail = (p) => {
    const history = useHistory()
    const user = useSelector(state => state.user)
    const { id, userId } = useParams()
    const [data, setData] = useState()
    const getDetail = (did) => {
        loader(true)
        ApiClient.get(``, { id: did }).then(res => {
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
        getDetail( id)
    }, [id, userId])

    return (
        <Layout>
            <div className="text-right">
                <div>
                    <a to="/users" onClick={back}>  <i className="fa fa-arrow-left mr-4 mb-3 " title='Back' aria-hidden="true"></i></a>
                </div>
            </div>
            <div className="row">
                <div className="sideclass col-md-12">
                    <h3 className="Profilehedding mt-3 ">
                    Country Detail
                    </h3>

                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Name</label>
                            <div className='profiledetailscls'>{data && data.name}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Continent</label>
                            <div className='profiledetailscls'>{data && data.continent}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Currency</label>
                            <div className='profiledetailscls'>{data && data.currency}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Product Count</label>
                            <div className='profiledetailscls'>{data && data.productCount}</div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="profileheddingcls">Status</label>
                            <div className='profiledetailscls'>{data && data.status}</div>
                        </div>
                        
                    
                        
                    </div>
                </div>
            </div>
        </Layout >

    );
};

export default CountryDetail;
