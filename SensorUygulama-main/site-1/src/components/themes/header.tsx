import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { removeItem, toggleSidebarMenu } from "../utils";
import { withRouter } from "next/router";

const Header = (props: any) => {
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed,
    });
  };
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={handleToggleMenuSidebar}
            data-widget="pushmenu"
            aria-label="Menu Hide Bar"
            role="button">
            <i className="fas fa-bars" />
          </span>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="nav-item dropdown" onMouseEnter={toggleMenu}>
            <div className="nav-link dropdown-toggle user-action">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="avatarProfile"
                alt="Avatar"
              />{" "}
              <b className="caret"></b>
            </div>
            <div
              className={`dropdown-menu ${menu ? "show" : ""}`}
              onMouseLeave={() => setMenu(false)}>
              {/* <button type="button" className="dropdown-item">
                <i className="fa fa-user"></i> Profile
              </button> */}
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  props.router.push("/login");
                  removeItem("userdata");
                }}>
                <i className="nav-icon fas fa-arrow-right-from-bracket"></i>{" "}
                Logout
              </button>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Header);
