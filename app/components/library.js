"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Book from "./books";

export default function Library() {
  const [verseIds, setVerseIds] = useState([]);
  const [verseDisplay, setVerseDisplay] = useState([]);

  async function getListOfVerses() {
    try {
      const response = await axios.get('https://bible-api.com/?random=verse');
      console.log('List of verses response:', response.data);
      const verses = [response.data]; // Adjust based on actual response structure
      setVerseIds(verses);
    } catch (error) {
      console.log('Error fetching list of verses:', error);
    }
  }

  async function getVerseDetails(reference) {
    const url = `https://bible-api.com/${reference}`;
    console.log('Fetching verse details from URL:', url);
    try {
      const response = await axios.get(url);
      console.log('Verse details response:', response.data);
      return response.data;
    } catch (error) {
      console.log('Error fetching verse details:', error);
    }
  }

  useEffect(() => {
    getListOfVerses();
  }, []);

  useEffect(() => {
    (async () => {
      if (verseIds.length > 0) {
        const thisLibrary = [];
        for (const verse of verseIds) {
          const thisVerse = await getVerseDetails(`${verse.book_name} ${verse.chapter}:${verse.verse}`);
          thisLibrary.push(thisVerse);
        }
        setVerseDisplay(thisLibrary);
      }
    })();
  }, [verseIds]);

  return (
    <section>
      {verseDisplay.map((verse, index) => (
        <Book key={index} bookObj={verse} />
      ))}
    </section>
  );
}