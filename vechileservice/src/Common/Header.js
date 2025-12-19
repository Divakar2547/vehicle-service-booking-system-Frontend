import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        <NavLink to={"/"}>
          <img src="Img.png" alt="Vehicle Service Logo"/>
        </NavLink>
       
        <div className="links">
        <NavLink to={"/"}>Home  </NavLink>
        <NavLink to={"/Login"}>Login </NavLink>
        <NavLink to={"/About"}>About </NavLink>
        <NavLink to={"/Contact"}>Contact </NavLink>
        <NavLink to={"/Product"}>Product </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;