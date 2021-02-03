import User, { UserGender } from "@/lib/users/User";

export interface UserFilter {
  gender: UserGender | null;
  ages: [number, number] | null;
  nationality: string | null;
}

export function filterUsers(users: User[], filter: UserFilter) {
  return users.filter((user: User) => {
    const gender = filter.gender;
    if (gender && gender !== user.gender) {
      return false;
    }

    const ages = filter.ages;
    if (ages) {
      if (ages[0] > user.dob.age || ages[1] < user.dob.age) {
        return false;
      }
    }

    const nationality = filter.nationality;
    return !(nationality && !user.nat.match(new RegExp(nationality, "i")));
  });
}
