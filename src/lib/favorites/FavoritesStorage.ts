import User from "../users/User";

export interface FavoritesStorage {
  set(nickname: string, favorites: User[]): void;
  get(nickname: string): User[];
}
