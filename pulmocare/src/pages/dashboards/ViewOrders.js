// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import easyinvoice from 'easyinvoice';


// eslint-disable-next-line react/prop-types
function ViewOrders({order}) {

    const [orders] = useState(order);

    useEffect(() => {
     
     console.log(orders);
    }, []);
  

  
    const generateInvoice = () => {
      // Define the invoice data
      const data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        //"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
        //"currency": "EUR", //See documentation 'Locales and Currency' for more info
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64
        "sender": {
          "company": "asd",
          "address": "Sample Street 123",
          "zip": "1234 AB",
          "city": "Sampletown",
          "country": "Samplecountry"
        },
        "client": {
          "company": "Client Corp",
          "address": "Clientstreet 456",
          "zip": "5678 CD",
          "city": "Clienttown",
          "country": "Clientcountry"
        },
        "invoiceNumber": "2021.0001",
        "invoiceDate": "1.1.2021",
        
        "products": [
          {
            "quantity": "2",
            "description": "Test1",
            "tax": 6,
            "price": 33.87
          },
          {
            "quantity": "1",
            "description": "Test2",
            "tax": 6,
            "price": 68.29
          }
        ],
        "bottomNotice": "Thank you for your business!"
      };
    
      // Generate the invoice
      easyinvoice.createInvoice(data, function(result) {
        // Download the invoice PDF
        easyinvoice.download('my_invoice.pdf', result.pdf);
      });
    }
    
  


  return (
    <div>
      <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      <link
    href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
    rel="stylesheet"
  />
      <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
      <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
      <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
      <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet" />
      {/* Template Main CSS File */}
      <link href="assets/css/style.css" rel="stylesheet" />

      <div className="col-lg-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Product Table</h5>
 
            <button onClick={generateInvoice}>Generate Invoice</button>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Shipping Info</th>
                  <th scope="col">Order Items</th>
                  <th scope="col">Payment</th>
                  <th scope="col">Payment Status</th>
                  {/* <th scope="col">Manufacturer</th>
            <th scope="col">Prescription</th>
            <th scope="col">quantity</th>
            <th scope="col">category</th>
            <th scope="col">status</th> */}
                  <th scope="col" colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>

                {

orders.map((item,i)=>(
  <tr>
    <th scope="row" key={i}>{i+1}</th>
    <td>
      <p>{item.shippingAddress.fullName}</p>
      <p>{item.shippingAddress.address}</p>
      <p>{item.shippingAddress.city}, {item.shippingAddress.postalCode}</p>
      <p>{item.shippingAddress.country}</p>
    </td>
    <td>
      {item.orderItems.map(item1 => (
        <div key={item1._id}>
          <p>{item1.name} x {item1.quantity}</p>
          <p>{item1.color}</p>
          <p>{item1.price}</p>
        </div>
                                ))}
    </td>
    {/* <td><img src={`..//images/${item.image}`} className='img-fluid' width={'50px'}/></td> */}
    <td><p>{item.paymentMethod}</p></td>
    {/* <td>{item.manufacturer}</td> */}
    <td>{item.isPaid?(
      <div className='flex justify-center item-center '>
        <div  className='text-green-700 bg-green-500   rounded p-2' ><span class="badge bg-warning text-dark">Paid</span></div>
        {/* <button className='text-red-400 bg-white   shadow rounded-r-lg p-2' onClick={()=>statushandeler(product,false)}>Deactivate</button> */}
      </div>):(
        <div className='flex justify-center item-center '>
          {/* <button className='text-green-500 bg-white   rounded-l-lg p-2 shadow' onClick={()=>statushandeler(product,true)}>Activate</button> */}
          <button className='text-red-400 bg-red-800   shadow rounded p-2'>Yet to Paid</button>
        </div>
                    )}</td>
    {/* <td>{item.quantity}</td>
  <td>{item.category}</td> */}
    {/* <td>{item.status?('true'):('false')}</td> */}
    <td><button className='btn btn-success'><i class="bi bi-pencil-square"></i></button></td>
    <td><button className='btn btn-danger'><i class="bi bi-trash"></i></button></td>


  </tr>
))

}
        

   
         
              </tbody>
            </table>
            {/* End Default Table Example */}
          </div>
        </div>
      </div>


    </div>
  )
}

export default ViewOrders