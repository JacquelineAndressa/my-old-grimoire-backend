require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(() => console.log("Failed to connect to MongoDB!"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.post("/api/books", (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    imageUrl: req.body.imageUrl,
    year: req.body.year,
    genre: req.body.genre,
    ratings: req.body.ratings,
    averageRating: req.body.averageRating,
    userId: req.body.userId,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Book saved successfully!" }))
    .catch((error) => res.status(400).json({ error: error }));
});

app.get("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
});

app.get("/api/books/:id", (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
});

module.exports = app;
