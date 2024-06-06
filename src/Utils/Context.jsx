import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from "react";

export const booksContext = createContext();

const Context = (props) => {
  const [books, setBooks] = useState({});
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://openlibrary.org/search.json?q=YOUR_QUERY&limit=28&page=1");
        setBooks(response.data.docs);
        console.log(response.data.docs); 
      } catch (error) {
        console.log(error);
      }
    };

    getData(); 
  }, []);
  return (
    <booksContext.Provider value={[books, setBooks]}>
      {props.children}
    </booksContext.Provider>
  );
};

export default Context;
