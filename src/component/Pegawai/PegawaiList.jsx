import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PegawaiList = () => {
  const [pegawai, setPegawai] = useState([]);
  const [newPegawai, setNewPegawai] = useState({
    nama: '',
    jabatan: '',
    telepon: '',
    email: ''
  });
  const [editingPegawai, setEditingPegawai] = useState(null);

  useEffect(() => {
    fetchPegawai();
  }, []);

  const fetchPegawai = async () => {
    try {
      const response = await axios.get('http://localhost:3005/Pegawai');
      setPegawai(response.data);
    } catch (error) {
      console.error('Error fetching pegawai:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingPegawai) {
      setEditingPegawai({ ...editingPegawai, [name]: value });
    } else {
      setNewPegawai({ ...newPegawai, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newPegawai.nama || !newPegawai.jabatan || !newPegawai.telepon || !newPegawai.email) {
      alert('Please fill in all the fields before adding a pegawai.');
      return;
    }
    if (pegawai.some(pegawai => pegawai.nama === newPegawai.nama && pegawai.jabatan === newPegawai.jabatan && pegawai.telepon === newPegawai.telepon && pegawai.email === newPegawai.email)) {
      alert('The pegawai already exists.');
      return;
    }
    try {
      await axios.post('http://localhost:3005/CreatePegawai', newPegawai);
      setNewPegawai({ nama: '', jabatan: '', telepon: '', email: '' });
      fetchPegawai(); 
    } catch (error) {
      console.error('Error adding pegawai:', error);
    }
  };

  const handleEdit = async (pegawai) => {
    setEditingPegawai(pegawai);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3005/UpdatePegawai/${editingPegawai.id_pegawai}`, editingPegawai);
      setEditingPegawai(null);
      fetchPegawai(); 
    } catch (error) {
      console.error('Error updating pegawai:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/DeletePegawai/${id}`);
      fetchPegawai(); 
    } catch (error) {
      console.error('Error deleting pegawai:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#2B2D42', height: '100vh' }}>
      <h1 className="text-2xl font-bold mb-4 text-white">Pegawai</h1>
      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          name="nama"
          value={newPegawai.nama}
          onChange={handleInputChange}
          placeholder="Name"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="jabatan"
          value={newPegawai.jabatan}
          onChange={handleInputChange}
          placeholder="Position"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          name="telepon"
          value={newPegawai.telepon}
          onChange={handleInputChange}
          placeholder="Phone"
          className="mr-2 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={newPegawai.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mr-2 p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Add Pegawai</button>
      </form>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 rounded-lg">
              <th className="py-2 px-4 border-b rounded-lg">ID</th>
              <th className="py-2 px-4 border-b rounded-lg">Name</th>
              <th className="py-2 px-4 border-b rounded-lg">Position</th>
              <th className="py-2 px-4 border-b rounded-lg">Phone</th>
              <th className="py-2 px-4 border-b rounded-lg">Email</th>
              <th className="py-2 px-4 border-b rounded-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.map((pegawai) => (
              <tr key={pegawai.id_pegawai} className="text-center rounded-lg">
                <td className="py-2 px-4 border-b rounded-lg">{pegawai.id_pegawai}</td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPegawai && editingPegawai.id_pegawai === pegawai.id_pegawai ? (
                    <input
                      type="text"
                      name="nama"
                      value={editingPegawai.nama}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pegawai.nama
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPegawai && editingPegawai.id_pegawai === pegawai.id_pegawai ? (
                    <input
                      type="text"
                      name="jabatan"
                      value={editingPegawai.jabatan}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pegawai.jabatan
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPegawai && editingPegawai.id_pegawai === pegawai.id_pegawai ? (
                    <input
                      type="text"
                      name="telepon"
                      value={editingPegawai.telepon}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pegawai.telepon
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPegawai && editingPegawai.id_pegawai === pegawai.id_pegawai ? (
                    <input
                      type="email"
                      name="email"
                      value={editingPegawai.email}
                      onChange={handleInputChange}
                      className="p-1 border rounded w-full bg-gray-700 text-white rounded-lg"
                    />
                  ) : (
                    pegawai.email
                  )}
                </td>
                <td className="py-2 px-4 border-b rounded-lg">
                  {editingPegawai && editingPegawai.id_pegawai === pegawai.id_pegawai ? (
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Save</button>
                  ) : (
                    <button onClick={() => handleEdit(pegawai)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 rounded-lg">Edit</button>
                  )}
                  <button onClick={() => handleDelete(pegawai.id_pegawai)} className="bg-red-500 text-white px-2 py-1 rounded rounded-lg">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PegawaiList;