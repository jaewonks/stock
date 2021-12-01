import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
//import { Link } from 'react-router-dom';
import { IBrand, ICate, IProduct } from '../typings/db';
import useInput from '../hooks/useInput'

const Product = () => {

  const [ products, setProducts ] = useState<IProduct[]>([])
  const [ brands, setBrands ] = useState<IBrand[]>([]);
  const [ categories, setCategories ] = useState<ICate[]>([]);

  const [ productname, onChangeProductname ] = useInput('');
  const [ productimage, onChangeProductimage ] = useInput('');
  const [ brandname, onChangeBrandname ] = useInput('');
  const [ categoryname, onChangeCategoryname ] = useInput('');
  const [ quantity, onChangeQuantity ] = useInput('');
  const [ rate, onChangeRate ] = useInput('');
  const [ productstatus, onChangeProductstatus ] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    axios
      .post('api/products',{
        productname,
        productimage,
        brandname,
        categoryname,
        quantity,
        rate,
        productstatus
      })
      .then((response) => {
        if(response.statusText !== 'OK') {
          throw new Error(response?.data.message)
        }
      })
      .catch((error) => {
        throw error.response?.data?.statusCode;
      })
  },[productname,
    productimage,
    brandname,
    categoryname, 
    quantity,
    rate,
    productstatus]);

 const getProducts = () => {
    axios
    .get('api/products')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return setProducts(response.data)
    })    
    .catch((error) => {
      return { error: error.response.data.message || error.message }
    })
  }

  const getBrands = () => {
    axios
    .get('api/products/brand/option')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return setBrands(response.data)
    })
    .catch((error) => {
      return { error: error.response.data.message || error.message };
    }) 
  }

  const getCategories = () => {
    axios
    .get('api/products/category/option')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return setCategories(response.data)
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
          
          <table className="table" id="manageProductTable">
            <thead>
              <tr>
                <th style= {{ width: '10%' }}>Photo</th>							
                <th>Product Name</th>
                <th>Colour</th>							
                <th>Size</th>							
                <th>Price(UK)</th>							
                <th>Price(KR)</th>							
                <th>Quantity</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Barcode</th>
                {/* <th>Link</th> */}
                <th>Date</th>
                <th>Status</th>
                <th style= {{ width: '15%' }}>Options</th>
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
                  <td>{product.barcode}</td>
                  {/* <td>{product.link}</td> */}
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
                        <li><button type="button" data-toggle="modal" data-target="#editProductModal"> <i className="glyphicon glyphicon-edit"></i> Edit</button></li>
                        <li><button type="button" data-toggle="modal" data-target="#removeProductModal"> <i className="glyphicon glyphicon-trash"></i> Remove</button></li>       
                      </ul>
                    </div>
                  </td>
                </tr>
                )
              })
            }  
            </tbody>
          </table>
          {/*<!-- /table -->*/}

        </div> {/*<!-- /panel-body -->*/}
      </div> {/*<!-- /panel -->*/}		
    </div> {/*<!-- /col-md-12 -->*/}
  </div> {/*<!-- /row -->*/}


  {/*<!-- add product -->*/}
  <div className="modal fade" id="addProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">

        <form onSubmit={onSubmit} className="form-horizontal" id="submitProductForm">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"><i className="fa fa-plus"></i> Add Product</h4>
          </div>

          <div className="modal-body" style={{ maxHeight:'450px', overflow:'auto' }}>

            <div id="add-product-messages"></div>

            <div className="form-group">
              <label htmlFor="productImage" className="col-sm-3 control-label">Product Image: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                {/*<!-- the avatar markup -->*/}
                <div id="kv-avatar-errors-1" className="center-block" style={{ display: 'none' }}></div>							
                <div className="kv-avatar center-block">					        
                    <input type="file" className="form-control file-loading" id="productImage" placeholder="Product Name" name="productImage" style={{ width: 'auto' }} value={productimage} onChange={onChangeProductimage} />
                </div>
                
              </div>
            </div> {/*<!-- /form-group-->*/}	     	           	       

            <div className="form-group">
              <label htmlFor="productName" className="col-sm-3 control-label">Product Name: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="productName" placeholder="Product Name" name="productName" autoComplete="off" value={productname} onChange={onChangeProductname} />
              </div>
            </div> {/*<!-- /form-group-->*/}	    

            <div className="form-group">
              <label htmlFor="quantity" className="col-sm-3 control-label">Quantity: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="quantity" placeholder="Quantity" name="quantity" autoComplete="off" value={quantity} onChange={onChangeQuantity} />
              </div>
            </div> {/*<!-- /form-group-->*/}	        	 

            <div className="form-group">
              <label htmlFor="rate" className="col-sm-3 control-label">Rate: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="rate" placeholder="Rate" name="rate" autoComplete="off" value={rate} onChange={onChangeRate} />
              </div>
            </div> {/*<!-- /form-group-->*/}	     	        

            <div className="form-group">
              <label htmlFor="brandName" className="col-sm-3 control-label">Brand Name: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <select className="form-control" id="brandName" name="brandName" value={brandname} onChange={onChangeBrandname} >
                  <option value="">--SELECT--</option>
                  {brands?.map((brand) => {
                    return (
                      <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                    )
                  })
                }
                </select>
              </div>
            </div> {/*<!-- /form-group-->*/}	

            <div className="form-group">
              <label htmlFor="categoryName" className="col-sm-3 control-label">Category Name: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <select className="form-control" id="categoryName" placeholder="Product Name" name="categoryName" value={categoryname} onChange={onChangeCategoryname} >
                  <option value="">--SELECT--</option>
                  {categories?.map((cate) => {
                    return (
                      <option key={cate.categories_id} value={cate.categories_id}>{cate.categories_name}</option>
                    )
                  })       
                }
                </select>
              </div>
            </div> {/*<!-- /form-group-->*/}					        	         	       

            <div className="form-group">
              <label htmlFor="productStatus" className="col-sm-3 control-label">Status: </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <select className="form-control" id="productStatus" name="productStatus" value={productstatus} onChange={onChangeProductstatus} >
                  <option value="">--SELECT--</option>
                  <option value="1">Available</option>
                  <option value="2">Not Available</option>
                </select>
              </div>
            </div> {/*<!-- /form-group-->*/}	         	        
          </div> {/*<!-- /modal-body -->*/}
          
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
            
            <button type="submit" className="btn btn-primary" id="createProductBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
          </div> {/*<!-- /modal-footer -->*/}	      
        </form> {/*<!-- /.form -->*/}	     
      </div> {/*<!-- /modal-content -->*/}    
    </div> {/*<!-- /modal-dailog -->*/}
  </div> 
  {/*<!-- /add categories -->*/}


  {/*<!-- edit categories brand -->*/}
  <div className="modal fade" id="editProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
              
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"><i className="fa fa-edit"></i> Edit Product</h4>
          </div>
          <div className="modal-body" style={{ maxHeight:'450px', overflow:'auto' }}>

            <div className="div-loading">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div>

            <div className="div-result">

            {/*<!-- Nav tabs -->*/}
            <ul className="nav nav-tabs" role="tablist">
              <li role="presentation" className="active"><a href="#photo" aria-controls="home" role="tab" data-toggle="tab">Photo</a></li>
              <li role="presentation"><a href="#productInfo" aria-controls="profile" role="tab" data-toggle="tab">Product Info</a></li>    
            </ul>

            {/*<!-- Tab panes -->*/}
            <div className="tab-content">

              
              <div role="tabpanel" className="tab-pane active" id="photo">
                <form id="updateProductImageForm" className="form-horizontal" >

                <br />
                <div id="edit-productPhoto-messages"></div>

                <div className="form-group">
                  <label htmlFor="editProductImage" className="col-sm-3 control-label">Product Image: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">							    				   
                    <img src="" id="getProductImage" className="thumbnail" style={{ width: '250px', height: '250px' }} alt='productname' />
                  </div>
                </div> {/*<!-- /form-group-->*/}	     	           	       
                
                <div className="form-group">
                  <label htmlFor="editProductImage" className="col-sm-3 control-label">Select Photo: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    {/*<!-- the avatar markup -->*/}
                    <div id="kv-avatar-errors-1" className="center-block" style={{ display: 'none' }} ></div>							
                    <div className="kv-avatar center-block">					        
                        <input type="file" className="form-control file-loading" id="editProductImage" placeholder="Product Name" name="editProductImage" style={{ width: 'auto' }} />
                    </div>
                    
                  </div>
                </div> {/*<!-- /form-group-->*/}	     	           	       

                <div className="modal-footer editProductPhotoFooter">
                  <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
                  
                  {/*<!-- <button type="submit" className="btn btn-success" id="editProductImageBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button> -->*/}
                </div>
                {/*<!-- /modal-footer -->*/}
                </form>
                {/*<!-- /form -->*/}
              </div>
              {/*<!-- product image -->*/}
              <div role="tabpanel" className="tab-pane" id="productInfo">
                <form className="form-horizontal" id="editProductForm">				    
                <br />

                <div id="edit-product-messages"></div>

                <div className="form-group">
                  <label htmlFor="editProductName" className="col-sm-3 control-label">Product Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="editProductName" placeholder="Product Name" name="editProductName" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	    

                <div className="form-group">
                  <label htmlFor="editQuantity" className="col-sm-3 control-label">Quantity: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="editQuantity" placeholder="Quantity" name="editQuantity" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	        	 

                <div className="form-group">
                  <label htmlFor="editRate" className="col-sm-3 control-label">Rate: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="editRate" placeholder="Rate" name="editRate" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	     	        

                <div className="form-group">
                  <label htmlFor="editBrandName" className="col-sm-3 control-label">Brand Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select className="form-control" id="editBrandName" name="editBrandName">
                      <option value="">--SELECT--</option>
                      {brands?.map((brand, index) => {
                        return (
                          <option key={brand.brand_id} value={index+1}>{brand.brand_name}</option>
                        )
                      })
                    }
                    </select>
                  </div>
                </div> {/*<!-- /form-group-->*/}	

                <div className="form-group">
                  <label htmlFor="editCategoryName" className="col-sm-3 control-label">Category Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select className="form-control" id="editCategoryName" name="editCategoryName" >
                      <option value="">--SELECT--</option>
                      {categories?.map((cate,index) => {
                        return (
                          <option key={cate.categories_id} value={index+1}>{cate.categories_name}</option>
                        )
                      })       
                   }
                    </select>
                  </div>
                </div> {/*<!-- /form-group-->*/}					        	         	       

                <div className="form-group">
                  <label htmlFor="editProductStatus" className="col-sm-3 control-label">Status: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select className="form-control" id="editProductStatus" name="editProductStatus">
                      <option value="">--SELECT--</option>
                      <option value="1">Available</option>
                      <option value="2">Not Available</option>
                    </select>
                  </div>
                </div> {/*<!-- /form-group-->*/}	         	        

                <div className="modal-footer editProductFooter">
                  <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
                  
                  <button type="submit" className="btn btn-success" id="editProductBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
                </div> {/*<!-- /modal-footer -->*/}				     
                </form> {/*<!-- /.form -->*/}				     	
              </div>    
              {/*<!-- /product info -->*/}
            </div>

          </div>
            
          </div> {/*<!-- /modal-body -->*/}
                  
        
      </div>
      {/*<!-- /modal-content -->*/}
    </div>
    {/*<!-- /modal-dailog -->*/}
  </div>
  {/*<!-- /categories brand -->*/}

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
