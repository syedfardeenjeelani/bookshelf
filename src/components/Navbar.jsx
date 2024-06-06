// Navbar.jsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Cards from "./Cards";
import { booksContext } from "../Utils/Context";

const Navbar = () => {
  const [books, setBooks] = useContext(booksContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const search = useRef(null);
  const initialBooksSet = useRef(false);

  useEffect(() => {
    if (!initialBooksSet.current && books.length > 0) {
      setFilteredBooks(books);
      initialBooksSet.current = true;
    }
  }, [books]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputData = search.current.value;
    if (inputData.length === 0) {
      setFilteredBooks(books); 
    } else {
      const filter = books
        .filter((el, ind, self) => {
          return self.findIndex((b) => b.title === el.title) === ind;
        })
        .filter((item) =>
          item.title.toLowerCase().includes(inputData.toLowerCase())
        );
      setFilteredBooks(filter); 
    }
  };


  return (
    <>
      <form onSubmit={handleSearch} className="md:pr-[6rem]  flex justify-center md:justify-end">
        <div className="flex flex-col md:flex-row justify-between gap-3 pt-[2rem] w-[53%]">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="  font-bold">Search by bookname: </h1>
            <input
              ref={search}
              placeholder="search"
              className="border-[2px]   border-black rounded-md md:w-[14rem] pl-[5px] "
              type="text"
            />
          </div>
          <a
            className="md:w-[10rem] bg-green-500 w-auto mb-5 h-[2rem] text-white md:h-[2rem] rounded-xl flex justify-center items-center"
            href="/bookshelf"
          >
            My Bookshelf
          </a>
        </div>
      </form>
      <Cards books={filteredBooks} />
    </>
  );
};

export default Navbar;