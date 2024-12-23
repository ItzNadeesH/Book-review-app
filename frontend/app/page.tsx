"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";
import Spinner from "@/components/Spinner";

interface Book {
  title: string;
  author: string;
  cover: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("harry potter");

  // Fetch books from Open Library API based on searchTerm
  const fetchBooks = async (term: string) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${term}`
      );
      const booksData = response.data.docs.map(
        (book: { title: string; author_name: string; cover_i: string }) => ({
          title: book.title,
          author: book.author_name?.[0] || "Unknown",
          cover: book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : null,
        })
      );
      setBooks(booksData);
    } catch (err) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  // Fetch books initially and also when searchTerm changes
  useEffect(() => {
    fetchBooks(searchTerm);
  }, [searchTerm]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="p-5 max-w-screen-xl mx-auto">
      {/* SearchInput Component to handle search */}
      <SearchInput onSearch={handleSearch} />

      {/* Display fetched books */}
      <div className="flex flex-wrap mt-5">
        {books.length > 0 ? (
          books.map((book, index) => (
            <Link
              key={index}
              className="w-1/3"
              href={{
                pathname: "/reviews",
                query: {
                  title: book.title,
                  author: book.author,
                },
              }}
            >
              <div className="m-4 p-4 border rounded-lg h-[360px]">
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-40 h-60 object-cover mb-3 mx-auto"
                  />
                ) : (
                  <div className="w-40 h-60 bg-gray-300 mb-3 mx-auto" />
                )}
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
