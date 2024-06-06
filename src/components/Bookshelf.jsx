import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Bookshelf = ({ books, setBookshelf }) => {
  const handleRemove = (index) => {
    setBookshelf((prevBookshelf) =>
      prevBookshelf.filter((_, i) => i !== index)
    );
  };

  const navigate = useNavigate();
  console.log(navigate);

  const goBack = () => {
    navigate(-1); 
  };
  return (
    <>
      <button
        onClick={goBack}
        className="px-[2rem] py-[1rem] bg-black text-white rounded-lg mt-8"
      >
        Go back
      </button>
      <div className="w-80% gap-[2rem] h-screen flex justify-center items-center flex-wrap">
        {books && books.length > 0 ? (
          books.map((book, i) => (
            <div
              key={i}
              className="w-[14rem] h-[20rem] justify-center items-center flex flex-col gap-[2rem] border-[2px] border-black rounded-md"
            >
              <h1 className="text-center">Book Title: {book.title}</h1>
              <span>Edition Count: {book.edition_count} </span>
              <button
                onClick={() => handleRemove(i)}
                className="w-[10rem] bg-red-500 text-white h-[3rem] rounded-xl flex justify-center items-center"
              >
                Remove from Bookshelf
              </button>
            </div>
          ))
        ) : (
          <h1>No books in the bookshelf</h1>
        )}
      </div>
    </>
  );
};

export default Bookshelf;
