import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types';

function MenuItem({ text, link, icon}) {
    return (
        <NavLink to={link} className="menu-item" activeclassname="active">
            <div className="menu-content">
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
    hide: PropTypes.bool.isRequired,
};

export default MenuItem;