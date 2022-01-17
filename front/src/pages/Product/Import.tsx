import { FC } from 'react'

interface Props {
  importSubmit: any;
  onChangeExcelFile: any;
}

const ImportProduct: FC<Props> = ({importSubmit, onChangeExcelFile}) => {

  return (
    <div className="modal fade" id="importProductModal" tabIndex={-1} role="dialog">
    <div className="modal-dialog">
      <div className="modal-content">
        <form onSubmit={importSubmit} className="form-horizontal">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title"><i className="fa fa-plus"></i> Import Excel</h4>
          </div>
          <div className="modal-body" style={{ maxHeight:'450px', overflow:'auto' }}>
            {/* <div id="add-product-messages"></div> */}
              <label htmlFor="excelFile" className="col-sm-3 control-label">Excel Upload </label>
              <label className="col-sm-1 control-label">: </label>
              <div className="col-sm-8">
                {/*<!-- the avatar markup -->*/}
                <div id="kv-avatar-errors-1" className="center-block" style={{ display: 'none' }}></div>							
                <div className="kv-avatar center-block">					        
                    <input type="file" className="form-control file-loading" id="excelFile" name="excelFile" style={{ width: 'auto' }} onChange={onChangeExcelFile} />
                </div>
              </div>
            </div> 	

          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
            <button type="submit" className="btn btn-primary" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
          </div> {/*<!-- /modal-footer -->*/}	 
        </form>  
      </div> {/*<!-- /modal-content -->*/}    
    </div> {/*<!-- /modal-dailog -->*/}
  </div> 
  )
}

export default ImportProduct;