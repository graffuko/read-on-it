"use client";

import { useState } from "react";
import axios from "axios";
import Book from "./books";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      console.log('Search results:', response.data);
      setResults(response.data.docs); 
    } catch (error) {
      console.log('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.searchContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className={styles.searchInput}
      />
      <button onClick={handleSearch} disabled={loading} className={styles.searchButton}>
        {loading ? 'Searching...' : 'Search'}
      </button>
      <div>
        {results.map((book, index) => (
          <Book
            key={index}
            bookObj={{
              reference: book.title,
              text: book.author_name ? book.author_name.join(", ") : "Unknown author",
              translation_id: book.key,
              translation_name: book.publish_year ? book.publish_year.join(", ") : "Unknown year",
              cover_id: book.cover_i
            }}
          />
        ))}
      </div>
    </section>
  );
}