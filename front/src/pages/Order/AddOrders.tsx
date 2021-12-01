import React from 'react'

const AddOrders = () => {
  return (
    <div className="container">    
    <ol className="breadcrumb">
      <li><a href="dashboard.php">Home</a></li>
      <li>Order</li>
      <li className="active">
        {/*php if($_GET['o'] == 'add') { */}
          Add Order
        {/*php } else if($_GET['o'] == 'manord') { */}
          Manage Order
        {/*php } // /else manage order */}
      </li>
    </ol>

    <h4>
      <i className='glyphicon glyphicon-circle-arrow-right'></i>
      {/*php if($_GET['o'] == 'add') {
        echo "Add Order";
      } else if($_GET['o'] == 'manord') { 
        echo "Manage Order";
      } else if($_GET['o'] == 'editOrd') { 
        echo "Edit Order";
      }
      */}	
    </h4>

    <div className="panel panel-default">
      <div className="panel-heading">

        {/*php if($_GET['o'] == 'add') { */}
          <i className="glyphicon glyphicon-plus-sign"></i>	Add Order
        {/*php } else if($_GET['o'] == 'manord') { */}
          <i className="glyphicon glyphicon-edit"></i> Manage Order
        {/*php } else if($_GET['o'] == 'editOrd') { */}
          <i className="glyphicon glyphicon-edit"></i> Edit Order
        {/*php } */}

      </div> {/*<!--/panel-->*/}	
      <div className="panel-body">
          
        {/*php if($_GET['o'] == 'add') { 
          // add order
			*/}			

			<div className="success-messages"></div> {/*<!--/success-messages-->*/}

  		<form className="form-horizontal" method="POST" action="php_action/createOrder.php" id="createOrderForm">

			  <div className="form-group">
			    <label htmlFor="orderDåate" className="col-sm-2 control-label">Order Date</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="orderDate" name="orderDate" autoComplete="off" />
			    </div>
			  </div> {/*<!--/form-group-->*/}
			  <div className="form-group">
			    <label htmlFor="clientName" className="col-sm-2 control-label">Client Name</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="clientName" name="clientName" placeholder="Client Name" autoComplete="off" />
			    </div>
			  </div> {/*<!--/form-group-->*/}
			  <div className="form-group">
			    <label htmlFor="clientContact" className="col-sm-2 control-label">Client Contact</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="clientContact" name="clientContact" placeholder="Contact Number" autoComplete="off" />
			    </div>
			  </div> {/*<!--/form-group-->*/}			  

			  <table className="table" id="productTable">
			  	<thead>
			  		<tr>			  			
			  			<th style={{ width: '40%' }}>Product</th>
			  			<th style={{ width: '20%' }}>Rate</th>
			  			<th style={{ width: '15%' }}>Quantity</th>			  			
			  			<th style={{ width: '15%' }}>Total</th>			  			
			  			<th style={{ width: '10%' }}></th>
			  		</tr>
			  	</thead>
			  	<tbody>
			  		{/* {/*php
			  		$arrayNumber = 0;
			  		for($x = 1; $x < 4; $x++) { */}
			  			 <tr id='tr' className='tr'>			  				 
			  				<td style={{ marginLeft: '20px' }} >
			  					<div className="form-group">

			  					<select className="form-control" name="productName" id="d" >
			  						<option value="">--SELECT--</option>
			  						{/* {/*php
			  							$productSql = "SELECT * FROM product WHERE active = 1 AND status = 1 AND quantity != 0";
			  							$productData = $connect->query($productSql);

			  							while($row = $productData->fetch_array()) {									 		
			  								echo "<option value='".$row['product_id']."' id='changeProduct".$row['product_id']."'>".$row['product_name']."</option>";
										 	} // /while 

			  						*/} 
		  						</select>
			  					</div>
			  				</td>
			  				<td style={{ paddingLeft : '20px' }}>			  					
			  					<input type="text" name="rate[]" id="rate{/*php echo $x; */}" autoComplete="off" disabled={true} className="form-control" />			  					
			  					<input type="hidden" name="rateValue[]" id="rateValue{/*php echo $x; */}" autoComplete="off" className="form-control" />			  					
			  				</td>
			  				<td style={{ paddingLeft : '20px' }}>	
			  					<div className="form-group">
			  					<input type="number" name="quantity[]" id="quantity{/*php echo $x; */}" autoComplete="off" className="form-control" min="1" />
			  					</div>
			  				</td>
			  				<td style={{ paddingLeft : '20px' }}>			  					
			  					<input type="text" name="total[]" id="total{/*php echo $x; */}" autoComplete="off" className="form-control"  />			  					
			  					<input type="hidden" name="totalValue[]" id="totalValue{/*php echo $x; */}" autoComplete="off" className="form-control" />			  					
			  				</td>
			  				<td>

			  					<button className="btn btn-default removeProductRowBtn" type="button" id="removeProductRowBtn"  ><i className="glyphicon glyphicon-trash"></i></button>
			  				</td>
			  			</tr>
		  			{/*php
		  			$arrayNumber++;
			  		} // /for
			  		*/}
			  	</tbody>			  	
			  </table>

			  <div className="col-md-6">
			  	<div className="form-group">
				    <label htmlFor="subTotal" className="col-sm-3 control-label">Sub Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="subTotal" name="subTotal" />
				      <input type="hidden" className="form-control" id="subTotalValue" name="subTotalValue" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  
				  <div className="form-group">
				    <label htmlFor="vat" className="col-sm-3 control-label">VAT 13%</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="vat" name="vat" />
				      <input type="hidden" className="form-control" id="vatValue" name="vatValue" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  
				  <div className="form-group">
				    <label htmlFor="totalAmount" className="col-sm-3 control-label">Total Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="totalAmount" name="totalAmount" />
				      <input type="hidden" className="form-control" id="totalAmountValue" name="totalAmountValue" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  
				  <div className="form-group">
				    <label htmlFor="discount" className="col-sm-3 control-label">Discount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="discount" name="discount" autoComplete="off" />
				    </div>
				  </div> {/*<!--/form-group-->*/}	
				  <div className="form-group">
				    <label htmlFor="grandTotal" className="col-sm-3 control-label">Grand Total</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="grandTotal" name="grandTotal" />
				      <input type="hidden" className="form-control" id="grandTotalValue" name="grandTotalValue" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  		  
			  </div> {/*<!--/col-md-6-->*/}

			  <div className="col-md-6">
			  	<div className="form-group">
				    <label htmlFor="paid" className="col-sm-3 control-label">Paid Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="paid" name="paid" autoComplete="off" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  
				  <div className="form-group">
				    <label htmlFor="due" className="col-sm-3 control-label">Due Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="due" name="due" />
				      <input type="hidden" className="form-control" id="dueValue" name="dueValue" />
				    </div>
				  </div> {/*<!--/form-group-->*/}		
				  <div className="form-group">
				    <label htmlFor="clientContact" className="col-sm-3 control-label">Payment Type</label>
				    <div className="col-sm-9">
				      <select className="form-control" name="paymentType" id="paymentType">
				      	<option value="">~~SELECT~~</option>
				      	<option value="1">Cheque</option>
				      	<option value="2">Cash</option>
				      	<option value="3">Credit Card</option>
				      </select>
				    </div>
				  </div> {/*<!--/form-group-->*/}							  
				  <div className="form-group">
				    <label htmlFor="clientContact" className="col-sm-3 control-label">Payment Status</label>
				    <div className="col-sm-9">
				      <select className="form-control" name="paymentStatus" id="paymentStatus">
				      	<option value="">~~SELECT~~</option>
				      	<option value="1">Full Payment</option>
				      	<option value="2">Advance Payment</option>
				      	<option value="3">No Payment</option>
				      </select>
				    </div>
				  </div> {/*<!--/form-group-->*/}							  
			  </div> {/*<!--/col-md-6-->*/}

			  <div className="form-group submitButtonFooter">
			    <div className="col-sm-offset-2 col-sm-10">
			    <button type="button" className="btn btn-default"  id="addRowBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-plus-sign"></i> Add Row </button>

			      <button type="submit" id="createOrderBtn" data-loading-text="Loading..." className="btn btn-success"><i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>

			      <button type="reset" className="btn btn-default"  ><i className="glyphicon glyphicon-erase"></i> Reset</button>
			    </div>
			  </div>
			</form>

		{/*php } else if($_GET['o'] == 'manord') { 
			// manage order
			*/}

			<div id="success-messages"></div>
			
			<table className="table" id="manageOrderTable">
				<thead>
					<tr>
						<th>#</th>
						<th>Order Date</th>
						<th>Client Name</th>
						<th>Contact</th>
						<th>Total Order Item</th>
						<th>Payment Status</th>
						<th>Option</th>
					</tr>
				</thead>
			</table>

		{/*php 
		// /else manage order
		} else if($_GET['o'] == 'editOrd') {
			// get order
			*/}
			
			<div className="success-messages"></div> 	{/*<!--/success-messages-->*/}	

  		<form className="form-horizontal" id="editOrderForm">

  			{/*php $orderId = $_GET['i'];

  			$sql = "SELECT orders.order_id, orders.order_date, orders.client_name, orders.client_contact, orders.sub_total, orders.vat, orders.total_amount, orders.discount, orders.grand_total, orders.paid, orders.due, orders.payment_type, orders.payment_status FROM orders 	
					WHERE orders.order_id = {$orderId}";

				$result = $connect->query($sql);
				$data = $result->fetch_row();				
  			*/}

			  <div className="form-group">
			    <label htmlFor="orderDate" className="col-sm-2 control-label">Order Date</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="orderDate" name="orderDate" autoComplete="off" value="{/*php echo $data[1] */}" />
			    </div>
			  </div> {/*<!--/form-group-->*/}	
			  <div className="form-group">
			    <label htmlFor="clientName" className="col-sm-2 control-label">Client Name</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="clientName" name="clientName" placeholder="Client Name" autoComplete="off" value="{/*php echo $data[2] */}" />
			    </div>
			  </div> {/*<!--/form-group-->*/}	
			  <div className="form-group">
			    <label htmlFor="clientContact" className="col-sm-2 control-label">Client Contact</label>
			    <div className="col-sm-10">
			      <input type="text" className="form-control" id="clientContact" name="clientContact" placeholder="Contact Number" autoComplete="off" value="{/*php echo $data[3] */}" />
			    </div>
			  </div> {/*<!--/form-group-->*/}			  

			  <table className="table" id="productTable">
			  	<thead>
			  		<tr>			  			
			  			<th style={{ width: '40%' }}>Product</th>
			  			<th style={{ width: '20%' }}>Rate</th>
			  			<th style={{ width: '15%' }}>Quantity</th>			  			
			  			<th style={{ width: '15%' }}>Total</th>			  			
			  			<th style={{ width: '10%' }}></th>
			  		</tr>
			  	</thead>
			  	<tbody>
			  		{/*php

			  		$orderItemSql = "SELECT order_item.order_item_id, order_item.order_id, order_item.product_id, order_item.quantity, order_item.rate, order_item.total FROM order_item WHERE order_item.order_id = {$orderId}";
						$orderItemResult = $connect->query($orderItemSql);
						// $orderItemData = $orderItemResult->fetch_all();						
						
						// print_r($orderItemData);
			  		$arrayNumber = 0;
			  		// for($x = 1; $x <= count($orderItemData); $x++) {
			  		$x = 1;
			  		while($orderItemData = $orderItemResult->fetch_array()) { 
			  			// print_r($orderItemData); */}
			  			<tr id="row{/*php echo $x; */}" className="{/*php echo $arrayNumber; */}">			  				
			  				<td style={{ marginLeft: '20px' }}>
			  					<div className="form-group">

			  					<select className="form-control" name="productName[]" id="productName{/*php echo $x; */}"  >
			  						<option value="">--SELECT--</option>
			  						{/*php
			  							$productSql = "SELECT * FROM product WHERE active = 1 AND status = 1 AND quantity != 0";
			  							$productData = $connect->query($productSql);

			  							while($row = $productData->fetch_array()) {									 		
			  								$selected = "";
			  								if($row['product_id'] == $orderItemData['product_id']) {
			  									$selected = "selected";
			  								} else {
			  									$selected = "";
			  								}

			  								echo "<option value='".$row['product_id']."' id='changeProduct".$row['product_id']."' ".$selected." >".$row['product_name']."</option>";
										 	} // /while 

			  						*/}
		  						</select>
			  					</div>
			  				</td>
			  				<td style={{ paddingLeft: '20px' }}>			  					
			  					<input type="text" name="rate[]" id="rate{/*php echo $x; */}" autoComplete="off"  className="form-control" value="{/*php echo $orderItemData['rate']; */}" />			  					
			  					<input type="hidden" name="rateValue[]" id="rateValue{/*php echo $x; */}" autoComplete="off" className="form-control" value="{/*php echo $orderItemData['rate']; */}" />			  					
			  				</td>
			  				<td style={{ paddingLeft: '20px' }}>
			  					<div className="form-group">
			  					<input type="number" name="quantity[]" id="quantity{/*php echo $x; */}" autoComplete="off" className="form-control" min="1" value="{/*php echo $orderItemData['quantity']; */}" />
			  					</div>
			  				</td>
			  				<td style={{ paddingLeft: '20px' }}>			  					
			  					<input type="text" name="total[]" id="total{/*php echo $x; */}" autoComplete="off" className="form-control"  value="{/*php echo $orderItemData['total']; */}"/>			  					
			  					<input type="hidden" name="totalValue[]" id="totalValue{/*php echo $x; */}" autoComplete="off" className="form-control" value="{/*php echo $orderItemData['total']; */}"/>			  					
			  				</td>
			  				<td>

			  					<button className="btn btn-default removeProductRowBtn" type="button" id="removeProductRowBtn" ><i className="glyphicon glyphicon-trash"></i></button>
			  				</td>
			  			</tr>
		  			{/*php
		  			$arrayNumber++;
		  			$x++;
			  		} // /for
			  		*/}
			  	</tbody>			  	
			  </table>

			  <div className="col-md-6">
			  	<div className="form-group">
				    <label htmlFor="subTotal" className="col-sm-3 control-label">Sub Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="subTotal" name="subTotal"  value="{/*php echo $data[4] */}" />
				      <input type="hidden" className="form-control" id="subTotalValue" name="subTotalValue" value="{/*php echo $data[4] */}" />
				    </div>
				  </div> {/*<!--/form-group-->*/}				  
				  <div className="form-group">
				    <label htmlFor="vat" className="col-sm-3 control-label">VAT 13%</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="vat" name="vat"  value="{/*php echo $data[5] */}"  />
				      <input type="hidden" className="form-control" id="vatValue" name="vatValue" value="{/*php echo $data[5] */}"  />
				    </div>
				  </div> {/*<!--/form-group-->*/}				  
				  <div className="form-group">
				    <label htmlFor="totalAmount" className="col-sm-3 control-label">Total Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="totalAmount" name="totalAmount"  value="{/*php echo $data[6] */}" />
				      <input type="hidden" className="form-control" id="totalAmountValue" name="totalAmountValue" value="{/*php echo $data[6] */}"  />
				    </div>
				  </div> {/*<!--/form-group-->*/}				  
				  <div className="form-group">
				    <label htmlFor="discount" className="col-sm-3 control-label">Discount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="discount" name="discount" autoComplete="off" value="{/*php echo $data[7] */}" />
				    </div>
				  </div> {/*<!--/form-group-->*/}		
				  <div className="form-group">
				    <label htmlFor="grandTotal" className="col-sm-3 control-label">Grand Total</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="grandTotal" name="grandTotal"  value="{/*php echo $data[8] */}"  />
				      <input type="hidden" className="form-control" id="grandTotalValue" name="grandTotalValue" value="{/*php echo $data[8] */}"  />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  		  
			  </div> {/*<!--/col-md-6-->*/}

			  <div className="col-md-6">
			  	<div className="form-group">
				    <label htmlFor="paid" className="col-sm-3 control-label">Paid Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="paid" name="paid" autoComplete="off" />
				    </div>
				  </div> {/*<!--/form-group-->*/}			  
				  <div className="form-group">
				    <label htmlFor="due" className="col-sm-3 control-label">Due Amount</label>
				    <div className="col-sm-9">
				      <input type="text" className="form-control" id="due" name="due"  value="{/*php echo $data[10] */}"  />
				      <input type="hidden" className="form-control" id="dueValue" name="dueValue" value="{/*php echo $data[10] */}"  />
				    </div>
				  </div> {/*<!--/form-group-->*/}		
				  <div className="form-group">
				    <label htmlFor="clientContact" className="col-sm-3 control-label">Payment Type</label>
				    <div className="col-sm-9">
				      <select className="form-control" name="paymentType" id="paymentType" >
				      	<option value="" >--SELECT--</option>
				      	<option value="1" >Cheque</option>
				      	<option value="2" >Cash</option>
				      	<option value="3" >Credit Card</option>
				      </select>
				    </div>
				  </div> {/*<!--/form-group-->*/}							  
				  <div className="form-group">
				    <label htmlFor="clientContact" className="col-sm-3 control-label">Payment Status</label>
				    <div className="col-sm-9">
				      <select className="form-control" name="paymentStatus" id="paymentStatus">
				      	<option value="" >--SELECT--</option>
				      	<option value="1" >Full Payment</option>
				      	<option value="2" >Advance Payment</option>
				      	<option value="3" >No Payment</option>
				      </select>
				    </div>
				  </div> {/*<!--/form-group-->*/}							  
			  </div> {/*<!--/col-md-6-->*/}


			  <div className="form-group editButtonFooter">
			    <div className="col-sm-offset-2 col-sm-10">
			    <button type="button" className="btn btn-default"  id="addRowBtn" data-loading-text="Loading..."> <i className="glyphicon glyphicon-plus-sign"></i> Add Row </button>

			    <input type="hidden" name="orderId" id="orderId" value="{/*php echo $_GET['i']; */}" />

			    <button type="submit" id="editOrderBtn" data-loading-text="Loading..." className="btn btn-success"><i className="glyphicon glyphicon-ok-sign"></i> Save Changes</button>
			      
			    </div>
			  </div>
			</form>

			{/*php
		} // /get order else  */}

    </div> {/*<!--/panel-->*/}	
  </div> {/*<!--/panel-->*/}
  </div>
  )
}

export default AddOrders
