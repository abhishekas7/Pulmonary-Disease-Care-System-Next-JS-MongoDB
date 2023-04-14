
import React, { useState } from "react";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { signOut} from 'next-auth/react'
import $ from 'jquery'
import axios from "axios";
import UpdateProfile from "./UpdateProfile";
import Patientprofile from "./Patientprofile";
import Deafultpage from "./Deafultpage";
import MedicalRecord from "./MedicalRecord";

const index = () => {
  
  const logout=()=>{
    signOut({callbackUrl:'/login'})
}
  const {data,status}= useSession()
  const [userdet,setUser]=useState()
  const router=useRouter()
  const [patData,setpatData] = useState([])



  const getdata=async ()=>{
    const response= await axios.get("");

  }
  


  useEffect(() => {
    
    if(status==='unauthenticated'){
      router.push('/login')
       
        console.log(status)
    }else{
      if(status!=='loading'){
    

        setUser({
          id:data.user._id,
          email:data.user.email,
          name:data.name
        })
      }
      
    }
    getpatData()


  }, [status,data])

  const [option, setOption] = useState('/');

  const getpatData=async ()=>{
    const response = await axios
    .get('/api/doctor/details')
    .then(res => setpatData(res.data))
    .catch(err => console.error(err))
  }
 

  const page = () => {
    switch (option) {
      case "viewprofile":
        return <Patientprofile/>;

        case "medicalrecord":
          return <MedicalRecord/>;
 
      default:
        return <Deafultpage/>;
    }
  };



  return (
    <div>
      <link
        href="assets/vendor/bootstrap/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
        rel="stylesheet"
      />
      <link
        href="assets/vendor/boxicons/css/boxicons.min.css"
        rel="stylesheet"
      />
      <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet" />
      <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet" />
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet"/>
      <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet"/>
      <link href="assets/css/style.css" rel="stylesheet"/>

      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Patient</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                {/* <i className="bi bi-bell" />
                <span className="badge bg-primary badge-number">4</span> */}
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning" />
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger" />
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-check-circle text-success" />
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary" />
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all notifications</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-chat-left-text" />
                <span className="badge bg-success badge-number">3</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#">
                    <span className="badge rounded-pill bg-primary p-2 ms-2">
                      View all
                    </span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-1.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-2.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img
                      src="assets/img/messages-3.jpg"
                      alt=""
                      className="rounded-circle"
                    />
                    <div>
                      <h4>David Muldon</h4>
                      <p>
                        Velit asperiores et ducimus soluta repudiandae labore
                        officia est ut...
                      </p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <a href="#">Show all messages</a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >

{patData.map((data,i)=>(
 <img
 src={`..//images/${data.image}`}
                  alt="Profile"
                  className="rounded-circle"
                />
))}

               
                <span className="d-none d-md-block dropdown-toggle ps-2">
                {status==='authenticated'? data.user.name:'loading'}
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6> {status==='authenticated'? data.user.name:'loading'}</h6>
                  <span> {status==='authenticated'? data.user.role:'loading'}</span>
                </li>
                {/* <li>
                  <hr className="dropdown-divider" />
                </li> */}
                {/* <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li> */}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear" />
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="pages-faq.html"
                  >
                    <i className="bi bi-question-circle" />
                    <span><button className="btn btn-outline-primary btn-sm" onClick={logout}>logout</button></span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
        
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">


       <li className="nav-item">
            <div className="nav-link collapsed">
              <i className="bi bi-grid" />
              <button class="btn bg-transparent font-weight-light" onClick={()=>{{setOption('default')}}}><span className="fw-bold">Dashboard</span></button>           
            </div>
          </li>

          <li className="nav-item">
            <div className="nav-link collapsed">
              <i className="bi bi-grid" />
              <button class="btn bg-transparent font-weight-light" onClick={()=>{{setOption('viewprofile')}}}><span className="fw-bold">Profile</span></button>           
            </div>
          </li>

          <li className="nav-item">
            <div className="nav-link collapsed">
              <i className="bi bi-grid" />
              <button class="btn bg-transparent font-weight-light" onClick={()=>{{setOption('medicalrecord')}}}><span className="fw-bold">Medical Record</span></button>           
            </div>
          </li>
   

        </ul>
      </aside>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>PATIENT DASHBOARD</h1>
          <button onClick={logout}>logout</button>
<div>
{page()}
</div>

        </div>
      </main>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>


      <cript src="assets/js/main.js" />

    </div>
  );
};

export default index;


