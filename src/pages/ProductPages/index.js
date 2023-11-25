import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ApiClient from '../../methods/api/apiClient';

export default function Products() {
        let user = useSelector(state => state.user)
        const searchState = useSelector((state) => state.search);
        const [filters, setFilter] = useState({ page: 1, search: ''})
        const [data, setData] = useState([]) 
        const [total, setTotal] = useState(0)
        const [loaging, setLoader] = useState(true)   
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
            ApiClient.get('api/products/listing', filter).then(res => {
                if (res.success) { 
                    setData(res.data)
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
    
        const pageChange = (e) => {
            setFilter({ ...filters, page: e })
            getData({ page: e })
        }  
        // const view=(id)=>{
        //     history.push("/plans/"+id)
        // } 
    
  return (
    <Layout>
{data&&data?.map((item,index)=>(
    <div class="card d-inline-flex m-3" style={{width:"18rem"}}>
  <div class="card-body">
    <img width={200} height={150}  src={item.images&&item?.images[0]?.itemUrl?item?.images[0]?.itemUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/No_image_3x4_50_trans_borderless.svg/1280px-No_image_3x4_50_trans_borderless.svg.png"}/>
    <h5 class="card-title">Product Name: {item.name}</h5>
    <p className='text-capitalize'>BookingSystem Name : {item.bookingSystemName}</p>
    <p className='text-capitalize'>SupplierName: {item.supplierName}</p>
    <p>Description: {item.shortDescription}</p>
    <p>Price: {item.advertisedPrice}{item.currency}</p>
  </div>
</div>
))   }
  {/* {!loaging && total == 0 ? <div className="py-3 text-center">No Data</div> : <></>}

{
    !loaging && total > filters.count ? <div className='paginationWrapper'>
        <span>Show {filters.count} from {total} Product</span>
        <Pagination
            currentPage={filters.page}
            totalSize={total}
            sizePerPage={filters.count}
            changeCurrentPage={pageChange}
        />
    </div> : <></>
} */}
    {loaging ? <div className="text-center mt-5">
                <img src="/assets/img/loader.gif" className="pageLoader" />
            </div> : <></>}
    </Layout>
  )
}
