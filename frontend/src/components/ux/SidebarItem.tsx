import { NavLink } from "react-router-dom"
import classes from './Ui.module.css';
import { ReactNode } from "react";

interface SideBarItemProps {
    text: string;
    link: string;
    icon: ReactNode;
}

const SidebarItem = (props: SideBarItemProps) => {
    return (
        <NavLink to={props.link} className={({ isActive }: { isActive: boolean }) => 
            `${classes.sidebarItem} ${isActive ? classes.active : ''}`
       }>
            <div className={classes.sidebarItemContent}>
                {props.icon}
                {props.text}
            </div>
        </NavLink>
    );
}



export default SidebarItem;