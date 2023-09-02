import React, {useState} from "react";
import "./Menu.css"
import MenuItem from "./MenuItem";
const Menu = () =>{
    var menuList = (<div>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
    </div>);
  return (
    <div  className="menu-background">
        <div className="menu-title">Menu</div>
        {menuList}
    </div>
  );
};

export default Menu;