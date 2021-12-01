import { FC } from 'react'

interface Props {
  removeClick: any;
}

const RemoveBrand:FC<Props> = ({ removeClick }) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id="removeCategoriesModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title"><i className="glyphicon glyphicon-trash"></i> Remove Categories</h4>
        </div>
        <div className="modal-body">
          <p>Do you really want to remove ?</p>
        </div>
        <div className="modal-footer removeCategoriesFooter">
          <button type="button" className="btn btn-default" data-dismiss="modal"> <i className="glyphicon glyphicon-remove-sign"></i> Close</button>
          <button type="button" onClick={() => removeClick()} className="btn btn-primary" id="removeCategoriesBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-ok-sign"></i> Save changes</button>
        </div>
      </div>{/*<!-- /.modal-content -->*/}
    </div>{/*<!-- /.modal-dialog -->*/}
  </div>
  )
}

export default RemoveBrand
