import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form,Tab,Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ProductsTable from '../components/ProductTable';
import { Link } from 'react-router-dom';
import UserManagement from './UserManagement';

// Dashboard.js

const Dashboard = () => {
  const [userManagement, setUserManagement]= useState(false);
  return (
    <Container className="mt-4">
      <Tab.Container id="dashboard-tabs" defaultActiveKey="dashboard-management">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="dashboard-management"><Link to="/productchart">Overview</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="user-management">User Management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="product-management">Product Management</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="dashboard-management">
            <UserManagement />
          </Tab.Pane>
          <Tab.Pane eventKey="user-management">
            <UserManagement />
          </Tab.Pane>
          <Tab.Pane eventKey="product-management">
            {/* <ProductManagement /> */}
            <Link to="/productform"><div className='btn btn-success mt-4'>
              Add product
            </div>
            </Link>
            <hr />
            <div className="">
            <ProductsTable/>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
