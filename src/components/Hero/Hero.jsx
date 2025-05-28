import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import BookModal from "../Modal/Modal";
import EditModal from "../EditModal/EditModal";
import { API } from "../utilis/config";

const Hero = ({ search }) => {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
    setEditBook(null);
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditBook(null);
  };

  const fetchBooks = () => {
    API.get("/books")
      .then((res) => {
        setBooks(res.data.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch books", err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = (id) => {
    API.get(`/books?id=${id}`)
      .then((res) => {
        if (res.data.isOk) {
          setBooks((e) => e.filter((book) => book._id !== id));
        }
      })
      .catch((err) => console.error("Delete error", err));
  };

  const handleStatusEdit = async (updatedBook) => {
    await API.patch("/books", updatedBook);
    fetchBooks();
    setEditModalOpen(false);
    setEditBook(null);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const kun = (date) => new Date(date).getFullYear();

  return (
    <div className="hero p-6">
      <div className="books-top flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            You've got{" "}
            <span className="text-purple-700">
              {filteredBooks.length} books
            </span>
          </h1>
          <span className="text-xl">Your books today</span>
        </div>

        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#6A00FF",
            color: "#FFF",
            padding: "10px 24px",
            borderRadius: "10px",
          }}
        >
          + Create a book
        </Button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <li
            key={book._id}
            className="group border border-gray-300 rounded-[10px] p-4 bg-white shadow"
          >
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold">{book.title}</h2>
                <p className="text-gray-500">
                  Cover:{" "}
                  <a href={book.cover} className="text-blue-600">
                    {book.cover}
                  </a>
                </p>
                <p className="text-gray-700 mt-1">Pages: {book.pages}</p>
                <p className="text-gray-700 mt-1">
                  Published: {kun(book.published)}
                </p>
                <p className="text-gray-700 mt-1">Isbn: {book.isbn}</p>
                <p className="mt-4 text-gray-700">{book.author}</p>
                <p className="mt-4 text-gray-700">
                  {book.author} / {kun(book.published)}
                </p>
              </div>
              <div className="hidden group-hover:flex flex-col gap-2 ml-4">
                <button
                  className="text-red-600"
                  onClick={() => deleteBook(book._id)}
                >
                  X
                </button>
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setEditBook(book);
                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <p
              className={`mt-4 font-semibold px-3 py-1 ml-80 rounded w-20 text-center ${
                book.status === 1
                  ? "bg-green-500"
                  : book.status === 2
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {book.status === 1
                ? "New"
                : book.status === 2
                ? "Reading"
                : "Finished"}
            </p>
          </li>
        ))}
      </ul>

      <BookModal
        open={modalOpen}
        onClose={handleClose}
        onBookAdded={fetchBooks}
      />
      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        book={editBook}
        onSave={handleStatusEdit}
      />
    </div>
  );
};

export default Hero;
