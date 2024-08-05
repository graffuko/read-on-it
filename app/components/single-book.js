"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Book from "./books";

export default function SingleBook() {
  const [singleBook, setSingleBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bookKey = 'OLID/OL229501A'; // Replace with dynamic key or ISBN as needed

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      try {
        const response = await axios.get(`https://openlibrary.org/works/${bookKey}.json`);
        console.log('Single book response:', response.data);
        const bookData = {
          reference: response.data.title,
          text: response.data.description ? response.data.description.value : "No description available",
          translation_id: response.data.key, // Use the key for Open Library
          translation_name: response.data.publish_date ? response.data.publish_date : "Unknown date",
          cover_id: response.data.covers ? response.data.covers[0] : null, // Use the first cover if available
        };
        setSingleBook(bookData);
      } catch (error) {
        console.log('Error fetching single book:', error);
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      {singleBook && <Book bookObj={singleBook} />}
    </section>
  );
}