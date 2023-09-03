import React, {useState} from "react";
import "./Menu.css"
import MenuItem from "./MenuItem";


const Menu = ({ menu}) =>{
    var menuList = (
        <>
            {menu.map((menuItem) => {
                return <MenuItem menuItem={menuItem} />
            }) }

        </>);
  return (
    <div  className="menu-background">
        <div className="menu-title">Menu</div>
        {menuList}
    </div>
  );
};

export default Menu;