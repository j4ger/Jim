import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { Contact, Message, NewMessage } from "./interfaces";
import {
  ADD_CONTACT,
  ADD_MESSAGE,
  CHANGE_TITLE,
  CHANGE_TRANSITION,
  REMOVE_CONTACT,
} from "./mutationTypes";

export interface State {
  conversations: Map<string, Message[]>;
  contacts: Contact[];
  self: Contact;
  transition: string;
  title: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    conversations: new Map(),
    contacts: [],
    self: {
      id: "114519",
      avatar: "https://www.gravatar.com/avatar",
      nickname: "senpai3",
    } as Contact,
    transition: "slide-in-left",
    title: "",
  },
  mutations: {
    [ADD_CONTACT](state: State, contact: Contact) {
      state.contacts.push(contact);
    },
    [REMOVE_CONTACT](state: State, contact: Contact) {
      for (let i = 0; i < state.contacts.length; i++) {
        if (state.contacts[i] == contact) {
          state.contacts.splice(i, 1);
          i--;
        }
      }
    },
    [ADD_MESSAGE](state: State, newMessage: NewMessage) {
      const currentConversation =
        state.conversations.get(newMessage.target) || [];
      currentConversation.push(newMessage.message);
      state.conversations.set(newMessage.target, currentConversation);
    },
    [CHANGE_TRANSITION](state: State, transition: string) {
      state.transition = transition;
    },
    [CHANGE_TITLE](state: State, title: string) {
      state.title = title;
    },
  },
  actions: {},
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
