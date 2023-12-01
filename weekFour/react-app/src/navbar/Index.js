import {Nav, NavLink, NavMenu} from './NavbarElements'

function Navbar() {
    return ( 
        <Nav>
            <h1>Test</h1>
            <NavMenu>
                <NavLink to='/' activeStyle>
                    Home
                </NavLink>
                <NavLink to='/about' activeStyle>
                    About
                </NavLink>
                <NavLink to='/Youtube' activeStyle>
                    Youtube
                </NavLink>
            </NavMenu>
        </Nav>
     );
}

export default Navbar;