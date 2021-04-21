// import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import "../styles/layout-overide.css"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import Logo from "./logo"

const Header = ({ siteTitle }) => (
  <header>
    <Container>
      <Navbar expand="md">
        <Navbar.Brand href="/" style={{fontFamily: `Andale Mono`, fontWeight: `bold`}}>
          <Logo />
          <div>
          UiraCode
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav as="ul" className="ml-auto">
            <Nav.Item as="li">
              <Link to="/about" className="nav-link" activeClassName="active" style={{fontFamily: `Andale Mono`, fontWeight: `bold`}}>About</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
