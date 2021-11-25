import React, { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import axios from 'axios';

const SignIn = () => {
  const [ signInError, setSignInError ] = useState(false);
  const [ username, onChangeUsername ] = useInput('');
  const [ password, onChangePassword ] = useInput('');

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    setSignInError(false);
      axios
        .post('api/users/signin', { 
          username,
          password
        })
        .then((response) => {

        })
        .catch((error) => {
          console.log(error.response);
          setSignInError(error.response?.data?.statusCode === 404);
        })
  },[username, password])

  return (
    <div>
      <div className="container">
        <div className="row vertical">
          <div className="col-md-5 col-md-offset-4">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Sign In Inventory </h3>
              </div>
              <div className="panel-body">

                <div className="messages">
                  {/*<?php if($errors) {
                    foreach ($errors as $key => $value) {
                      echo '<div className="alert alert-warning" role="alert">
                      <i className="glyphicon glyphicon-exclamation-sign"></i>
                      '.$value.'</div>';										
                      }
                    } ?>*/}
                </div>

                <form onSubmit={onSubmit} className="form-horizontal" id="loginForm">
                  <fieldset>
                    <div className="form-group">
                      <label htmlFor="username" className="col-sm-2 control-label">Username</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" id="username" name="username" placeholder="Username" value={username} onChange={onChangeUsername} autoComplete="off" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password" className="col-sm-2 control-label">Password</label>
                      <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={password} onChange={onChangePassword} autoComplete="off" />
                      </div>
                    </div>								
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button type="submit" className="btn btn-default"> <i className="glyphicon glyphicon-log-in"></i> Sign In</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
                {signInError && <p>Your username and password doesn't match</p>}
              </div>
              {/*<!-- panel-body -->*/}
            </div>
            {/*<!-- /panel -->*/}
          </div>
          {/*<!-- /col-md-4 -->*/}
        </div>
        {/*<!-- /row -->*/}
      </div>
      {/*<!-- container -->	*/}
    </div>
  )
}

export default SignIn
