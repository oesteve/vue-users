import User from "@/lib/users/User";

export interface FavoritesStorage {
  setNickname(nickname: string): void;
  setUser(user: User): Promise<void>;
  removeUser(user: User): Promise<void>;
  getUsers(): Promise<User[]>;
  isFavorite(user: User): Promise<boolean>;
}
