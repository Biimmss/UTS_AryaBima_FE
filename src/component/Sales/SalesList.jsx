import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({
    nama_sales: '', 
  });
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:3005/Sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingSale) {
      setEditingSale({ ...editingSale, [name]: value });
    } else {
      setNewSale({ ...newSale, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newSale.nama_sales || !newSale.email_sales) {
      alert('Please fill in all the fields.');
      return;
    }
    // Check if the sale already exists
    const existingSale = sales.some(sale => sale.nama_sales === newSale.nama_sales && sale.email_sales === newSale.email_sales);
    if (existingSale) {
      alert('Sale with the same name and email already exists.');
      return;
    }
    try {
      await axios.post('http://localhost:3005/CreateSales', newSale); 
      setNewSale({ nama_sales: '', email_sales: '' }); 
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const handleEdit = async (sale) => {
    setEditingSale(sale);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/SalesUpdate/${editingSale.id_sales}`, editingSale); 
      setEditingSale(null);
      fetchSales(); 
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/DeleteSales/${id}`); 
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Sales</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama_sales"
          value={newSale.nama_sales}
          onChange={handleInputChange}
          placeholder="Sales Name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email_sales"
          value={newSale.email_sales}
          onChange={handleInputChange}
          placeholder="Sales Email"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Sale</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Sales Name</th>
              <th className="py-2 px-4 border-b rounded-lg">Sales Email</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id_sales} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{sale.id_sales}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingSale && editingSale.id_sales === sale.id_sales ? (
                    <input
                      type="text"
                      name="nama_sales"
                      value={editingSale.nama_sales}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    sale.nama_sales
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingSale && editingSale.id_sales === sale.id_sales ? (
                    <input
                      type="email"
                      name="email_sales"
                      value={editingSale.email_sales}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    sale.email_sales
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingSale && editingSale.id_sales === sale.id_sales ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(sale)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(sale.id_sales)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesList;