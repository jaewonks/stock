import React from 'react'
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment';

const Dashboard = () => {

  // const getProducts = () => {
  //   axios
  //   .get('api/products')
  //   .then((response) => {
  //     if(response.statusText !== 'OK') {
  //       throw new Error(response.data.message);
  //     }
  //     return response.data
  //   })    
  //   .catch((error) => {
  //     return { error: error.response.data.message || error.message }
  //   })
  // }

  return (
    <div className="container">
    <div className="row">
      
    <div className="col-md-4">
      <div className="panel panel-success">
        <div className="panel-heading">
          <Link to='product' style={{ textDecoration: 'none', color: 'black' }}>
            Total Product
            <span className="badge pull pull-right">2
              {/* <?php echo $countProduct; ?> */}
            </span>	
          </Link>
          
        </div> {/*<!--/panel-hdeaing-->*/}
      </div>{/*  <!--/panel--> */}
    </div>{/*  <!--/col-md-4--> */}

      <div className="col-md-4">
        <div className="panel panel-info">
        <div className="panel-heading">
          <Link to='order' style={{ textDecoration: 'none', color: 'black' }}>
            Total Orders
            <span className="badge pull pull-right">{/*<?php echo $countOrder; ?>*/}</span>
          </Link>           
        </div>{/*  <!--/panel-hdeaing--> */}
      </div>
      </div>{/*  <!--/col-md-4--> */}

    <div className="col-md-4">
      <div className="panel panel-danger">
        <div className="panel-heading">
            <Link to='product' style={{ textDecoration: 'none', color: 'black' }}>
              Low Stock
              <span className="badge pull pull-right">
                {/* <?php echo $countLowStock; ?> */}
              </span>	
            </Link>
          </div>{/*  <!--/panel-hdeaing--> */}
        </div>{/*  <!--/panel--> */}
      </div>

    <div className="col-md-4">
      <div className="card">
        <div className="cardHeader">
        <h1>{/* <?php echo date('d'); ?> */}</h1>
        </div>

        <div className="cardContainer">
          <p>{moment().format('dddd DD MMM YYYY HH:mm:ss')}{/*<?php echo date('l') .' '.date('d').', '.date('Y'); ?>*/}</p>
        </div>
      </div> 
      <br/>

      <div className="card">
        <div className="cardHeader"  style={{ backgroundColor: '#245580' }}>
          <h1>{/*<?php if($totalRevenue) {
            echo $totalRevenue;
            } else {
              echo '0';
              } ?>*/}</h1>
        </div>

        <div className="cardContainer">
          <p> <i className="glyphicon glyphicon-gbp"></i> Total Revenue</p>
        </div>
      </div> 

    </div>

    <div className="col-md-8">
      <div className="panel panel-default">
        <div className="panel-heading"> <i className="glyphicon glyphicon-calendar"></i> Calendar</div>
        <div className="panel-body">
          <div id="calendar">
          <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
          />
          </div>
        </div>	
      </div>
      </div>
    </div>	
  </div> 
  )
}

export default Dashboard
