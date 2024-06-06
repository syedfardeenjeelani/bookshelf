import React, { useState, useEffect } from "react";
import Bookshelf from "./Bookshelf";

const Cards = ({ books }) => {
  const removeDuplicates = (books) => {
    const uniqueBooks = [];
    const uniqueTitles = new Set();

    for (const book of books) {
      if (!uniqueTitles.has(book.title)) {
        uniqueTitles.add(book.title);
        uniqueBooks.push(book);
      }
    }

    return uniqueBooks;
  };

  const uniqueBooks = removeDuplicates(books);
  const [isAdded, setIsAdded] = useState(uniqueBooks.map(() => false));
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    setBookshelf(storedBookshelf);
  }, []);

  useEffect(() => {
    console.log("bookshelf state updated:", bookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }, [bookshelf]);

  const handleClick = (index) => {
    setIsAdded((prevIsAdded) => {
      const updatedIsAdded = [...prevIsAdded];
      updatedIsAdded[index] = !updatedIsAdded[index];
      if (updatedIsAdded[index]) {
        console.log("Adding book to bookshelf:", uniqueBooks[index]);
        setBookshelf((prevBookshelf) => [...prevBookshelf, uniqueBooks[index]]);
      } else {
        console.log("Removing book from bookshelf:", uniqueBooks[index].title);
        setBookshelf((prevBookshelf) =>
          prevBookshelf.filter(
            (book) => book.title !== uniqueBooks[index].title
          )
        );
      }
      return updatedIsAdded;
    });
  };

  return (
    <div>
      <div className="w-80% gap-[2rem] h-screen flex justify-center items-center flex-wrap">
        {uniqueBooks.length > 0 ? (
          uniqueBooks.map((el, i) => (
            <div
              key={i}
              className="w-[14rem] h-[20rem] justify-center items-center flex flex-col gap-[2rem] border-[2px] border-black rounded-md"
            >
              <h1 className="text-center">Book Title: {el.title}</h1>
              <span>Edition Count: {el.edition_count} </span>
              <button
                onClick={() => handleClick(i)}
                className="w-[10rem] bg-green-500 text-white h-[2rem] rounded-xl flex justify-center items-center"
              >
                {isAdded[i] ? "Added To Bookshelf" : "Add To Bookshelf"}
              </button>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {/* {bookshelf.length > 0 && <Bookshelf books={bookshelf} setBookshelf={setBookshelf} />} */}
    </div>
  );
};

export default Cards;
