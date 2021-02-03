import User from "@/lib/users/User";

export default interface UserProvider {
  getUsers(): Promise<User[]>;
}
