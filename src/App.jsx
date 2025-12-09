import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Page';
import ViewData from './components/ViewData/Page';

function App() {
  const [user, setUser] = useState({});
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});
  const itemPerPage = 4;
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(data.length / itemPerPage);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('list')) || [];
    setList(storedList);

    const searchValue = localStorage.getItem('search') || '';
    const filteredData = searchValue
      ? storedList.filter((item) =>
          item.username.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.email.toLowerCase().includes(searchValue.toLowerCase())
        )
      : storedList;
    setData(filteredData);

    const savedPage = parseInt(localStorage.getItem('currentPage')) || 1;
    setCurrentPage(savedPage);
  }, []);

  // Save list to localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // Save current page to localStorage
  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  // Validation function
  const validate = () => {
    const error = {};
    if (!user.username) error.username = 'Username is required.';
    if (!user.email) error.email = 'Email is required.';
    if (!user.password) error.password = 'Password is required.';
    setErrors(error);
    return Object.keys(error).length !== 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedList;

    if (!editId) {
      // Add new user
      updatedList = [...list, { ...user, id: Date.now() }];
    } else {
      // Edit existing user
      updatedList = list.map((item) =>
        item.id === editId ? { ...item, ...user } : item
      );
      setEditId(null);
      navigate('/view');
    }

    setList(updatedList);
    setData(updatedList);
    setUser({});
    setErrors({});
    setCurrentPage(1);
  };

  // Pagination handlers
  const handlePage = (page) => setCurrentPage(page);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPage && setCurrentPage(currentPage + 1);

  // Handle edit
  const handleEdit = (id) => {
    const editUser = list.find((item) => item.id === id);
    setUser(editUser);
    setEditId(id);
    navigate('/');
  };

  // Handle delete
  const handleDelete = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
    setData(updatedList);
  };

  // Handle search
  const handleSearch = (e) => {
    const { value } = e.target;
    const filtered = list.filter(
      (item) =>
        item.username.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
    );
    setData(filtered);
    setCurrentPage(1);
    localStorage.setItem('search', value);
  };

  return (
    <>
      <Header handleSearch={handleSearch} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              validate={validate}
              error={errors}
              editId={editId}
            />
          }
        />
        <Route
          path="/view"
          element={
            <ViewData
              list={list}
              currentItems={currentItems}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              currentPage={currentPage}
              itemPerPage={itemPerPage}
              handleNext={handleNext}
              handlePrev={handlePrev}
              totalPage={totalPage}
              handlePage={handlePage}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;