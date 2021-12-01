import React from 'react'

const Setting = () => {
  return (
    <div className="container">
    <div className="row">
      <div className="col-md-12">
        <ol className="breadcrumb">
          <li><a href="/">Home</a></li>		  
          <li className="active">Setting</li>
        </ol>

        <div className="panel panel-default">
          <div className="panel-heading">
            <div className="page-heading"> <i className="glyphicon glyphicon-wrench"></i> Setting</div>
          </div>{/* <!-- /panel-heading --> */}

          <div className="panel-body">

            

            <form className="form-horizontal" id="changeUsernameForm">
              <fieldset>
                <legend>Change Username</legend>

                <div className="changeUsenrameMessages"></div>			

                <div className="form-group">
                  <label htmlFor="username" className="col-sm-2 control-label">Username</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="username" name="username" placeholder="Usename" value="" />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <input type="hidden" name="user_id" id="user_id" value="<?php echo $result['user_id'] ?>" /> 
                    <button type="submit" className="btn btn-success" data-loading-text="Loading..." id="changeUsernameBtn"> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes </button>
                  </div>
                </div>
              </fieldset>
            </form>

            <form className="form-horizontal" id="changePasswordForm">
              <fieldset>
                <legend>Change Password</legend>

                <div className="changePasswordMessages"></div>

                <div className="form-group">
                  <label htmlFor="password" className="col-sm-2 control-label">Current Password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Current Password" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="npassword" className="col-sm-2 control-label">New password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="npassword" name="npassword" placeholder="New Password" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword" className="col-sm-2 control-label">Confirm Password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="cpassword" name="cpassword" placeholder="Confirm Password" />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <input type="hidden" name="user_id" id="user_id" value="<?php echo $result['user_id'] ?>" /> 
                    <button type="submit" className="btn btn-primary"> <i className="glyphicon glyphicon-ok-sign"></i> Save Changes </button>
                    
                  </div>
                </div>


              </fieldset>
            </form>

          </div> {/*<!-- /panel-body -->*/}		
          </div> 
        </div> {/*<!-- /panel -->*/}			
      </div> {/*<!-- /col-md-12 -->*/}		
    </div>
  )
}

export default Setting
