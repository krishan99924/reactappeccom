import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [userdelete, setDelete] = useState(false);
  const getusers = async () => {
    const res = await fetch("api/users/alluser");
    const response = await res.json();
    setUsers(response);
  };
  const onDelete = async (id) => {
    try {
      const headers = {
        method: "DELETE",
      };
      const response = await fetch(`api/users/alluser/${id}`, headers);
      getusers();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getusers();
  }, []);
  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users?.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="danger" onClick={() => onDelete(user._id)}>
                  Delete User
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default UserManagement;
