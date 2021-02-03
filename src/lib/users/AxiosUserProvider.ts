import User from "@/lib/users/User";
import { AxiosInstance } from "axios";
import UserProvider from "@/lib/users/UserProvider";

export default class AxiosUserProvider implements UserProvider {
  public axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  getUsers(): Promise<User[]> {
    return this.axiosInstance
      .get("https://randomuser.me/api/?page=1&results=100")
      .then(res => {
        return res.data.results.map((data: object) => {
          return data;
        });
      });
  }
}
