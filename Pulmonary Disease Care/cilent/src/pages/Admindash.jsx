import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { library } from '@fortawesome/fontawesome-svg-core'

import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import SideNav, {
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import OrderScreen from "./OrderScreen";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import AddProduct from "./AddProduct";

library.add(faCheckSquare, faCoffee)

function SideNavBar(props) {
  const [isVisible, setIsVisible] = useState(true);
  const [option, setOption] = useState('/');

  const page = () => {
    switch (option) {
      case 'addproduct': return (<AddProduct/>);
      case 'Profile': return 'gfdhgf';
      case 'Address': return 'address coming soon';
      default: return 'sdf';

    }
  };

  return (
    <div>
      <SideNav expanded={isVisible}>
        <SideNav.Toggle
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        />
        <SideNav.Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
            <button onClick={()=>setOption('addproduct')} type="button" class="btn btn-transparent text-white"><i class="fa-solid fa-plus">ADD PRODUCT</i> </button>
            </NavIcon>

          </NavItem>

          

        </SideNav.Nav>
      </SideNav>

      <div className="col-12 m-5">
      {page()}
      </div>
    </div>
  );
}

export default SideNavBar;