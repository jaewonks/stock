import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import axios from 'axios'
import { IBrand } from '../../typings/db'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import EditBrand from './Edit'
import RemoveBrand from './Remove'
import AddBrand from './Add'
 
const Brand = () => {
  const { mutate } = useSWR('api/products/brand', fetcher, { revalidateIfStale : true });
  const [ brands, setBrands ] = useState<IBrand[]>([]);
  const [ brandname, onChangeBrandname ] = useInput('');
  const [ brandabbre, onChangeBrandabbre ] = useInput('');
  const [ brandstatus, onChangeBrandstatus ] = useInput('');
  const [ emptybrandname, setEmptybrandname ] = useState('');
  const [ emptybrandabbre, setEmptybrandabbre ] = useState('');
  const [ emptybrandstatus, setEmptybrandstatus ] = useState('');
  const [ addBrand, setAddBrand ] = useState(false);
  const [ addBrandError, setAddBrandError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const [ name, setName ] = useState('');
  const [ abbre, setAbbre ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ id, setId ] = useState('');

  const addSubmit = useCallback((e) => {
    e.preventDefault();
    const form = formRef.current;
    if(brandname === '') {
      form && form.classList.add('has-error');
      return setEmptybrandname('Brand Name field is required');
    }
    if(brandstatus === '') {
      form && form.classList.add('has-error');
      return setEmptybrandstatus('Brand Status field is required')
    }
    setLoading(true);
    setAddBrand(true);
    axios
      .post('api/products/brand', {
        brandname,
        brandabbre,
        brandstatus
      })
      .then((response) => {
        if(response.statusText !== 'OK' || response.data.message) {
          setAddBrandError(true);
          setLoading(false);
          console.log(1);
          throw new Error(response?.data.message);
        }
        form && form.classList.add('has-success');
        setLoading(false);
        // 창을 닫자
      })
      .catch((error) => {
        setAddBrandError(true);
        throw error.response?.data?.statusCode;
      })

  },[
    brandname,
    brandabbre,
    brandstatus,
    setEmptybrandname,
    setEmptybrandstatus
  ]);
  
  const editSubmit = useCallback((e) => {
    e.preventDefault();
    //document.querySelector('#editBrandModel')?.classList.add('div-hide'); 
    axios
      .put(`api/products/brand/${id}`, {
        name, 
        abbre,
        status
      })
      .then((response) => {
        if(response.statusText !== 'OK' || response.data.message) {
          throw new Error(response?.data.message);
        }
      })
      .catch((error) => {
        setAddBrandError(true);
        throw error.response?.data?.statusCode;
      })
    return false;
  },[name, abbre, status, id])

  const editClick = useCallback((id: IBrand['brand_id']) => {
    axios
    .get(`api/products/brand/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setName(response.data[0].brand_name)
      setAbbre(response.data[0].brand_abbre)
      setStatus(response.data[0].brand_active)
      setId(response.data[0].brand_id)
    })
    .catch((error) => {
      setAddBrandError(true)
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  const removeClick = useCallback(() => {
    //console.log(document.querySelector('#editBrandModel')?.classList);
    axios
    .get(`api/products/brand/remove/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      // 데이터를 받아온 후 처리해야할 부분(자동 새로고침)
      //console.log(mutate('api/products/brand'))
      // return mutate('api/products/brand'); 서버로부터 재요청 || 캐싱된 데이터
    })
    .catch((error) => {
      console.log(error);
      return { error: error.response.data.message || error.message };
    }) 
  },[id])

  useEffect(() => {
    axios
    .get('api/products/brand')
    .then((response) => {
      if(response.statusText !== 'OK') {
        setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setBrands(response?.data)
    })
    .catch((error) => {
      setAddBrandError(true)
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  return (
    <div className="container"> 
    <div className="row">
      <div className="col-md-12">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>		  
          <li className="active">Brand</li>
        </ol>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="page-heading"> <i className="glyphicon glyphicon-edit"></i> Manage Brand</div>
          </div> {/* <!-- /panel-heading --> */}
          <div className="panel-body">
            <div className="remove-messages"></div>
            <div className="div-action pull pull-right" style={{ paddingBottom: '20px' }} >
              <button className="btn btn-default button1" data-toggle="modal" data-target="#addBrandModel"> 
                <i className="glyphicon glyphicon-plus-sign"></i> Add Brand 
              </button>
            </div> {/* <!-- /div-action --> */}		

            <table className="table" id="manageBrandTable">
              <thead>
                <tr role='row'>							
                  <th>Brand Name</th>
                  <th>Brand Acronmy</th>
                  <th>Status</th>
                  <th style={{ width: '15%' }} >Options</th>
                </tr>
              </thead>
              <tbody>
              {brands.length > 0 && brands?.map((brand, index) => {
                  return (
                    <tr key={brand.brand_id} role='row' className={index%2 === 0? 'even':'odd'}>
                      <td>{brand.brand_name}</td>
                      <td>{brand.brand_abbre}</td>
                      <td>{brand.brand_active === 1 ? 
                      <label className='label label-success'>Available</label> : <label className='label label-danger'>Not Available</label> }
                      </td>
                      <td>
                        <div className="btn-group">
                          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Action <span className="caret"></span>
                          </button>
                          <ul className="dropdown-menu">
                            <li><button onClick={() => editClick(brand.brand_id)} type='button' data-toggle="modal" data-target="#editBrandModel"> 
                              <i className="glyphicon glyphicon-edit"></i> Edit</button></li>
                            <li><button onClick={() => setId(String(brand.brand_id))} type='button' data-toggle="modal" data-target="#removeBrandModal"> 
                              <i className="glyphicon glyphicon-trash"></i> Remove</button></li>       
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }   
              </tbody>
            </table>
            {/* <!-- /table --> */}
          </div> {/* <!-- /panel-body --> */}
        </div> {/* <!-- /panel --> */}		
      </div> {/* <!-- /col-md-12 --> */}
    </div> {/* <!-- /row --> */}

    {/* <!-- Add Brand --> */}
     <AddBrand
      addBrand={addBrand}
      addBrandError={addBrandError}
      addSubmit={addSubmit}
      formRef={formRef}
      emptybrandname={emptybrandname}
      emptybrandstatus={emptybrandstatus}
      brandname={brandname}
      onChangeBrandname={onChangeBrandname}
      brandabbre={brandabbre}
      onChangeBrandabbre={onChangeBrandabbre}
      brandstatus={brandstatus}
      onChangeBrandstatus={onChangeBrandstatus}
      loading={loading}
     />         
    {/* <!-- Edit Brand --> */}
     <EditBrand editSubmit={editSubmit} name={name} setName={setName} abbre={abbre} setAbbre={setAbbre} status={status} setStatus={setStatus} />         
    {/* <!-- Remove Brand --> */}
     <RemoveBrand removeClick={removeClick} />      
  </div>   
  )
}

export default Brand
