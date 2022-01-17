import { FC } from 'react'

interface Props {
  removeClick: any;
}

const RemoveProduct:FC<Props> = ({ removeClick }) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id="removeProductModal">
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
          <button type="button" onClick={() => removeClick()} className="btn btn-primary" id="removeProductBtn" data-loading-text="Loading...">
            <i className="glyphicon glyphicon-ok-sign"></i> Save changes</button>
        </div>
      </div>{/* <!-- /.modal-content --> */}
    </div>{/* <!-- /.modal-dialog --> */}
  </div>
  )
}

export default RemoveProduct
