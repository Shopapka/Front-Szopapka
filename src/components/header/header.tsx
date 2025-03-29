import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Header = () => {
  console.log(getAuth().currentUser);
  const navigate = useNavigate();
  const [toggleMobile, setToggleMobile] = useState(true);
  const [ToggleButtonClass, setToggleButtonClass] = useState("");
  const [showUserPanel, setShowUserPanel] = useState(false);
  const [classHeader, setClassHeader] = useState("header_main");

  function toggleHeder() {
    setToggleMobile(!toggleMobile);
    let r: any = document.querySelector(":root");
    let positioner: any = document.getElementById("header_menu_positioner");
    let height: any = positioner.offsetHeight;
    if (toggleMobile) {
      r.style.setProperty("--height_menu_phone", height + "px");
      setToggleButtonClass("active");
    } else {
      r.style.setProperty("--height_menu_phone", "0px");
      setToggleButtonClass("");
    }
  }
  const handleLogout = async () => {
    await signOut(auth);

    navigate("/login");
  };
  function toggleUserPanel() {
    setShowUserPanel(!showUserPanel);
  }

  return (
    <div className={classHeader}>
      <div className="header_banner text-medium">SzopApka</div>
      <div className="header_menu" id="header_menu_target">
        <span className="header_menu_item header_menu_item_first text-medium-small">
          <Link to="/login">Grupy</Link>
        </span>
        <span className="header_menu_item text-medium-small">
          <Link to="/login">Blog</Link>
        </span>
        <span className="header_menu_item text-medium-small">
          <Link to="/login">FAQ</Link>
        </span>
        <span>
          HALO
          <button onClick={handleLogout}>LOGAUT</button>
        </span>
      </div>

      <div
        className="header_menu header_menu-positioner display-none-pc display-none-tablet"
        id="header_menu_positioner"
      >
        <span className="header_menu_item header_menu_item_first text-medium-small">
          <Link to="/login">Grupy</Link>
        </span>
        <span className="header_menu_item text-medium-small">
          <Link to="/login">Blog</Link>
        </span>
        <span className="header_menu_item text-medium-small">
          <Link to="/login">FAQ</Link>
        </span>
      </div>

      <div className="header_icons">
        <span className="header_icons_account">
          {" "}
          <Link to="/login">
            <SlUser />
          </Link>{" "}
        </span>
        <span
          className={
            "header_icons_menuToggle display-none-tablet display-none-pc " +
            ToggleButtonClass
          }
          onClick={toggleHeder}
        >
          {" "}
          <SlArrowDown />
        </span>
      </div>
    </div>
  );
};

export default Header;
