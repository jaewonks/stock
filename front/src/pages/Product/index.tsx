import axios from 'axios';
import { useState, useEffect, useCallback, useRef } from 'react';
//import { Link } from 'react-router-dom';
import { IBrand, ICate, IProduct } from '../../typings/db';
import useInput from '../../hooks/useInput'
import useFile from '../../hooks/useFile'
import AddProduct from '../../pages/Product/Add';
import EditProduct from '../../pages/Product/Edit';

const Product = () => {

  const [ products, setProducts ] = useState<IProduct[]>([])
  const [ brands, setBrands ] = useState<IBrand[]>([]);
  const [ categories, setCategories ] = useState<ICate[]>([]);
  const [ image, onChangeImage ] = useFile('');
  const [ productname, onChangeProductname ] = useInput('');
  const [ colour, onChangeColour ] = useInput('');
  const [ size, onChangeSize ] = useInput('');
  const [ priceUk, onChangePriceUk ] = useInput('');
  const [ priceKr, onChangePriceKr ] = useInput('');
  const [ quantity, onChangeQuantity ] = useInput('');
  const [ brandname, onChangeBrandname ] = useInput('');
  const [ categoryname, onChangeCategoryname ] = useInput('');
  //const [ barcode, onChangeBarcode ] = useInput('');
  const [ link, onChangeLink ] = useInput('');
  const [ productstatus, onChangeProductstatus ] = useInput('');
  const formRef = useRef<HTMLDivElement>(null);

  const [ name, setName ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ id, setId ] = useState('');

  const addSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData()
    // 반복문으로 바꾸기 하...
    console.log(image)
    formData.append('image', image);
    formData.append('productname', productname);
    formData.append('colour', colour);
    formData.append('size', size);
    formData.append('priceUk', priceUk);
    formData.append('priceKr', priceKr);
    formData.append('quantity', quantity);
    formData.append('brandname', brandname);
    formData.append('categoryname', categoryname);
    formData.append('productstatus', productstatus);
    formData.append('link', link);
    axios
      .post('api/products',formData)
      .then((response) => {
        if(response.statusText !== 'OK') {
          throw new Error(response?.data.message)
        }
      })
      .catch((error) => {
        throw error.response?.data?.statusCode;
      })
  },[image,
    productname,
    colour,
    size,
    priceUk,
    priceKr,
    quantity,
    brandname,
    categoryname,
    productstatus,
    link]);

  // const editSummit = useCallback((e) => {
  // });  

  const editClick = useCallback((id: IProduct['product_id']) => {
    axios
    .get(`api/products/product/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        //setAddBrandError(true)
        throw new Error(response.data.message);
      }
   
    })
    .catch((error) => {
      //setAddBrandError(true)
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  // const removeClick = useCallback(() => {
  //   //console.log(document.querySelector('#editBrandModel')?.classList);
  //   axios
  //   .get(`api/products/brand/remove/${id}`)
  //   .then((response) => {
  //     if(response.statusText !== 'OK') {
  //       throw new Error(response.data.message);
  //     }
  //     // 데이터를 받아온 후 처리해야할 부분(자동 새로고침)
  //     //console.log(mutate('api/products/brand'))
  //     // return mutate('api/products/brand'); 서버로부터 재요청 || 캐싱된 데이터
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return { error: error.response.data.message || error.message };
  //   }) 
  // },[id])

  useEffect(() => {
    axios
    .get('api/products')
    .then((response) => {
      if(response.statusText !== 'OK') {
        //setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setProducts(response?.data)
    })
    .catch((error) => {
      //setAddBrandError(true)
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  const getProducts = () => {
    axios
    .get('api/products')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      setProducts(response.data)
    })    
    .catch((error) => {
      return { error: error.response.data.message || error.message }
    })
  }

  const getBrands = () => {
    axios
    .get('api/products/brand_option')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      setBrands(response.data)
    })
    .catch((error) => {
      return { error: error.response.data.message || error.message };
    }) 
  }

  const getCategories = () => {
    axios
    .get('api/products/category_option')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      setCategories(response.data)
    })  
    .catch((error) => {
        return { error: error.response.data.message || error.message };
    })
  }

  useEffect(() => {
    getProducts();
    getBrands();
    getCategories();
  },[setProducts,setBrands,setCategories])

  return (
    <div className="container">    
    <div className="row">
      <div className="col-md-12">
        <ol className="breadcrumb">
          <li><a href="dashboard.php">Home</a></li>		  
          <li className="active">Product</li>
        </ol>
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="page-heading"> <i className="glyphicon glyphicon-edit"></i> Manage Product</div>
        </div> {/*<!-- /panel-heading -->*/}
        <div className="panel-body">

          <div className="remove-messages"></div>

          <div className="div-action pull pull-right" style={{ paddingBottom: '20px' }}>
            <button className="btn btn-default button1" data-toggle="modal" id="addProductModalBtn" data-target="#addProductModal"> <i className="glyphicon glyphicon-plus-sign"></i> Add Product </button>
          </div> {/*<!-- /div-action -->*/}				
          
          <div className="table-container" style={{ width: '1108px', overflowX: 'scroll' }}>
            <table className="table" id="manageProductTable">
              <thead>
                <tr>
                  <th>Photo</th>							
                  <th>Product Name</th>
                  <th>Colour</th>							
                  <th>Size</th>							
                  <th>Price(UK)</th>							
                  <th>Price(KR)</th>							
                  <th>Quantity</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Barcode</th>
                  <th>Link</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
              { products?.map((product) => {
                return (
                  <tr key={product.product_id}>
                    <td><img src={product.product_image} className='img-round' style={{ height:'30px', width:'50px' }} alt={product.product_name} /></td>
                    <td>{product.product_name}</td>
                    <td>{product.product_colour}</td>
                    <td>{product.product_size}</td>
                    <td>{product.price_uk}</td>
                    <td>{product.price_kr}</td>
                    <td>{product.quantity}</td>
                    <td>{product.brand_name}</td>
                    <td>{product.categories_name}</td>
                    <td><button>create</button></td>
                    <td>{product.link}</td>
                    <td>{product.product_date.slice(0,10)}</td>
                    <td>{product.status === 1 ? 
                      <label className='label label-success'>Available</label> : <label className='label label-danger'>Not Available</label> }
                    </td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                          <li><button onClick={() => editClick(product.product_id)} type="button" data-toggle="modal" data-target="#editProductModal"> <i className="glyphicon glyphicon-edit"></i> Edit</button></li>
                          <li><button onClick={() => setId(String(product.product_id))} type="button" data-toggle="modal" data-target="#removeProductModal"> <i className="glyphicon glyphicon-trash"></i> Remove</button></li>       
                        </ul>
                      </div>
                    </td>
                  </tr>
                  )
                })
              }  
              </tbody>
            </table>
          </div>
          {/*<!-- /table -->*/}

        </div> {/*<!-- /panel-body -->*/}
      </div> {/*<!-- /panel -->*/}		
    </div> {/*<!-- /col-md-12 -->*/}
  </div> {/*<!-- /row -->*/}


  {/*<!-- add product -->*/}
  <AddProduct 
    addSubmit={addSubmit}
    formRef={formRef} 
    onChangeImage={onChangeImage}
    productname={productname}
    onChangeProductname={onChangeProductname}
    colour={colour}
    onChangeColour={onChangeColour}
    size={size}
    onChangeSize={onChangeSize}
    priceUk={priceUk}
    onChangePriceUk={onChangePriceUk}
    priceKr={priceKr}
    onChangePriceKr={onChangePriceKr}
    quantity={quantity}
    onChangeQuantity={onChangeQuantity}
    brandname={brandname}
    onChangeBrandname={onChangeBrandname}
    categoryname={categoryname}
    onChangeCategoryname={onChangeCategoryname}
    productstatus={productstatus}
    onChangeProductstatus={onChangeProductstatus}
    link={link}
    onChangeLink={onChangeLink}
    brands={brands} 
    categories={categories}        
  />            

  {/*<!-- edit product -->*/}
  {/* <EditProduct
    editSubmit={addSubmit}
    formRef={formRef} 
    name={name}
    setName={setName}
    colour={colour}
    setColour={setColour}
    size={size}
    setSize={setSize}
    priceUk={priceUk}
    setPriceUk={setPriceUk}
    priceKr={priceKr}
    setPriceKr={setPriceKr}
    quantity={quantity}
    setQuantity={setQuantity}
    brandname={brandname}
    setBrandname={setBrandname}
    categoryname={categoryname}
    setCategoryname={setCategoryname}
    status={status}
    setStatus={setStatus}
    link={link}
    setLink={setLink}
    brands={brands} 
    categories={categories}  
    productname={productname}
    setProductname={setProductname}
    productstatus={productstatus}
    setStatus={setStatus}      
    />          */}

  {/*<!-- remove categories brand -->*/}
  <div className="modal fade" id="removeProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title"><i className="glyphicon glyphicon-trash"></i> Remove Product</h4>
        </div>
        <div className="modal-body">

          <div className="removeProductMessages"></div>

          <p>Do you really want to remove ?</p>
        </div>
        <div className="modal-footer removeProductFooter">
          <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
          <button type="button" className="btn btn-primary" id="removeProductBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save changes</button>
        </div>
      </div>{/*<!-- /.modal-content -->*/}
    </div>{/*<!-- /.modal-dialog -->*/}
  </div>{/*<!-- /.modal -->*/}
  {/*<!-- /categories brand -->*/}
  </div>
  )
}

export default Product
