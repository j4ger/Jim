import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import {
  Contact,
  ConversationOptions,
  Message,
  NewMessage,
} from "./interfaces";
import {
  ADD_CONTACT,
  ADD_MESSAGE,
  CHANGE_TITLE,
  CHANGE_TRANSITION,
  TOGGLE_PIN_CONVERSATION,
  REMOVE_CONTACT,
  REMOVE_CONVERSATION,
} from "./mutationTypes";

export interface State {
  conversations: Map<string, Message[]>;
  contacts: Contact[];
  conversationOptions: Map<string, ConversationOptions>;
  self: Contact;
  transition: string;
  title: string;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    conversations: new Map(),
    contacts: [],
    conversationOptions: new Map(),
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
    [REMOVE_CONVERSATION](state: State, target: string) {
      const newOptions =
        state.conversationOptions.get(target) ??
        ({ pinned: false, removed: true } as ConversationOptions);
      newOptions.removed = true;
      state.conversationOptions.set(target, newOptions);
    },
    [TOGGLE_PIN_CONVERSATION](state: State, target: string) {
      const newOptions =
        state.conversationOptions.get(target) ??
        ({ pinned: false, removed: false } as ConversationOptions);
      newOptions.pinned = !newOptions.pinned;
      state.conversationOptions.set(target, newOptions);
    },
  },
  getters: {
    sortedConversations(state: State) {
      const pinnedConversations: [string, Message[]][] = [];
      const unpinnedConversations: [string, Message[]][] = [];
      state.conversations.forEach((value, key) => {
        if (state.conversationOptions.get(key)?.pinned) {
          pinnedConversations.push([key, value]);
        } else {
          unpinnedConversations.push([key, value]);
        }
      });
      pinnedConversations.sort(
        (elementA, elementB) =>
          elementA[1][elementA[1].length - 1].timestamp -
          elementB[1][elementB[1].length - 1].timestamp
      );
      unpinnedConversations.sort(
        (elementA, elementB) =>
          elementA[1][elementA[1].length - 1].timestamp -
          elementB[1][elementB[1].length - 1].timestamp
      );
      return new Map([...pinnedConversations, ...unpinnedConversations]);
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
