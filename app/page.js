import React from 'react';
import Library from './components/library';
import SingleBook from './components/single-book';
import Search from './components/search';

export default function Home() {
  return (
      <div>
        <Search />
        <Library />
        <SingleBook />
      </div>
  );
}