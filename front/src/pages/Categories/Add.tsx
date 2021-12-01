import { FC } from 'react'

interface Props {
  addSubmit: any;
  categoriesname: string;
  onChangeCategoriesname: any;
  categoriesstatus: string;
  onChangeCategoriesstatus: any;
  formRef: any;
}

const AddCategory: FC<Props>= ({ 
  addSubmit, 
  categoriesname,
  onChangeCategoriesname,
  categoriesstatus,
  onChangeCategoriesstatus,
  formRef
}) => {
  return (
    <div className="modal fade" id="addCategoriesModal" tabIndex={-1} role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={addSubmit} className="form-horizontal" id="submitCategoriesForm">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title"><i className="fa fa-plus"></i> Add Categories</h4>
            </div>
            <div className="modal-body">

              <div id="add-categories-messages"></div>

              <div className="form-group">
                <label htmlFor="categoriesName" className="col-sm-4 control-label">Categories Name: </label>
                <label className="col-sm-1 control-label">: </label>
                <div className="col-sm-7">
                  <input type="text" className="form-control" id="categoriesName" placeholder="Categories Name" name="categoriesName" autoComplete="off" value={categoriesname} onChange={onChangeCategoriesname} />
                </div>
              </div> {/*<!-- /form-group-->*/}	         	        
              <div className="form-group" ref={formRef}>
                <label htmlFor="categoriesStatus" className="col-sm-4 control-label">Status: </label>
                <label className="col-sm-1 control-label">: </label>
                <div className="col-sm-7">
                  <select className="form-control" id="categoriesStatus" name="categoriesStatus" value={categoriesstatus} onChange={onChangeCategoriesstatus}>
                    <option value="">--SELECT--</option>
                    <option value="1">Available</option>
                    <option value="2">Not Available</option>
                  </select>
                </div>
              </div> {/*<!-- /form-group-->*/}	         	        
            </div> {/*<!-- /modal-body -->*/}
            
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
              <button type="submit" className="btn btn-primary" id="createCategoriesBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
            </div> {/*<!-- /modal-footer -->*/}	      
          </form> {/*<!-- /.form -->*/}	     
        </div> {/*<!-- /modal-content -->*/}    
      </div> {/*<!-- /modal-dailog -->*/}
    </div> 
  )
}

export default AddCategory;
