import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import { Contact, Message, NewMessage } from "./interfaces";
import { ADD_CONTACT, ADD_MESSAGE, REMOVE_CONTACT } from "./mutationTypes";

export interface State {
  conversations: Map<string, Message[]>;
  contacts: Contact[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    conversations: new Map(),
    contacts: [],
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
  },
  actions: {},
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
