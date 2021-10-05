import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Conversation, Contact } from "./store/interfaces";

declare module "@vue/runtime-core" {
  interface State {
    conversations: Conversation[];
    contacts: Contact[];
    conversationOptions: Map<string, boolean>;
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
