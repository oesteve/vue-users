import UserProvider from "@/lib/users/UserProvider";
import User from "@/lib/users/User";

export class InMemoryUserProvider implements UserProvider {
  private users: { [key: string]: User } = {};

  getUsers(): Promise<User[]> {
    const users: User[] = [];

    for (const [, user] of Object.entries(this.users)) {
      users.push(user);
    }

    return Promise.resolve(users);
  }

  setUser(user: User): void {
    this.users[user.login.uuid] = user;
  }
}
