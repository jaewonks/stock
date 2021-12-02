import { FC } from 'react'
import { IBrand, ICate } from '../../typings/db';

interface Props {
  addSubmit: any;
  formRef: any;
  image: string; 
  onChangeImage: any;
  name: string; 
  onChangeName: any;
  colour: string; 
  onChangeColour: any;
  size: string;
  onChangeSize: any;
  priceUk: string; 
  onChangePriceUk: any;
  priceKr: string; 
  onChangePriceKr: any;
  quantity: string; 
  onChangeQuantity: any;
  brandname: string; 
  onChangeBrandname: any;
  categoryname: string; 
  onChangeCategoryname: any;
  status: string; 
  onChangeStatus: any;
  link: string; 
  onChangeLink: any; 
  brands: IBrand[];
  categories: ICate[];
}

const AddProduct: FC<Props>= ({ 
  addSubmit,
  formRef, 
  image, 
  onChangeImage,
  name,
  onChangeName,
  colour,
  onChangeColour,
  size,
  onChangeSize,
  priceUk,
  onChangePriceUk,
  priceKr,
  onChangePriceKr,
  quantity,
  onChangeQuantity,
  brandname,
  onChangeBrandname,
  categoryname,
  onChangeCategoryname,
  status,
  onChangeStatus,
  link,
  onChangeLink,
  brands,
  categories
}) => {
  return (
    <div className="modal fade" id="addProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">

        <form onSubmit={addSubmit} className="form-horizontal" id="submitProductForm">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"><i className="fa fa-plus"></i> Add Product</h4>
          </div>

          <div className="modal-body" style={{ maxHeight:'450px', overflow:'auto' }}>

            <div id="add-product-messages"></div>

            <div className="form-group" ref={formRef}>
              <label htmlFor="productImage" className="col-sm-3 control-label">Product Image </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                {/*<!-- the avatar markup -->*/}
                <div id="kv-avatar-errors-1" className="center-block" style={{ display: 'none' }}></div>							
                <div className="kv-avatar center-block">					        
                    <input type="file" className="form-control file-loading" id="productImage" placeholder="Product Name" name="productImage" style={{ width: 'auto' }} value={image} onChange={onChangeImage} />
                </div>
                
              </div>
            </div> {/*<!-- /form-group-->*/}	     	           	       

            <div className="form-group" ref={formRef}>
              <label htmlFor="productName" className="col-sm-3 control-label">Product Name </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="productName" placeholder="product name" name="productName" autoComplete="off" value={name} onChange={onChangeName} />
              </div>
            </div> {/*<!-- /form-group-->*/}	    

            <div className="form-group" ref={formRef}>
              <label htmlFor="colour" className="col-sm-3 control-label">Colour </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="colour" placeholder="colour" name="colour" autoComplete="off" value={colour} onChange={onChangeColour} />
              </div>
            </div> {/*<!-- /form-group-->*/}	

            <div className="form-group" ref={formRef}>
              <label htmlFor="size" className="col-sm-3 control-label">Size </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="size" placeholder="size" name="size" autoComplete="off" value={size} onChange={onChangeSize} />
              </div>
            </div> {/*<!-- /form-group-->*/}	

            <div className="form-group" ref={formRef}>
              <label htmlFor="priceUk" className="col-sm-3 control-label">Price(UK) </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="priceUk" placeholder="price(UK)" name="priceUk" autoComplete="off" value={priceUk} onChange={onChangePriceUk} />
              </div>
            </div> {/*<!-- /form-group-->*/}	

            <div className="form-group" ref={formRef}>
              <label htmlFor="priceKr" className="col-sm-3 control-label">Price(KR) </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="priceKr" placeholder="price(KR)" name="priceKr" autoComplete="off" value={priceKr} onChange={onChangePriceKr} />
              </div>
            </div> {/*<!-- /form-group-->*/}	

            <div className="form-group" ref={formRef}>
              <label htmlFor="quantity" className="col-sm-3 control-label">Quantity </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="quantity" placeholder="quantity" name="quantity" autoComplete="off" value={quantity} onChange={onChangeQuantity} />
              </div>
            </div> {/*<!-- /form-group-->*/}	        	     	        

            <div className="form-group" ref={formRef}>
              <label htmlFor="brandName" className="col-sm-3 control-label">Brand Name </label>
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

            <div className="form-group" ref={formRef}>
              <label htmlFor="categoryName" className="col-sm-3 control-label">Category Name </label>
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
            {/*    
            <div className="form-group" ref={formRef}>
              <label htmlFor="barcode" className="col-sm-3 control-label">Barcode </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="barcode" placeholder="barcode" name="barcode" autoComplete="off" value={barcode} onChange={onChangeBarcode} />
              </div>
            </div> <!-- /form-group-->*/}	 		

            <div className="form-group" ref={formRef}>
              <label htmlFor="link" className="col-sm-3 control-label">Link </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <input type="text" className="form-control" id="link" placeholder="link" name="link" autoComplete="off" value={link} onChange={onChangeLink} />
              </div>
            </div> {/*<!-- /form-group-->*/}			        	         	       

            <div className="form-group" ref={formRef}>
              <label htmlFor="productStatus" className="col-sm-3 control-label">Status </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                <select className="form-control" id="productStatus" name="productStatus" value={status} onChange={onChangeStatus} >
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
  )
}

export default AddProduct;
