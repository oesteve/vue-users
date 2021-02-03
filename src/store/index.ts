import Vue from "vue";
import Vuex from "vuex";
import { createModule as createUsersModule } from "@/store/users";
import AxiosUserProvider from "@/lib/users/AxiosUserProvider";
import axios from "axios";
import UserProvider from "@/lib/users/UserProvider";
import { FavoritesStorage } from "@/lib/users/FavoritesStorage";
import BackendFavoritesStorage from "@/lib/users/BackendFavoritesStorage";

Vue.use(Vuex);

export interface GlobalState {
  nickname: string;
}

const userProvider: UserProvider = new AxiosUserProvider(axios);
const favUsersStore: FavoritesStorage = new BackendFavoritesStorage(axios);

export default new Vuex.Store({
  state: {
    nickname: "anonymous"
  },
  mutations: {
    setNickname(state, nickname) {
      state.nickname = nickname;
    }
  },
  actions: {
    setNickname({ commit }, nickname) {
      if (!nickname) {
        nickname = "anonymous";
      }

      commit("setNickname", nickname);
      favUsersStore.setNickname(nickname);
    }
  },
  getters: {
    nickname(state) {
      return state.nickname;
    }
  },
  modules: {
    users: createUsersModule(userProvider, favUsersStore)
  }
});
