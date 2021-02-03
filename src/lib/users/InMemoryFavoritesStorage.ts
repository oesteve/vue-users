import { FavoritesStorage } from "@/lib/users/FavoritesStorage";
import User from "@/lib/users/User";

export default class InMemoryFavoritesStorage implements FavoritesStorage {
  private users: { [key: string]: User } = {};
  private nickname = "anonymous";

  setUser(user: User): Promise<void> {
    this.users[user.login.uuid] = user;

    return Promise.resolve();
  }

  removeUser(user: User): Promise<void> {
    delete this.users[user.login.uuid];

    return Promise.resolve();
  }

  getUsers(): Promise<User[]> {
    const users: User[] = [];

    for (const [, user] of Object.entries(this.users)) {
      users.push(user);
    }

    return Promise.resolve(users);
  }

  isFavorite(user: User): Promise<boolean> {
    return Promise.resolve(!!this.users[user.login.uuid]);
  }

  setNickname(nickname: string): void {
    this.nickname = nickname;
  }
}
