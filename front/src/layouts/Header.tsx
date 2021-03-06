import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  
  useEffect(() => {
    Array.from(document.querySelectorAll("li[id*='nav']")).map((i) => i.classList.remove('active'));
    const path = location.pathname;
    const targetId = document.querySelector(`a[href="${path}"]`)?.parentElement?.id;
    const target = document.querySelector(`#${targetId}`)?.classList;
    target?.add('active');
  })

  return (
    <>
      <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
      {/* Brand and toggle get grouped for better mobile display */}
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        {/* <a className="navbar-brand" href="#">Brand</a> */}
      </div>

      {/* Collect the nav links, forms, and other content for toggling */}
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">      

        <ul className="nav navbar-nav navbar-right">        

          <li id="navDashboard"><Link to="/"><i className="glyphicon glyphicon-list-alt"></i>  Dashboard</Link></li>        
          
          <li id="navBrand"><Link to="brand"><i className="glyphicon glyphicon-btc"></i>  Brand</Link></li>        

          <li id="navCategories"><Link to="categories"> <i className="glyphicon glyphicon-th-list"></i> Category</Link></li>        

          <li id="navProduct"><Link to="product"> <i className="glyphicon glyphicon-ruble"></i> Product </Link></li>     
          
          <li id="navStock"><Link to="stock"> <i className="glyphicon glyphicon-ruble"></i> Stock </Link></li>     

          <li className="dropdown" id="navOrder">
            <Link to='#' className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i className="glyphicon glyphicon-shopping-cart"></i> Orders <span className="caret"></span></Link>
            <ul className="dropdown-menu">            
              <li id=""><Link to="order/update"> <i className="glyphicon glyphicon-plus"></i> Update Orders</Link></li>            
              <li id="topNavAddOrder"><Link to="order/add"> <i className="glyphicon glyphicon-plus"></i> Add Orders</Link></li>            
              <li id="topNavManageOrder"><Link to="order/manage"> <i className="glyphicon glyphicon-edit"></i> Manage Orders</Link></li>            
            </ul>
          </li> 

          <li id="navReport"><Link to="report"> <i className="glyphicon glyphicon-check"></i> Report </Link></li>

          <li className="dropdown" id="navSetting">
            <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i className="glyphicon glyphicon-user"></i> <span className="caret"></span></Link>
            <ul className="dropdown-menu">            
              <li id="topNavSetting"><Link to="setting"> <i className="glyphicon glyphicon-wrench"></i> Setting</Link></li>            
              <li id="topNavLogout"><Link to="logout"> <i className="glyphicon glyphicon-log-out"></i> Logout</Link></li>            
            </ul>
          </li>        
                
        </ul>
      </div>{/* /.navbar-collapse */}
    </div>{/* /.container-fluid */}
    </nav>
    </>
  )
}

export default Header
