import { Module } from "vuex";
import { GlobalState } from "@/store";
import User, { UserGender } from "@/lib/users/User";
import UserProvider from "@/lib/users/UserProvider";
import { filterUsers, UserFilter } from "@/lib/users/UserFilterer";
import { FavoritesStorage } from "@/lib/users/FavoritesStorage";

export interface UsersState {
  users: User[];
  favourites: User[];
  filter: UserFilter;
  selectedUser: User | null;
  favourite: boolean;
  favorites: User[];
}

export function createModule(
  provider: UserProvider,
  favStore: FavoritesStorage
): Module<UsersState, GlobalState> {
  return {
    namespaced: true,
    state: {
      users: [],
      favourites: [],
      filter: {
        gender: null,
        ages: null,
        nationality: null
      },
      selectedUser: null,
      favourite: false,
      favorites: []
    },
    mutations: {
      setUsers(state, users: User[]) {
        state.users = users;
      },
      setFilterGender(state, gender: null | UserGender) {
        state.filter.gender = gender;
      },
      setFilterAges(state, age: [number, number] | null) {
        state.filter.ages = age;
      },
      setFilterNationality(state, regexp: string | null) {
        state.filter.nationality = regexp;
      },
      setSelectedUser(state, user: User | null) {
        state.selectedUser = user;
      },
      setUserAsFavorite(state, favorite: boolean) {
        state.favourite = favorite;
      },
      setFavorites(state, favorites: User[]) {
        state.favorites = favorites;
      }
    },
    actions: {
      async getUsers({ commit }) {
        const users = await provider.getUsers();
        commit("setUsers", users);
      },
      filterByGender({ commit }, gender) {
        commit("setFilterGender", gender);
      },
      filterByAges({ commit }, range) {
        commit("setFilterAges", range);
      },
      filterByNationality({ commit }, regexp) {
        commit("setFilterNationality", regexp);
      },
      async selectUser({ commit }, user) {
        commit("setSelectedUser", user);
        commit("setUserAsFavorite", false);

        if (await favStore.isFavorite(user)) {
          commit("setUserAsFavorite", true);
        }
      },
      async setUserAsFavorite({ commit, state }, favorite) {
        if (!state.selectedUser) {
          return;
        }
        commit("setUserAsFavorite", favorite);
        if (favorite) {
          await favStore.setUser(state.selectedUser);
          return;
        }
        await favStore.removeUser(state.selectedUser);
      },
      async getFavorites({ commit }) {
        const favorites = await favStore.getUsers();
        commit("setFavorites", favorites);
      }
    },
    getters: {
      users(state) {
        return filterUsers(state.users, state.filter);
      },
      selectedUser(state) {
        return state.selectedUser;
      },
      isFavorite(state) {
        return state.favourite;
      },
      favorites(state) {
        return state.favorites;
      }
    }
  };
}
