import { FavoritesStorage } from "@/lib/users/FavoritesStorage";
import User from "@/lib/users/User";
import { AxiosInstance } from "axios";

export default class BackendFavoritesStorage implements FavoritesStorage {
  public axiosInstance: AxiosInstance;
  private nickname = "anonymous";

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  setNickname(value: string): void {
    this.nickname = value;
  }

  async setUser(user: User): Promise<void> {
    const users = await this.get();
    await users.push(user);

    await this.post(users);
  }

  async removeUser(user: User): Promise<void> {
    let users = await this.get();
    users = users.filter(item => item.login.uuid !== user.login.uuid);
    await this.post(users);
  }

  async getUsers(): Promise<User[]> {
    return this.get();
  }

  async isFavorite(user: User): Promise<boolean> {
    const users = await this.get();
    const found = users.find(item => item.login.uuid === user.login.uuid);

    return !!found;
  }

  private async get(): Promise<User[]> {
    const response = await this.axiosInstance.get(
      `http://localhost:3000/api/users/${this.nickname}/favorites`
    );

    return response.data;
  }

  private async post(users: User[]): Promise<void> {
    await this.axiosInstance.post(
      `http://localhost:3000/api/users/${this.nickname}/favorites`,
      { users }
    );
  }
}
