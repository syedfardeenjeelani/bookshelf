import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Bookshelf from "../components/Bookshelf";
import Cards from "../components/Cards";

const Routing = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  useEffect(() => {
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/cards" element={<Cards books={bookshelf} setBookshelf={setBookshelf} />} />
        <Route path="/bookshelf" element={<Bookshelf  key={location.key} books={bookshelf} setBookshelf={setBookshelf} />} />
      </Routes>
    </>
  );
};

export default Routing;

// {bookshelf.length > 0 && <Bookshelf books={bookshelf} setBookshelf={setBookshelf} />}