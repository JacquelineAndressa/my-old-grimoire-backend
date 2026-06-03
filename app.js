const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use("/api/books", (req, res, next) => {
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

module.exports = app;
