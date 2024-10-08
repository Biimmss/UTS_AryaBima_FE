import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    nama_mobil: '',
    merk: '',
    tahun: '',
    harga: ''
  });
  const [editingStock, setEditingStock] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:3005/Stock');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingStock) {
      setEditingStock({ ...editingStock, [name]: value });
    } else {
      setNewStock({ ...newStock, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (!newStock.nama_mobil || !newStock.merk || !newStock.tahun || !newStock.harga) {
      alert('Please fill in all the fields before adding a stock.');
      return;
    }
    try {
      await axios.post('http://localhost:3005/CreateStock', newStock);
      setNewStock({ nama_mobil: '', merk: '', tahun: '', harga: '' });
      fetchStocks(); 
    } catch (error) {
      console.error('Error adding stock:', error);
    }
  };

  const handleEdit = async (stock) => {
    setEditingStock(stock);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/StockUpdate/${editingStock.id_stock}`, editingStock);
      setEditingStock(null);
      fetchStocks(); 
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/StockDelete/${id}`);
      fetchStocks(); 
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Stock</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama_mobil"
          value={newStock.nama_mobil}
          onChange={handleInputChange}
          placeholder="Car Name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="merk"
          value={newStock.merk}
          onChange={handleInputChange}
          placeholder="Brand"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="tahun"
          value={newStock.tahun}
          onChange={handleInputChange}
          placeholder="Year"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="harga"
          value={newStock.harga}
          onChange={handleInputChange}
          placeholder="Price"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Stock</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Car Name</th>
              <th className="py-2 px-4 border-b rounded-lg">Brand</th>
              <th className="py-2 px-4 border-b rounded-lg">Year</th>
              <th className="py-2 px-4 border-b rounded-lg">Price</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id_stock} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{stock.id_stock}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingStock && editingStock.id_stock === stock.id_stock ? (
                    <input
                      type="text"
                      name="nama_mobil"
                      value={editingStock.nama_mobil}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    stock.nama_mobil
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingStock && editingStock.id_stock === stock.id_stock ? (
                    <input
                      type="text"
                      name="merk"
                      value={editingStock.merk}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    stock.merk
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingStock && editingStock.id_stock === stock.id_stock ? (
                    <input
                      type="text"
                      name="tahun"
                      value={editingStock.tahun}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    stock.tahun
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingStock && editingStock.id_stock === stock.id_stock ? (
                    <input
                      type="text"
                      name="harga"
                      value={editingStock.harga}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    stock.harga
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingStock && editingStock.id_stock === stock.id_stock ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(stock)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(stock.id_stock)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockList;