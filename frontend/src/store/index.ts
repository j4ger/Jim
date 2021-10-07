const rawBaseUrl = "v04.local:11451";
const baseUrl = `http://${rawBaseUrl}/`;
const wsUrl = `ws://${rawBaseUrl}/`;

import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import {
  Contact,
  ConversationOptions,
  Message,
  MessageContent,
  NewMessage,
  WSInnerMessage,
  WSMessage,
  WSMessageType,
} from "./interfaces";
import {
  ADD_CONTACT,
  ADD_MESSAGE,
  CHANGE_TITLE,
  CHANGE_TRANSITION,
  TOGGLE_PIN_CONVERSATION,
  REMOVE_CONTACT,
  REMOVE_CONVERSATION,
  SHOW_NAV_BAR,
  HIDE_NAV_BAR,
  TRANSITION_START,
  TRANSITION_END,
  READ_MESSAGE,
  INIT,
  RESET,
  SET_ID,
  SET_SELF,
  CHANGE_ID,
  SEND_MESSAGE,
} from "./mutationTypes";

export interface State {
  conversations: Map<number, Message[]>;
  contacts: Contact[];
  conversationOptions: Map<number, ConversationOptions>;
  self: Contact;
  transition: string;
  title: string;
  showNavBar: boolean;
  transitioning: boolean;
  ws: WebSocket | null;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    conversations: new Map(),
    contacts: [],
    conversationOptions: new Map(),
    self: {
      id: 1,
      avatar:
        "https://www.gravatar.com/avatar/f676059596cd424c96cc85d8fa0f1e9a?d=robohash",
      nickname: "啊哈",
    } as Contact,
    transition: "slide-in-left",
    title: "",
    showNavBar: true,
    transitioning: false,
    ws: null,
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
      if (newMessage.message.from != state.self.id) {
        const newOptions =
          state.conversationOptions.get(newMessage.target) ??
          ({ pinned: false, removed: false, unread: 0 } as ConversationOptions);
        newOptions.unread++;
        state.conversationOptions.set(newMessage.target, newOptions);
      }
    },

    [CHANGE_TRANSITION](state: State, transition: string) {
      state.transition = transition;
    },

    [CHANGE_TITLE](state: State, title: string) {
      state.title = title;
    },

    [REMOVE_CONVERSATION](state: State, target: number) {
      const newOptions =
        state.conversationOptions.get(target) ??
        ({ pinned: false, removed: true, unread: 0 } as ConversationOptions);
      newOptions.removed = true;
      state.conversationOptions.set(target, newOptions);
    },

    [TOGGLE_PIN_CONVERSATION](state: State, target: number) {
      const newOptions =
        state.conversationOptions.get(target) ??
        ({ pinned: false, removed: false, unread: 0 } as ConversationOptions);
      newOptions.pinned = !newOptions.pinned;
      state.conversationOptions.set(target, newOptions);
    },

    [SHOW_NAV_BAR](state: State) {
      state.showNavBar = true;
    },

    [HIDE_NAV_BAR](state: State) {
      state.showNavBar = false;
    },

    [TRANSITION_START](state: State) {
      state.transitioning = true;
    },

    [TRANSITION_END](state: State) {
      state.transitioning = false;
    },

    [READ_MESSAGE](state: State, target: number) {
      const newOptions =
        state.conversationOptions.get(target) ??
        ({ pinned: false, removed: false, unread: 0 } as ConversationOptions);
      newOptions.unread = 0;
      state.conversationOptions.set(target, newOptions);
    },

    [RESET](state: State) {
      state.contacts = [];
      state.conversations = new Map();
      state.conversationOptions = new Map();
      state.ws?.close();
    },

    [SET_ID](state: State, id: number) {
      state.self.id = id;
    },

    [SET_SELF](state: State, self: Contact) {
      state.self = self;
    },
  },
  getters: {
    sortedConversations(state: State) {
      const pinnedConversations: [number, Message[]][] = [];
      const unpinnedConversations: [number, Message[]][] = [];
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
  actions: {
    async [INIT]({ state, commit }) {
      commit(RESET);
      const self: Contact = await (
        await fetch(baseUrl + state.self.id + "/self")
      ).json();
      commit(SET_SELF, self);
      const contacts: Contact[] = await (
        await fetch(baseUrl + state.self.id + "/contacts")
      ).json();
      contacts.forEach((contact) => commit(ADD_CONTACT, contact));
      const messages: WSInnerMessage[] = await (
        await fetch(baseUrl + state.self.id + "/messages")
      ).json();
      messages.forEach((message) => {
        const { content, from, timestamp, to } = message;
        const target = from == state.self.id ? to : from;
        const contentArray: MessageContent[] = JSON.parse(content);
        commit(ADD_MESSAGE, {
          target,
          message: { from, to, timestamp, content: contentArray },
        } as NewMessage);
      });
      const ws = new WebSocket(wsUrl + state.self.id + "/ws");
      ws.onopen = () => {
        state.ws = ws;
      };
      ws.onmessage = (message) => {
        const wSMessage: WSMessage = JSON.parse(message.data);
        if (wSMessage.type == WSMessageType.RECEIVE_MESSAGE) {
          const { content, from, timestamp, to } = wSMessage.message;
          const contentArray: MessageContent[] = JSON.parse(content);
          const newMessage: NewMessage = {
            message: {
              from,
              to,
              timestamp,
              content: contentArray,
            },
            target: from,
          };
          commit(ADD_MESSAGE, newMessage);
        }
      };
    },

    [CHANGE_ID]({ commit, dispatch }, id) {
      commit(SET_ID, id);
      dispatch(INIT);
    },

    [SEND_MESSAGE]({ commit, state }, message: NewMessage) {
      commit(ADD_MESSAGE, message);
      const { from, to, content, timestamp } = message.message;
      state.ws?.send(
        JSON.stringify(
          new WSMessage(WSMessageType.SEND_MESSAGE, {
            from,
            to,
            timestamp,
            content: JSON.stringify(content),
          })
        )
      );
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
