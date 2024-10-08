import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PembayaranList = () => {
  const [pembayaran, setPembayaran] = useState([]);
  const [newPembayaran, setNewPembayaran] = useState({
    tanggal_pembayaran: '',
    jumlah_pembayaran: '',
    metode_pembayaran: ''
  });
  const [editingPembayaran, setEditingPembayaran] = useState(null);

  useEffect(() => {
    fetchPembayaran();
  }, []);

  const fetchPembayaran = async () => {
    try {
      const response = await axios.get('http://localhost:3005/Pembayaran');
      setPembayaran(response.data);
    } catch (error) {
      console.error('Error fetching pembayaran:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPembayaran) {
      setEditingPembayaran({ ...editingPembayaran, [name]: value });
    } else {
      setNewPembayaran({ ...newPembayaran, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPembayaran.tanggal_pembayaran || !newPembayaran.jumlah_pembayaran || !newPembayaran.metode_pembayaran) {
      alert('Please fill in all the fields.');
      return;
    }
    // Check if the pembayaran already exists
    const existingPembayaran = pembayaran.some(pembayaran => pembayaran.tanggal_pembayaran === newPembayaran.tanggal_pembayaran && pembayaran.jumlah_pembayaran === newPembayaran.jumlah_pembayaran && pembayaran.metode_pembayaran === newPembayaran.metode_pembayaran);
    if (existingPembayaran) {
      alert('Pembayaran with the same details already exists.');
      return;
    }
    try {
      await axios.post('http://localhost:3005/CreatePembayaran', newPembayaran);
      setNewPembayaran({ tanggal_pembayaran: '', jumlah_pembayaran: '', metode_pembayaran: '' });
      fetchPembayaran(); 
    } catch (error) {
      console.error('Error adding pembayaran:', error);
    }
  };

  const handleEdit = async (pembayaran) => {
    setEditingPembayaran(pembayaran);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/UpdatePembayaran/${editingPembayaran.id_pembayaran}`, editingPembayaran);
      setEditingPembayaran(null);
      fetchPembayaran(); 
    } catch (error) {
      console.error('Error updating pembayaran:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/DeletePembayaran/${id}`);
      fetchPembayaran(); 
    } catch (error) {
      console.error('Error deleting pembayaran:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Pembayaran</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="tanggal_pembayaran"
          value={newPembayaran.tanggal_pembayaran}
          onChange={handleInputChange}
          placeholder="Payment Date"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="jumlah_pembayaran"
          value={newPembayaran.jumlah_pembayaran}
          onChange={handleInputChange}
          placeholder="Payment Amount"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="metode_pembayaran"
          value={newPembayaran.metode_pembayaran}
          onChange={handleInputChange}
          placeholder="Payment Method"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Pembayaran</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Payment Date</th>
              <th className="py-2 px-4 border-b rounded-lg">Payment Amount</th>
              <th className="py-2 px-4 border-b rounded-lg">Payment Method</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pembayaran.map((pembayaran) => (
              <tr key={pembayaran.id_pembayaran} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{pembayaran.id_pembayaran}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPembayaran && editingPembayaran.id_pembayaran === pembayaran.id_pembayaran ? (
                    <input
                      type="text"
                      name="tanggal_pembayaran"
                      value={editingPembayaran.tanggal_pembayaran}
                      onChange={handleInputChange}
                      className="p-1 border rounded"
                    />
                  ) : (
                    pembayaran.tanggal_pembayaran
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPembayaran && editingPembayaran.id_pembayaran === pembayaran.id_pembayaran ? (
                    <input
                      type="number"
                      name="jumlah_pembayaran"
                      value={editingPembayaran.jumlah_pembayaran}
                      onChange={handleInputChange}
                      className="p-1 border rounded"
                    />
                  ) : (
                    pembayaran.jumlah_pembayaran
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPembayaran && editingPembayaran.id_pembayaran === pembayaran.id_pembayaran ? (
                    <input
                      type="text"
                      name="metode_pembayaran"
                      value={editingPembayaran.metode_pembayaran}
                      onChange={handleInputChange}
                      className="p-1 border rounded"
                    />
                  ) : (
                    pembayaran.metode_pembayaran
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPembayaran && editingPembayaran.id_pembayaran === pembayaran.id_pembayaran ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(pembayaran)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                  )}
                  <button onClick={() => handleDelete(pembayaran.id_pembayaran)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PembayaranList;