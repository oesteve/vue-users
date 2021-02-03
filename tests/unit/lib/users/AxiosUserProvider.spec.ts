import { expect } from "chai";
import AxiosUserProvider from "@/lib/users/AxiosUserProvider";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import testUser from "./TestUser";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockData = require("./mock-data.json");

describe("Axios provider implementation", () => {
  it("Should parse json content", async () => {
    const mock = new MockAdapter(axios);
    const provider = new AxiosUserProvider(axios);
    mock.onGet().reply(200, mockData);

    const users = await provider.getUsers();

    expect(users).to.deep.equal([testUser]);
  });
});
