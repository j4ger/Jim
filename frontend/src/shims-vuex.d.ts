import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Contact } from "./store/interfaces";

declare module "@vue/runtime-core" {
  interface State {
    conversations: Map<number, Message[]>;
    contacts: Contact[];
    conversationOptions: Map<number, boolean>;
    self: Contact;
    transition: string;
    title: string;
    showNavBar: boolean;
    transitioning: boolean;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
