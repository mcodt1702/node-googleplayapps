const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("common"));
const applist = require("./playapps");

app.get("/apps", (req, res) => {
  const { sort = "", genre } = req.query;

  if (sort) {
    if (!["rating", "app"].includes(sort)) {
      return res.status(400).send("Sort must be one of rating or app");
    }
  }

  // if ([genre === ""]) {
  //   return;
  //   res.status(400).send("please");
  // }

  if (genre) {
    if (
      !["action", "puzzle", "strategy", "casual", "arcade", "card"].includes(
        genre.toLowerCase().trim()
      )
    ) {
      return res
        .status(400)
        .send(
          "Genre should be one of the following  'Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card' "
        );
    }
  }

  let results = applist.filter((item) =>
    item.Genres.toLowerCase().includes(genre.toLowerCase().trim())
  );

  if (sort) {
    results.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;
