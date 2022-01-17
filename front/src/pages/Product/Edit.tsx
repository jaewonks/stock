import { FC } from 'react'
import { IBrand, ICate } from '../../typings/db';
interface Props {
  editSubmit: any;
  formRef: any;
  _image: string;
  set_image: any;
  _name: string;
  set_name: any;
  _colour: string;
  set_colour: any;
  _size: string;
  set_size: any;
  _priceUk: string;
  set_priceUk: any;
  _priceKr: string;
  set_priceKr: any;
  _quantity: string;
  set_quantity: any;
  _brandname: string;
  set_brandname: any;
  _categoryname: string;
  set_categoryname: any;
  _status: string;
  set_status: any;
  _link: string;
  set_link: any;
  brands: IBrand[];
  categories: ICate[];
  preview: null,
  setPreview: any;
}

const EditProduct: FC<Props> = ({ 
  editSubmit,
  formRef, 
  _image,
  set_image,
  _name,
  set_name,
  _colour,
  set_colour,
  _size,
  set_size,
  _priceUk,
  set_priceUk,
  _priceKr,
  set_priceKr,
  _quantity,
  set_quantity,
  _brandname,
  set_brandname,
  _categoryname,
  set_categoryname,
  _status,
  set_status,
  _link,
  set_link,
  brands,
  categories,
  preview,
  setPreview  
}) => {

  const onChangeImage = (e: any) => {
    if(e.target.files[0]) {
      console.log(e.target.files)
      set_image(e.target.files[0]);

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      })
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <div className="modal fade" id="editProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
              
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
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

            {/* Tab panes */}
            <div className="tab-content">             
              <div role="tabpanel" className="tab-pane active" id="photo">
                <form id="updateProductImageForm" className="form-horizontal" >
                <br />
                <div id="edit-productPhoto-messages"></div>
                <div className="form-group">
                  <label htmlFor="productImage" className="col-sm-3 control-label">Product Image </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">							    				   
                    <img src={preview?preview:_image} id="getProductImage" className="thumbnail" style={{ width: '250px', height: '250px' }} alt='productname' />
                  </div>
                </div> {/*<!-- /form-group-->*/}	     	           	       
                
                <div className="form-group">
                  <label htmlFor="productImage" className="col-sm-3 control-label">Select Photo </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    {/*<!-- the avatar markup -->*/}
                    <div id="kv-avatar-errors-1" className="center-block" style={{ display: 'none' }} ></div>							
                    <div className="kv-avatar center-block">					        
                    <input onChange={onChangeImage} type="file" className="form-control file-loading" id="productImage" name="productImage" style={{ width: 'auto' }} />
                    </div>
                  </div>
                </div> {/*<!-- /form-group-->*/}	     	           	       
                <div className="modal-footer productPhotoFooter">
                  <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
                  {/*<!-- <button type="submit" className="btn btn-success" id="productImageBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button> -->*/}
                </div>
                {/*<!-- /modal-footer -->*/}
                </form>
                {/*<!-- /form -->*/}
              </div>
              {/* end product image form */}

              <div role="tabpanel" className="tab-pane" id="productInfo">
                <form onSubmit={editSubmit} className="form-horizontal" id="productForm">				    
                <br />
                <div id="edit-product-messages"></div>

                <div className="form-group" ref={formRef}>
                  <label htmlFor="productName" className="col-sm-3 control-label">Product Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_name} onChange={(e) => set_name(e.target.value)} type="text" className="form-control" id="productName" name="productName" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	

                <div className="form-group">
                  <label htmlFor="editColour" className="col-sm-3 control-label">Colour: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_colour} onChange={(e) => set_colour(e.target.value)} type="text" className="form-control" id="editColour" name="editColour" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}   

                <div className="form-group">
                  <label htmlFor="editSize" className="col-sm-3 control-label">Size: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_size} onChange={(e) => set_size(e.target.value)} type="text" className="form-control" id="editSize" name="editSize" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}  

                <div className="form-group">
                  <label htmlFor="priceUk" className="col-sm-3 control-label">price(Uk): </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_priceUk} onChange={(e) => set_priceUk(e.target.value)} type="text" className="form-control" id="priceUk" name="priceUk" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	      	 

                <div className="form-group">
                  <label htmlFor="priceKr" className="col-sm-3 control-label">price(KR): </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_priceKr} onChange={(e) => set_priceKr(e.target.value)} type="text" className="form-control" id="priceKr" name="priceKr" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	  

                <div className="form-group">
                  <label htmlFor="editQuantity" className="col-sm-3 control-label">Quantity: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={_quantity} onChange={(e) => set_quantity(e.target.value)} type="text" className="form-control" id="editQuantity" name="editQuantity" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}     	        

                <div className="form-group">
                  <label htmlFor="editBrandName" className="col-sm-3 control-label">Brand Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select value={_brandname} onChange={(e) => set_brandname(e.target.value)} className="form-control" id="editBrandName" name="editBrandName">
                      <option value="">--SELECT--</option>
                      {brands?.map((brand, index) => {
                        return (
                          <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
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
                    <select value={_categoryname} onChange={(e) => set_categoryname(e.target.value)} className="form-control" id="editCategoryName" name="editCategoryName" >
                      <option value="">--SELECT--</option>
                      {categories?.map((cate,index) => {
                        return (
                          <option key={cate.categories_id} value={cate.categories_id}>{cate.categories_name}</option>
                        )
                      })       
                   }
                    </select>
                  </div>
                </div> {/*<!-- /form-group-->*/}					        	         	       

                <div className="form-group">
                  <label htmlFor="editLink" className="col-sm-3 control-label">Link: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                  <input value={_link} onChange={(e) =>set_link(e.target.value)} type="text" className="form-control" id="priceKr" name="priceKr" autoComplete="off" />
                  </div>
                </div> {/*<!-- /form-group-->*/}	

                <div className="form-group">
                  <label htmlFor="editProductStatus" className="col-sm-3 control-label">Status: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select value={_status} onChange={(e) =>set_status(e.target.value)} className="form-control" id="editProductStatus" name="editProductStatus">
                      <option value="">--SELECT--</option>
                      <option value="1">Available</option>
                      <option value="2">Not Available</option>
                    </select>
                  </div>
                </div> {/*<!-- /form-group-->*/}	

                <div className="modal-footer editProductFooter">
                  <button type="button" className="btn btn-default" data-dismiss="modal"> 
                  <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
                  <button onSubmit={editSubmit} type="submit" className="btn btn-success" id="productBtn" data-loading-text="Loading..."> 
                  <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
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
  )
}

export default EditProduct;
