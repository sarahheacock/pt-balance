import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { Nav, NavItem, Tab, Row, Col, PageHeader } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Nancy from './aboutTabs/Nancy';
import EditButton from '../buttons/EditButton';


const chop = (name) => {
  return name.substr(0, name.indexOf(','));
}

const link = (name) => {
  return name.substr(0, name.indexOf(',')).toLowerCase().trim().replace(/\s/g, "-");
}

const Authors = (props) => {
  const tabs = (props.data).map((d, i) => {
    return (
      <LinkContainer key={`authorTab${i}`} to={`/authors/${link(d.name)}`}>
        <NavItem className="tab">{chop(d.name)}</NavItem>
      </LinkContainer>
    )}
  );

  const routes = (props.data).map((d, i) => (
    <Route key={`authorRoute${i}`} path={`/authors/${link(d.name)}`} render={ () =>
      <Nancy
        data={d}
        admin={props.user}
        updateState={props.updateState}
      /> }
    />
  ));

  return (
    <div className="main-content">
      <PageHeader>About the Authors</PageHeader>
      <div className="text-center">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row className="clearfix">

            <Nav bsStyle="tabs">
              {tabs}
            </Nav>

            <Route exact path="/authors/" render={ () =>
              <Redirect to={`/authors/${link(props.data[0].name)}`} /> }
            />

            {routes}

          </Row>
        </Tab.Container>
        </div>
    </div>
  );
}

export default Authors;

Authors.propsTypes = {
  data: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,

  updateState: PropTypes.func.isRequired
}