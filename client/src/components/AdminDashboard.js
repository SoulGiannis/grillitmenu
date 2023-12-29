import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Menu.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('AdminDashboard component mounted');

    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();

    const socket = new WebSocket('ws://localhost:5001');


    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      const newOrder = JSON.parse(event.data);
      console.log('WebSocket message received:', newOrder);
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
      console.log('AdminDashboard component unmounted');
    };
  }, []);


// pdf download
const downloadOrdersPDF = () => {
  const doc = new jsPDF();

  // Add header
  doc.text('Order Details', 20, 10);

  // Add table content
  const tableData = orders.map((order, index) => [
    orders.length - index,
    order._id,
    order.tableNumber,
    order.orderItems.map(item => `${item.name} x ${item.quantity}`).join('\n'),
    `${order.totalBill}`
  ]);

  // Calculate overall total
  const overallTotal = orders.reduce((total, order) => total + order.totalBill, 0);
  // Add a new row for overall total
  tableData.push(['', '', '', 'Overall Total', `${overallTotal}`]);

  // Adjust index calculation for consistency
  const columns = ['Sr.', 'Order ID', 'Table Number', 'Items', 'Total Bill'];

  doc.autoTable({
    head: [columns],
    body: tableData,
    startY: 20,
  });

  // Save the PDF
  doc.save('orders.pdf');
};


  // delete
const deleteOrder = async (orderId) => {
  // Show confirmation dialog
  const confirmDelete = window.confirm('Delete this order?');

  if (confirmDelete) {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);

      // Remove the deleted order from the state
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }
};

const clearAllOrders = async () => {
  // Show confirmation dialog
  const confirmClear = window.confirm('Clear all orders?');

  if (confirmClear) {
    try {
      await axios.delete('http://localhost:5000/api/orders');

      // Clear all orders from the state
      setOrders([]);
    } catch (error) {
      console.error('Error clearing orders:', error);
    }
  }
};

  

  // useEffect(() => {
  //   // Effect for refreshing the page every 10 seconds
  //   const refreshPage = setInterval(() => {
  //     window.location.reload();
  //   }, 5000);

  //   // Cleanup function (optional)
  //   return () => {
  //     clearInterval(refreshPage);
  //   };
  // }, []);
  return (
    <div>
      <div className='main-div-admin'>
      <h1 className='txt-menu1'>Admin Dashboard</h1>
      <div className='daj'>
        <button className='txt-menu4 top-btn-admin' onClick={clearAllOrders}>Clear Orders <FontAwesomeIcon icon={faTrash} /></button>
        <button className='txt-menu4 top-btn-admin' onClick={downloadOrdersPDF}>Download Orders PDF</button>
      </div>
        <table className='txt-menu3 table-admin'>
          <thead style={{backgroundColor: "white"}}>
            <tr  style={{backgroundColor: "white"}}>
              <th   className='br-th'>Sr.</th>
              <th   className='br-th'>Order ID</th>
              <th   className='br-th'>Table Number</th>
              <th   className='br-th'>Items</th>
              <th   className='br-th'>Total Bill</th>
              <th   className='br-th'>Clear</th>
            </tr>
          </thead>
          <tbody  style={{backgroundColor: "white"}}>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td className='br-td br-td-lt'>{orders.length - index}</td>
                <td  className='br-td br-td-lt'>{order._id}</td>
                <td  className='br-td'>{order.tableNumber}</td>
                <td  className='br-td'>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.id}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className='br-td'>₹{order.totalBill}</td>
                <td   className='br-td delete-icon' onClick={() => deleteOrder(order._id)}><FontAwesomeIcon icon={faTrash} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
