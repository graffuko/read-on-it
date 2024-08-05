import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./books"; // Assuming this component remains unchanged

export default function Library() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      console.log('Books fetched:', response.data.docs);
      setBooks(response.data.docs);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  return (
    <section>
      {books.map((book, index) => (
        <Book key={index} bookObj={book} />
      ))}
    </section>
  );
}