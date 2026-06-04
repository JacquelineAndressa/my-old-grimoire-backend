require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

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

app.get("/api/books", (req, res, next) => {
  const books = [
    {
      _id: "oeihfzeoi",
      title: "Le Seigneur des Anneaux",
      author: "J.R.R. Tolkien",
      imageUrl: "",
      year: 1954,
      genre: "Fantasy",
      ratings: [{ userId: "qsomihvqios", grade: 5 }],
      averageRating: 5,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Harry Potter",
      author: "J.K. Rowling",
      imageUrl: "",
      year: 1997,
      genre: "Fantasy",
      ratings: [{ userId: "qsomihvqios", grade: 4 }],
      averageRating: 4,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(books);
});

app.post("/api/books", (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ message: "Book created successfully!" });
});

module.exports = app;
