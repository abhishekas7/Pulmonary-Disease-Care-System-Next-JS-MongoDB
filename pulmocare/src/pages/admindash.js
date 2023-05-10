
import React, { useState } from "react";
import AddProduct from "./dashboards/AddProduct";
import ViewProducts from "./dashboards/ViewProducts";
import AddDoctor from "./dashboards/AddDoctor";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import Product from "@/models/Product";
import db from "@/util/db";
import Viewusers from "./dashboards/Viewusers";
import User from "@/models/User";
import ViewOrders from "./dashboards/ViewOrders";
import Order from "@/models/Order";
import AdminDefault from "./dashboards/AdminDefault";
import Script from "next/script";
import dynamic from "next/dynamic";

const Admindash = ({ productss, allusers, order }) => {
  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };
  const session = useSession();
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    // if (status === "unauthenticated") {
    //   router.push("/login");

    //   console.log(status);
    // } else {
    //   if (status !== "loading") {
    //     if (data.user.role === "doctor") {
    //       router.push("/doctorDash");
    //     }
    //     if (data.user.role === "admin") {
    //       router.push("/admindash");
    //     }
    //   }
    // }
    console.log(order);
  }, [data, status]);

  const [option, setOption] = useState("/");

  const page = () => {
    switch (option) {
      case "addproduct":
        return <AddProduct />;
      case "viewproduct":
        return <ViewProducts productss={productss} />;
      case "viewusers":
        return <Viewusers allusers={allusers} />;
      case "vieworders":
        return <ViewOrders order={order} />;
      case "viewpatients":
        return <ViewOrders order={order} />;
      case "adddoctor":
        return <AddDoctor />;
      default:
        return <AdminDefault />;
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
      <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet" />
      <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet" />
      <link href="assets/css/style.css" rel="stylesheet" />

      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Admin</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>
        <div className="search-bar">
          {/* <form
            className="search-form d-flex align-items-center"
            method="POST"
            action="#"
          >
            <input
              type="text"
              name="query"
              placeholder="Search"
              title="Enter search keyword"
            />
            <button type="submit" title="Search">
              <i className="bi bi-search" />
            </button>
          </form> */}
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
                <img
                  src="assets/img/profile-img.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  Name
                </span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>Name</h6>
                  <span>Name</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li>
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
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button onClick={logout}>logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link collapsed" href="index.html">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </a>
          </li>
          <li className="nav-heading">Product Pages</li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Products</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="tables-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("addproduct");
                    }
                  }}
                >
                  Add Product
                </button>
              </li>
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("viewproduct");
                    }
                  }}
                >
                  View Product
                </button>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav3"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Orders</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="tables-nav3"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("vieworders");
                    }
                  }}
                >
                  Orders
                </button>
              </li>
            </ul>
          </li>

          <li className="nav-heading">User Pages</li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav2"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Users</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="tables-nav2"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                {/* <button class="btn bg-transparent font-weight-light" onClick={()=>{{setOption('adduser')}}}>Add User</button>            */}
              </li>
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("viewusers");
                    }
                  }}
                >
                  View User
                </button>
              </li>
            </ul>
          </li>

          <li className="nav-heading">Doctor Pages</li>
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#tables-nav3"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-layout-text-window-reverse" />
              <span>Doctor Management</span>
              <i className="bi bi-chevron-down ms-auto" />
            </a>
            <ul
              id="tables-nav3"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("adddoctor");
                    }
                  }}
                >
                  Add Doctor
                </button>
              </li>
              <li>
                <button
                  class="btn bg-transparent font-weight-light"
                  onClick={() => {
                    {
                      setOption("viewdoctor");
                    }
                  }}
                >
                  View Doctor
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <main id="main" className="main">
        <div className="pagetitle">
          <h1>DASHBOARD</h1>
          <button onClick={logout}>logout</button>
          <div>{page()}</div>
        </div>
      </main>

      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>

      <Script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>
    </div>
  );
};
Admindash.auth = { role: 'admin' }
export default Admindash;


export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const allusers = await User.find().lean();
  const order = await Order.find().populate("user");

  return {
    props: {
      allusers: JSON.parse(JSON.stringify(allusers.map(db.convertDocToObj))),
      productss: products.map(db.convertDocToObj),
      order: JSON.parse(JSON.stringify(order.map(db.convertDocToObj))),
    },
  };
}
