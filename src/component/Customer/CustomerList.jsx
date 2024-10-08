import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    email: ''
  });
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3005/Customer');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingCustomer) {
      setEditingCustomer({ ...editingCustomer, [name]: value });
    } else {
      setNewCustomer({ ...newCustomer, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCustomer.nama || !newCustomer.alamat || !newCustomer.telepon || !newCustomer.email) {
      alert('Please fill in all the fields before adding a customer.');
      return;
    }
    if (customers.some(customer => customer.nama === newCustomer.nama && customer.alamat === newCustomer.alamat && customer.telepon === newCustomer.telepon && customer.email === newCustomer.email)) {
      alert('The customer already exists.');
      return;
    }
    try {
      await axios.post('http://localhost:3005/CreateCustomer', newCustomer);
      setNewCustomer({ nama: '', alamat: '', telepon: '', email: '' });
      fetchCustomers(); 
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleEdit = async (customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/UpdateCustomer/${editingCustomer.id_customer}`, editingCustomer);
      setEditingCustomer(null);
      fetchCustomers(); 
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/DeleteCustomer/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Customer</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newCustomer.nama}
          onChange={handleInputChange}
          placeholder="Name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="alamat"
          value={newCustomer.alamat}
          onChange={handleInputChange}
          placeholder="Address"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="telepon"
          value={newCustomer.telepon}
          onChange={handleInputChange}
          placeholder="Phone"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newCustomer.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Customer</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Name</th>
              <th className="py-2 px-4 border-b rounded-lg">Address</th>
              <th className="py-2 px-4 border-b rounded-lg">Phone</th>
              <th className="py-2 px-4 border-b rounded-lg">Email</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id_customer} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{customer.id_customer}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingCustomer && editingCustomer.id_customer === customer.id_customer ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingCustomer.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    customer.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingCustomer && editingCustomer.id_customer === customer.id_customer ? (
                    <input
                      type="text"
                      name="alamat"
                      value={editingCustomer.alamat}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    customer.alamat
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingCustomer && editingCustomer.id_customer === customer.id_customer ? (
                    <input
                      type="text"
                      name="telepon"
                      value={editingCustomer.telepon}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    customer.telepon
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingCustomer && editingCustomer.id_customer === customer.id_customer ? (
                    <input
                      type="email"
                      name="email"
                      value={editingCustomer.email}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingCustomer && editingCustomer.id_customer === customer.id_customer ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(customer)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(customer.id_customer)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;