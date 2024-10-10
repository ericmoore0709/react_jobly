import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import PropTypes from 'prop-types';

const Navigation = ({ processLogout }) => {

    const token = localStorage.getItem('token');

    return (
        <Navbar dark color="dark" expand="md" className="w-100 mb-2">
            <NavbarBrand href="/">Jobly</NavbarBrand>
            <Nav navbar>
                <NavItem>
                    <NavLink className='nav-link' to="/">Home</NavLink>
                </NavItem>
                {token ? (<>
                    <NavItem>
                        <NavLink className='nav-link' to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' onClick={processLogout}>Log out</NavLink>
                    </NavItem>
                </>) : (<>
                    <NavItem>
                        <NavLink className='nav-link' to="/login">Log in</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='nav-link' to="/signup">Sign up</NavLink>
                    </NavItem>
                </>)}
            </Nav>
        </Navbar>
    )

}

Navigation.propTypes = {
    processLogout: PropTypes.func.isRequired
}

export default Navigation;