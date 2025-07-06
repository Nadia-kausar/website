import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    console.log("Books:", books);  // debug: check if books are fetched
    res.status(200).json(books);   // send the data as JSON
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Server error" });
  }
};