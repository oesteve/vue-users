import { FavoritesStorage } from "./FavoritesStorage";
import User from "../users/User";

export default class InMemoryFavoritesStorage implements FavoritesStorage {
  private favorites: { [key: string]: User[] } = {};

  get(username: string): User[] {
    return this.favorites[username] || [];
  }

  set(username: string, favorites: User[]): void {
    this.favorites[username] = favorites;
  }
}
