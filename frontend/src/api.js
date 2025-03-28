import axios from "axios";

const API_URL = `${import.meta.env.VITE_APP_API_URL}/books`;

export const fetchBooks = async () => await axios.get(`${API_URL}/getBooks`);
export const addBook = async (book) =>
  await axios.post(`${API_URL}/addBook`, book);
export const updateBook = async (book) =>
  await axios.post(`${API_URL}/updateBook`, book);
export const deleteBook = async (bookId) =>
  await axios.get(`${API_URL}/deleteBook`, { params: { bookId } });
export const searchBook = async (searchType, searchValue) => {
  if (searchType === "bookId")
    return await axios.post(
      `${API_URL}/searchByIdOrTitle?bookId=${searchValue}`
    );
  else {
    return await axios.post(
      `${API_URL}/searchByIdOrTitle?title=${searchValue}`
    );
  }
};
export const shutdownServer = async () =>
  await axios.get(`${import.meta.env.VITE_APP_API_URL}/system/exit`);
