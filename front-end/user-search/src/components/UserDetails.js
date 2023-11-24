import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserForm from "./UserForm";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/profiles/${id}/`).then((response) => {
      setUser(response.data);
    });
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/profiles/${id}/`,
        formData
      );
      setUser(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (editing) {
    return <UserForm user={user} handleSubmit={handleUpdate} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto my-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{user.first_name} {user.last_name}</h1>
      <p className="text-gray-600 text-base mb-4">{user.age}</p>
      <p className="text-gray-600 text-base mb-4">{user.hometown}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => setEditing(true)}
      >
        Edit User
      </button>
    </div>
  );
}

export default UserDetail;
