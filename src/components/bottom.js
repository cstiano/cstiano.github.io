import PropTypes from "prop-types"
import React from "react"
import "../styles/layout-overide.css"
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"

const Bottom = ({ siteTitle }) => (
    <Container style={{borderTopStyle:`solid`, borderWidth: `1px`, borderColor:`#c0c3c3`}}>
      <Navbar sticky="bottom" expand="md">
        <Navbar.Text href="/" style={{fontFamily: `Andale Mono`, fontWeight: `italic`}}>
          <div>
          UiraCode ⓒ 2021
          </div>
        </Navbar.Text>
          <Nav as="ul" className="ml-auto">
            <Nav.Item as="li">
            <Link to="/" className="nav-link" activeClassName="active">Latest Posts</Link>
            </Nav.Item>
            <Nav.Item as="li">
            <Link to="https://github.com/cstiano" className="nav-link" activeClassName="active">Github</Link>
            </Nav.Item>
            <Nav.Item as="li">
            <Link to="https://twitter.com/crisdoliver" className="nav-link" activeClassName="active">Twitter</Link>
            </Nav.Item>
          </Nav>
      </Navbar>
    </Container>
)

Bottom.propTypes = {
  siteTitle: PropTypes.string,
}

Bottom.defaultProps = {
  siteTitle: ``,
}

export default Bottom
