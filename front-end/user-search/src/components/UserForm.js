import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UserForm({ setUsers = () => {} }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [hometown, setHometown] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/profiles/${id}/`).then((response) => {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setAge(response.data.age);
        setHometown(response.data.hometown);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('age', age);
    formData.append('hometown', hometown);
    try {
      let response;
      if (id) {
        response = await axios.patch(`http://localhost:8000/api/profiles/${id}/`, formData);
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === response.data.id ? response.data : user))
        );
        alert(`User updated successfully!`, navigate(`/profiles/${response.data.id}`));

      } else {
        response = await axios.post('http://localhost:8000/api/profiles/', formData);
        setUsers((prevUsers) => [response.data, ...prevUsers]);
        alert('User created successfully!', navigate('/'));
      }
      setFirstName('');
      setLastName('');
      setAge('');
      setHometown('');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstName" className="block font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block font-medium text-gray-700">
            Last Name
          </label>
          <input
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            rows="5"
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            name="age"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hometown" className="block font-medium text-gray-700">
            Hometown
          </label>
          <input
            type="text"
            name="hometown"
            id="hometown"
            value={hometown}
            onChange={(e) => setHometown(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            {id ? 'Update User' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );

}

export default UserForm;
