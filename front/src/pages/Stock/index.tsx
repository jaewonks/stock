import { useState, useEffect } from 'react';
import { IProduct } from '../../typings/db';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getProducts } from '../../utils/Api';
 
const Stock = () => {

  const [ products, setProducts ] = useState<IProduct[]>([])

  useEffect(() => {
    axios
    .get('api/products')
    .then((response) => {
      if(response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      setProducts(response?.data)
    })
    .catch((error) => {
      return { error: error.response.data.message || error.message };
    }) 
  },[])

  useEffect(() => {
    getProducts(setProducts);
  },[setProducts]);

  return (
    <div className="container"> 
    <div className="row">
      <div className="col-md-12">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>		  
          <li className="active">Stock</li>
        </ol>
        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="page-heading"> <i className="glyphicon glyphicon-edit"></i> Manage Stock</div>
          </div> {/* <!-- /panel-heading --> */}
          <div className="panel-body">
            <div className="remove-messages"></div>
            <div className="div-action pull pull-right" style={{ paddingBottom: '20px' }} >
              <button className="btn btn-default button1" data-toggle="modal" id="importModalBtn" data-target="#importProductModal"> Import </button>
              <button className="btn btn-default button1" data-toggle="modal" data-target="#addStockModel"> 
                <i className="glyphicon glyphicon-plus-sign"></i> Add Stock 
              </button>
            </div> {/* <!-- /div-action --> */}		

            <table className="table" id="manageStockTable">
              <thead>
                <tr role='row'>							
                  <th>Stock Info</th>
                  <th>Barcode</th>
                  <th>Stock Qty</th>
                  <th>Order Qty</th>
                  <th>Staff Qty</th>
                  <th>Confirmation</th>
                </tr>
              </thead>
              <tbody>
              { products?.map((product, index) => {
                let oq = 10;
                let sq = 5;
                return (
                  <tr key={product.product_id} className="border-right">
                    <td>{product.product_name} / {product.product_colour} {product.product_size? "/ " + product.product_size:""}</td>
                    <td>{product.barcode}</td>
                    <td>{product.quantity}</td>
                    <td>{oq}</td>
                    <td>{sq}</td>
                    <td className={oq !== sq? "bg-red":"bg-green"}>
                      <div className="btn-group">
                        <ul className="dropdown-menu">
                          <li>
                            <button type="button" data-toggle="modal" data-target="#removeProductModal"> 
                            <i className="glyphicon glyphicon-trash"></i> Remove</button>
                          </li> 
                          <li>
                            <button type="button" data-toggle="modal" data-target="#editProductModal"> 
                            <i className="glyphicon glyphicon-edit"></i> Edit</button>
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
            {/* <!-- /table --> */}
          </div> {/* <!-- /panel-body --> */}
        </div> {/* <!-- /panel --> */}		
      </div> {/* <!-- /col-md-12 --> */}
    </div> {/* <!-- /row --> */}   
  </div>   
  )
}

export default Stock