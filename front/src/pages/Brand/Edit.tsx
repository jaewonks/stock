import { FC } from 'react'

interface Props {
  name: string;
  setName: any;
  status: string;
  setStatus: any;
  editSubmit: any;
}

const EditBrand: FC<Props> = ({ editSubmit, name, setName, status, setStatus }) => {
  return (
    <div className="modal fade" id="editBrandModel" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={editSubmit} className="form-horizontal" id="editBrandForm">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title"><i className="fa fa-edit"></i> Edit Brand</h4>
            </div>
            <div className="modal-body">
              <div id="edit-brand-messages">
              </div>
              <div className="modal-loading div-hide" style={{ width:'50px', margin:'auto', paddingTop:'50px' ,paddingBottom:'50px'}} >
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span className="sr-only">Loading...</span>
              </div>
              <div className="edit-brand-result">
                <div className="form-group">
                  <label htmlFor="editBrandName" className="col-sm-3 control-label">Brand Name: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="editBrandName" name="editBrandName" autoComplete="off" />
                    <p className="text-danger"></p>
                  </div>
                </div> {/* <!-- /form-group--> */}	         	        
                <div className="form-group">
                  <label htmlFor="editBrandStatus" className="col-sm-3 control-label">Status: </label>
                  <label className="col-sm-1 control-label">: </label>
                  <div className="col-sm-8">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" id="editBrandStatus" name="editBrandStatus">
                      <option value="">--SELECT--</option>
                      <option value="1">Available</option>
                      <option value="2">Not Available</option>
                    </select>
                    <p className="text-danger"></p>
                  </div>
                </div> {/* <!-- /form-group--> */}	
              </div>         	        
              {/* <!-- /edit brand result --> */}
            </div> {/* <!-- /modal-body --> */}
    
            <div className="modal-footer editBrandFooter">
              <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
              <button type="submit" className="btn btn-success" id="editBrandBtn" data-loading-text="Loading..." > <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
            </div>
            {/* <!-- /modal-footer --> */}
          </form>
          {/* <!-- /.form --> */}
        </div>
        {/* <!-- /modal-content --> */}
      </div>
      {/* <!-- /modal-dailog --> */}
    </div>
  )
}

export default EditBrand
