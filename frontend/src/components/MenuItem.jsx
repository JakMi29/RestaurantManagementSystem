import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types';

function MenuItem({ text, link, icon, hide }) {
    return (
        <NavLink to={link} className={hide ? "menu-item" : "menu-item-hide"} activeClassName="active">
            <div className="menu-content">
                {icon}
                {hide && <span className="text">{text}</span>}
            </div>
        </NavLink>
    );
}

MenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    hide: PropTypes.element.isRequired,
};
export default MenuItem