import Vuex, { Store } from "vuex";
import { createLocalVue } from "@vue/test-utils";
import { createModule } from "@/store/users";
import { InMemoryUserProvider } from "@/lib/users/InMemoryUserProvider";
import { expect } from "chai";
import { GlobalState } from "@/store";
import testUser from "../lib/users/TestUser";
import { UserGender } from "@/lib/users/User";
import InMemoryFavoritesStorage from "@/lib/users/InMemoryFavoritesStorage";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("User list actions", function() {
  let provider: InMemoryUserProvider;
  let favUserStore: InMemoryFavoritesStorage;
  let store: Store<GlobalState>;

  beforeEach(() => {
    provider = new InMemoryUserProvider();
    favUserStore = new InMemoryFavoritesStorage();
    store = new Vuex.Store({
      modules: { users: createModule(provider, favUserStore) }
    });
  });

  it("Should retrieve users", async () => {
    provider.setUser(testUser);
    await store.dispatch("users/getUsers");
    expect(store.getters["users/users"]).length(1);
  });

  it("Should filter by gender", async () => {
    store.commit("users/setUsers", [testUser]);

    expect(store.getters["users/users"]).length(1);

    await store.dispatch("users/filterByGender", UserGender.Female);
    expect(store.getters["users/users"]).length(0);
  });

  it("Should filter by ages", async () => {
    store.commit("users/setUsers", [testUser]);

    await store.dispatch("users/filterByAges", [18, 20]);
    expect(store.getters["users/users"]).length(0);
  });

  it("Should filter by nationality", async () => {
    store.commit("users/setUsers", [testUser]);

    expect(store.getters["users/users"]).length(1);

    await store.dispatch("users/filterByNationality", "Italy");
    expect(store.getters["users/users"]).length(0);
  });
});

describe("Select user actions", () => {
  let provider: InMemoryUserProvider;
  let favUserStore: InMemoryFavoritesStorage;
  let store: Store<GlobalState>;

  beforeEach(() => {
    provider = new InMemoryUserProvider();
    favUserStore = new InMemoryFavoritesStorage();
    store = new Vuex.Store({
      modules: { users: createModule(provider, favUserStore) }
    });
  });

  it("Should selected a user", async () => {
    await store.dispatch("users/selectUser", testUser);

    expect(store.getters["users/selectedUser"]).to.deep.equal(testUser);
  });
});

describe("Favorites actions", () => {
  let provider: InMemoryUserProvider;
  let favUserStore: InMemoryFavoritesStorage;
  let store: Store<GlobalState>;

  beforeEach(() => {
    provider = new InMemoryUserProvider();
    favUserStore = new InMemoryFavoritesStorage();
    store = new Vuex.Store({
      modules: { users: createModule(provider, favUserStore) }
    });
  });

  it("Should to set a user as favorite", async () => {
    store.commit("users/setSelectedUser", testUser);
    await store.dispatch("users/setUserAsFavorite", true);

    const favUsers = await favUserStore.getUsers();

    expect(favUsers).deep.eq([testUser]);
    expect(store.getters["users/isFavorite"]).to.be.true;
  });

  it("Should get if selected user is favorite", async () => {
    await favUserStore.setUser(testUser);

    await store.dispatch("users/selectUser", testUser);

    expect(store.getters["users/isFavorite"]).to.be.true;
  });

  it("Should get a list of favorites", async () => {
    await favUserStore.setUser(testUser);

    await store.dispatch("users/getFavorites");

    expect(store.getters["users/favorites"]).to.deep.equal([testUser]);
  });
});
