import toCSV from "@/lib/user-csv";
import testUser from "../users/TestUser";
import { expect } from "chai";

describe("User to SCV", function() {
  it("Should serialize to csv ", () => {
    const csv = toCSV([testUser]);

    expect(csv).to.deep.contain(
      "male,Mr Patrik Holum,patrik.holum@example.com,NO,10/10/1994,2019-03-26T01:55:09.090Z"
    );
  });
});
