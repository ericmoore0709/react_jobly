import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";

const Navigation = () => {

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Jobly</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink className='nav-link' to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to="/companies">Companies</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to="/login">Log in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to="/signup">Sign up</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className='nav-link' to="/profile">Profile</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    )

}

export default Navigation;