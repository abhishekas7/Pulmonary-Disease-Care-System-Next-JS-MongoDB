
import db from '@/util/db';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';

function Ordered({orderdetails}) {

    const [orders, setOrders] = useState(orderdetails);

    const { data: session, status } = useSession();
    const id = session.user._id;
    
    // useEffect(() => {
    //   async function fetchOrders() {
    //     const response = await axios.get(`/api/orders/${id}/singleorder`);
    
    //     if (response.status === 200) {
    //         setOrders([response.data]); // Convert orders to array and set state
    //     }
    //   }
    
    //   fetchOrders();
    // }, [status, session]);
    
    console.log(orders);
    
  return (
    <div>
        <div className="col-12">
  <div className="card recent-sales overflow-auto">

    <div className="card-body">
      <h5 className="card-title">
        Orders<span></span>
      </h5>


      <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
        <div className="dataTable-top">
          <div className="dataTable-dropdown">
            <label>
              <select className="dataTable-selector">
                <option value={5}>5</option>
                <option value={10} selected="">
                  10
                </option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>{" "}
              entries per page
            </label>
          </div>
          <div className="dataTable-search">
            <input
              className="dataTable-input"
              placeholder="Search..."
              type="text"
            />
          </div>
        </div>
        <div className="dataTable-container">
          <table className="table table-borderless datatable dataTable-table">
            <thead>

     
              <tr>
                <th scope="col" data-sortable="" style={{ width: "10.9116%" }}>
                  <a href="#" className="dataTable-sorter">
                   Order ID
                  </a>
                </th>
                <th scope="col" data-sortable="" style={{ width: "24.0331%" }}>
                  <a href="#" className="dataTable-sorter">
                    Order
                  </a>
                </th>
                <th scope="col" data-sortable="" style={{ width: "40.1934%" }}>
                  <a href="#" className="dataTable-sorter">
                    Product
                  </a>
                </th>
                <th
                  scope="col"
                  data-sortable=""
                  style={{ width: "9.80663%" }}
                  className="asc"
                  aria-sort="ascending"
                >
                  <a href="#" className="dataTable-sorter">
                    Price
                  </a>
                </th>
                <th scope="col" data-sortable="" style={{ width: "15.0552%" }}>
                  <a href="#" className="dataTable-sorter">
                    Status
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
{orders.length>0?orders.map((item,i)=>(
<tr>
<td>{item._id}</td>
 <td>{item._id}</td>
 <td></td>
 <td></td>
 <td></td>
</tr>
)):(<p></p>)}


</tbody>


          </table>
        </div>
        <div className="dataTable-bottom">
          <div className="dataTable-info">Showing 1 to 5 of 5 entries</div>
          <nav className="dataTable-pagination">
            <ul className="dataTable-pagination-list" />
          </nav>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}

export default Ordered


