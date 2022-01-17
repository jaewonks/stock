import { FC } from 'react'

interface Props {
  addBrand: boolean;
  addBrandError: boolean;
  addSubmit: any;
  formRef: any;
  emptybrandname: string;
  emptybrandstatus: string;
  brandname: string;
  onChangeBrandname: any;
  brandabbre: string;
  onChangeBrandabbre: any;
  brandstatus: string;
  onChangeBrandstatus: any;
  loading: boolean;
}

const AddBrand: FC<Props>= ({ 
  addBrand, 
  addBrandError,
  addSubmit, 
  formRef,
  emptybrandname,
  emptybrandstatus,
  brandname,
  onChangeBrandname,
  brandabbre,
  onChangeBrandabbre,
  brandstatus,
  onChangeBrandstatus,
  loading
}) => {
  return (
    <div className="modal fade" id="addBrandModel" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Add Brand */}
          <form onSubmit={addSubmit} className="form-horizontal" id="submitBrandForm">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title"><i className="fa fa-plus"></i> Add Brand</h4>
            </div>
            <div className="modal-body">

              <div id="add-brand-messages">
              {addBrand? addBrandError ? 
                <div className="alert alert-danger">
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                <strong><i className="glyphicon glyphicon-ok-sign"></i></strong> Error while adding the brand </div>
                : 
                <div className="alert alert-success">
                  <button type="button" className="close" data-dismiss="alert">&times;</button>
                  <strong><i className="glyphicon glyphicon-ok-sign"></i></strong> Successfully Added
                </div>
              : ''
              }   
              </div>

              <div className="form-group" ref={formRef}>
                <label htmlFor="brandName" className="col-sm-3 control-label">Brand Name: </label>
                <label className="col-sm-1 control-label">: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="brandName" placeholder="Brand Name" name="brandName" value={brandname} onChange={onChangeBrandname} autoComplete="off" />
                  <p className="text-danger">{emptybrandname}</p>
                </div>
              </div> {/* <!-- /form-group--> */}	  
              <div className="form-group" ref={formRef}>
                <label htmlFor="brandAbbre" className="col-sm-3 control-label">Brand Acronmy </label>
                <label className="col-sm-1 control-label">: </label>
                <div className="col-sm-8">
                  <input type="text" className="form-control" id="brandAbbre" placeholder="Brand Abbre" name="brandAbbre" value={brandabbre} onChange={onChangeBrandabbre} autoComplete="off" />
                  <p className="text-danger"></p>
                </div>
              </div> {/* <!-- /form-group--> */}       	        
              <div className="form-group" ref={formRef}>
                <label htmlFor="brandStatus" className="col-sm-3 control-label">Status: </label>
                <label className="col-sm-1 control-label">: </label>
                <div className="col-sm-8">
                  <select className="form-control" id="brandStatus" name="brandStatus" value={brandstatus} onChange={onChangeBrandstatus} >
                    <option value="">--SELECT--</option>
                    <option value="1">Available</option>
                    <option value="2">Not Available</option>
                  </select>
                  <p className="text-danger">{emptybrandstatus}</p>
                </div>
              </div> {/* <!-- /form-group--> */}	         	        
            </div> {/* <!-- /modal-body --> */}
            
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" id="createBrandBtn" >{loading?'Loading...':'Save Changes'}</button>
            </div>{/* <!-- /modal-footer --> */}
          </form>{/* <!-- /.form --> */}
        </div>{/* <!-- /modal-content --> */}
      </div>{/* <!-- /modal-dailog --> */}
    </div>
  )
}

export default AddBrand
