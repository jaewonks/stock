import React from 'react'

const Report = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="panel panel-default">
          <div className="panel-heading">
            <i className="glyphicon glyphicon-check"></i>	Order Report
          </div>
          {/*<!-- /panel-heading -->*/}
          <div className="panel-body">
            
            <form className="form-horizontal" id="getOrderReportForm">
              <div className="form-group">
                <label htmlFor="startDate" className="col-sm-2 control-label">Start Date</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="startDate" name="startDate" placeholder="Start Date" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="endDate" className="col-sm-2 control-label">End Date</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="endDate" name="endDate" placeholder="End Date" />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-success" id="generateReportBtn"> 
                    <i className="glyphicon glyphicon-ok-sign">
                    </i> Generate Report
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
          {/*<!-- /panel-body -->*/}
        </div>
      </div>
      {/*<!-- /col-dm-12 -->*/}
    </div>
  )
}

export default Report
