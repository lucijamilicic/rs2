import React, { useState, useEffect } from "react";
import "./Menu.css"
import MenuItem from "./MenuItem";
import { getRole } from "../../common/helpers";


const Menu = ({ restaurantInfo, menu }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const role = getRole();

    useEffect(() => {

            if (role === "Administrator") {
                setIsAdmin(true);
            }
        
    }, []);

    var menuList = (
        <>
            {menu.map(menuItem => {
                return <MenuItem restaurantInfo={restaurantInfo} menuItem={menuItem} />
            }) }

        </>);
  return (
    <div  className="menu">
        <div className="menu-title">Menu</div>
        {menuList}
    </div>
  );
};

export default Menu;