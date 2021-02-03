import express from "express";
import cors from "cors";
import User from "../lib/users/User";
import InMemoryFavoritesStorage from "../lib/favorites/InMemoryFavoritesStorage";
import { FavoritesStorage } from "../lib/favorites/FavoritesStorage";

const favoriteStorage: FavoritesStorage = new InMemoryFavoritesStorage();

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.post("/api/users/:nickname/favorites", function(req, res) {
  const nickname = req.params.nickname as string;
  const users = req.body.users as User[];

  favoriteStorage.set(nickname, users);
  res.sendStatus(200);
});

app.get("/api/users/:nickname/favorites", function(req, res) {
  const nickname = req.params.nickname as string;
  const users = favoriteStorage.get(nickname);

  res.send(users);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
