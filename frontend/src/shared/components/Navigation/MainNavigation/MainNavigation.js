import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "../MainHeader/MainHeader";
import { NavLinks } from "../NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import { Backdrop } from '../../UI'
import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)
  const openCloseDrawerHandler = () => {
    setDrawerIsOpen((prev) => (!prev));
  }

  return (
    <>
      { drawerIsOpen && <Backdrop onClick={openCloseDrawerHandler}/> }
      <SideDrawer show={drawerIsOpen} onClick={openCloseDrawerHandler}>
            <nav className="main-navigation__drawer-nav">
              <NavLinks />
            </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openCloseDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
