import React from 'react'
import { Link } from 'react-router-dom';
import { LinkContainer } from '../styles';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from 'moment';

const Dashboard = () => {
  return (
    <div className="row">
      
    <div className="col-md-4">
      <div className="panel panel-success">
        <div className="panel-heading">
          
          <Link to='product'>
            Total Product
            <span className="badge pull pull-right">
              {/* <?php echo $countProduct; ?> */}
            </span>	
          </Link>
          
        </div> {/*<!--/panel-hdeaing-->*/}
      </div>{/*  <!--/panel--> */}
    </div>{/*  <!--/col-md-4--> */}

      <div className="col-md-4">
        <div className="panel panel-info">
        <div className="panel-heading">
        <LinkContainer>
          <Link to='order'>
            Total Orders
            <span className="badge pull pull-right">{/*<?php echo $countOrder; ?>*/}</span>
          </Link>
        </LinkContainer>  
            
        </div>{/*  <!--/panel-hdeaing--> */}
      </div>
      </div>{/*  <!--/col-md-4--> */}

    <div className="col-md-4">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <LinkContainer>
            <Link to='product'>
              Low Stock
              <span className="badge pull pull-right">
                {/* <?php echo $countLowStock; ?> */}
              </span>	
            </Link>
          </LinkContainer>
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
        <div className="cardHeader">
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
  )
}

export default Dashboard
