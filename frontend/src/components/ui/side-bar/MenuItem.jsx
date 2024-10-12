import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types';
import classes from '../Ui.module.css';


function MenuItem({ text, link, icon }) {
    return (
        <NavLink to={link} className={({ isActive }) =>
            isActive ? `${classes.menuItem} ${classes.active}` : classes.menuItem
        }>
            <div className={classes.menuContent}>
                {icon}
                {text}
            </div>
        </NavLink>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
};

export default MenuItem;