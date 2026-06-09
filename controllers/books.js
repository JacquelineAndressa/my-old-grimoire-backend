const Book = require("../models/book");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  const url = req.protocol + "://" + req.get("host");
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: url + "/images/" + req.file.filename,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book saved successfully!" }))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.modifyBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found!" });
      }
      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ error: "Unauthorized request!" });
      }
      let bookObject;
      if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        const bookData = JSON.parse(req.body.book);
        bookObject = {
          ...bookData,
          imageUrl: url + "/images/" + req.file.filename,
        };
      } else {
        bookObject = { ...req.body };
      }
      Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: "Book updated successfully!" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: "Book not found!" });
      }
      if (book.userId !== req.auth.userId) {
        return res.status(401).json({ error: "Unauthorized request!" });
      }
      Book.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Book deleted!" }))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
};
