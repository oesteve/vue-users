import User from "@/lib/users/User";

export default function(users: User[]): string {
  // let csvContent = "data:text/csv;charset=utf-8,";
  let csvContent = "";

  users.forEach(function(user) {
    const row = [
      user.gender,
      `${user.name.title} ${user.name.first} ${user.name.last}`,
      user.email,
      user.nat,
      (new Date(user.dob.date)).toLocaleDateString(),
      user.registered.date
    ];
    csvContent += row + "\r\n";
  });

  return csvContent;
}
