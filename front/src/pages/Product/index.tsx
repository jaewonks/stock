import { useState, useEffect, useCallback, useRef } from 'react';
//import { Link } from 'react-router-dom';
import { IBrand, ICate, IProduct } from '../../typings/db';
import useInput from '../../hooks/useInput'
import useFile from '../../hooks/useFile'
import axios from 'axios';
import AddProduct from './Add';
import RemoveProduct from './Remove';
import EditProduct from './Edit';
import ImportProduct from './Import';
import { getBrands, getProducts, getCategories } from '../../utils/Api';
import { createBarcode } from './../Barcode';
import { readFile } from '../../utils/func';

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

  const [ _image, set_image ] = useState('')

  const [ id, setId ] = useState('');
  const [ _name, set_name ] = useState('');
  const [ _status, set_status ] = useState('');
  const [ _colour, set_colour ] = useState('');
  const [ _size, set_size] = useState('');
  const [ _priceUk, set_priceUk] = useState('');
  const [ _priceKr, set_priceKr] = useState('');
  const [ _quantity,set_quantity] = useState('');
  const [ _brandname,set_brandname] = useState('');
  const [ _categoryname, set_categoryname] = useState('');
  const [ _link, set_link]= useState('');
  const [ preview, setPreview ] = useState(null);

  const [ barcode, setBarcode ] = useState('');
  const [ excelFile, onChangeExcelFile] = useFile(null);

  const addSubmit = useCallback((e) => {
    e.preventDefault();
    const formData = new FormData()
    // 반복문으로 바꾸기 하...
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
    link
  ]);

  const editSummit = useCallback((e) => {
    e.preventDefault();
    //document.querySelector('#editBrandModel')?.classList.add('div-hide'); 
    const formData = new FormData()
    // 반복문으로 바꾸기 하...
    formData.append('image', _image);
    formData.append('name', _name);
    formData.append('colour', _colour);
    formData.append('size', _size);
    formData.append('priceUk', _priceUk);
    formData.append('priceKr', _priceKr);
    formData.append('quantity', _quantity);
    formData.append('brandname', _brandname);
    formData.append('categoryname', _categoryname);
    formData.append('status', _status);
    formData.append('link', _link);

    console.log(formData);
    axios
      .put(`api/products/${id}`,formData)
      .then((response) => {
        if(response.statusText !== 'OK' || response.data.message) {
          throw new Error(response?.data.message);
        }
      })
      .catch((error) => {
        //setAddBrandError(true);
        throw error.response?.data?.statusCode;
      })
    return false;
    },[
      id,
      _image,
      _name,
      _colour,
      _size,
      _priceUk,
      _priceKr,
      _quantity,
      _brandname,
      _categoryname,
      _status,
      _link
  ]);  

  const importSubmit = useCallback((e) => {
    e.preventDefault();
    readFile(excelFile);
  },[excelFile]);

  const editClick = useCallback((id: IProduct['product_id']) => {
    axios
    .get(`api/products/product/${id}`)
    .then((response) => {
      if(response.statusText !== 'OK') {
        //setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setId(response.data[0].product_id)
      set_image(response.data[0].product_image)
      set_name(response.data[0].product_name)
      set_colour(response.data[0].product_colour)
      set_size(response.data[0].product_size)
      set_priceUk(response.data[0].price_uk)
      set_priceKr(response.data[0].price_kr)
      set_quantity(response.data[0].quantity)
      set_brandname(response.data[0].brand_id)
      set_categoryname(response.data[0].categories_id)
      set_link(response.data[0].link)
      set_status(response.data[0].active)
    })
    .catch((error) => {
      //setAddBrandError(true)
      console.log(error)
      //return { error: error.response.data.message || error.message };
    }) 
  },[id])

  const removeClick = useCallback(() => {
    //console.log(document.querySelector('#editBrandModel')?.classList);
    axios
    .get(`api/products/remove/${id}`)
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

  const barcodeClick = useCallback((idx: number) => {
    const _product = products[idx];
    const id = _product.product_id;
    const barcode = createBarcode(_product);

    axios
    .put(`api/products/barcode/${id}`,{
      barcode
    })
    .then((response) => {
      if(response.statusText !== 'OK') {
        //setAddBrandError(true)
        throw new Error(response.data.message);
      }
      setBarcode(response.data[0].barcode)
    })
    .catch((error) => {
      //setAddBrandError(true)
      console.log(error)
      //return { error: error.response.data.message || error.message };
    }) 




  },[products])

  const exportClick = useCallback(() => {

  },[])


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

  useEffect(() => {
    getBrands(setBrands);
    getProducts(setProducts);
    getCategories(setCategories);
  },[setProducts,setBrands,setCategories]);
  
  console.log(barcode);

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
         {/* <input type="file" onChange={(e) => importFile(e)} /> */}
            <button className="btn btn-default button1" data-toggle="modal" id="importModalBtn" data-target="#importProductModal"> Import </button>
            <button className="btn btn-default button1" > Export </button>
            <button className="btn btn-default button1" data-toggle="modal" id="addProductModalBtn" data-target="#addProductModal"> 
            <i className="glyphicon glyphicon-plus-sign"></i> Add Product </button>
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
                  <th>System Qty</th>
                  <th>Order</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Barcode</th>
                  <th>Link</th>
                  <th>Date</th>
                  <th>By</th>
                  <th>Status</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
              { products?.map((product, index) => {
                return (
                  <tr key={product.product_id}>
                    <td><img src={product.product_image} className='img-round scale' style={{ height:'30px', width:'30px' }} alt={product.product_name} /></td>
                    <td>{product.product_name}</td>
                    <td>{product.product_colour}</td>
                    <td>{product.product_size}</td>
                    <td>{product.price_uk}</td>
                    <td>{product.price_kr}</td>
                    <td>{product.quantity}</td>
                    <td>System Qty</td>
                    <td>Order Info</td>
                    <td>{product.brand_name}</td>
                    <td>{product.categories_name}</td>
                    <td>
                      {product?.barcode ? product?.barcode :
                      <button onClick={() => barcodeClick(index)}>create</button>}
                    </td>
                    <td>{product.link}</td>
                    <td>{product.product_date.slice(0,10)}</td>
                    <td>Jaewon Kim</td>
                    <td>{product.status === 1 ? 
                      <label className='label label-success'>Available</label> : <label className='label label-danger'>Not Available</label> }
                    </td>
                    <td>
                      <div className="btn-group">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button onClick={() => editClick(product.product_id)} type="button" data-toggle="modal" data-target="#editProductModal"> 
                            <i className="glyphicon glyphicon-edit"></i> Edit</button>
                          </li>
                          <li>
                            <button onClick={() => setId(String(product.product_id))} type="button" data-toggle="modal" data-target="#removeProductModal"> 
                            <i className="glyphicon glyphicon-trash"></i> Remove</button>
                          </li>       
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
  <EditProduct
    editSubmit={editSummit}
    formRef={formRef} 
    _image={_image}
    set_image={set_image}
    _name={_name}
    set_name={set_name}
    _colour={_colour}
    set_colour={set_colour}
    _size={_size}
    set_size={set_size}
    _priceUk={_priceUk}
    set_priceUk={set_priceUk}
    _priceKr={_priceKr}
    set_priceKr={set_priceKr}
    _quantity={_quantity}  
    set_quantity={set_quantity}
    _brandname={_brandname}
    set_brandname={set_brandname}
    _categoryname={_categoryname}
    set_categoryname={set_categoryname}
    _status={_status}
    set_status={set_status}
    _link={_link} 
    set_link={set_link}
    brands={brands} 
    categories={categories}  
    preview={preview}
    setPreview={setPreview}  
    />

   {/* <!-- Remove Product --> */}
   <RemoveProduct removeClick={removeClick} />
  {/*<!-- /categories brand -->*/}
   <ImportProduct importSubmit={importSubmit} onChangeExcelFile={onChangeExcelFile} />
  </div>
  )
}

export default Product
