import React from 'react';
import PropTypes from 'prop-types';
import { blogID } from '../data/data';
import { Nav, Navbar, NavItem, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EditButton from './buttons/EditButton';

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    links: PropTypes.array.isRequired,
    getData: PropTypes.func.isRequired,
    updateState: PropTypes.func.isRequired,
  }

  componentDidMount(){
    this.props.getData(`/user/${blogID}`);
  }

  render(){

    const navItems = this.props.links.map((link, i) => {
      if(link === "home"){
        return (
          <LinkContainer key={link} exact to="/" >
            <NavItem>{link.toUpperCase()}</NavItem>
          </LinkContainer>
        );
      }
      else {
        return (
          <LinkContainer key={link} to={`/${link}`} >
            <NavItem>{link.toUpperCase()}</NavItem>
          </LinkContainer>
        );
      }
    });

    return (
      <div>
        <Navbar inverse className="navigation">
          <Navbar.Header>
            <Navbar.Brand>
              {"PBS"}
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse>
            <Nav className="ml-auto" navbar>
              {navItems}
            </Nav>
            <Nav pullRight>
              <LinkContainer to="#">
                <EditButton
                  user={this.props.user}
                  dataObj={{}}
                  updateState={this.props.updateState}
                  pageSection="header"
                  title="Login"
                  length={2}
                />
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
