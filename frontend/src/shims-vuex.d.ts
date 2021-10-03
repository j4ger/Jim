import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { Conversation, Contact } from "./store/interfaces";

declare module "@vue/runtime-core" {
  interface State {
    conversations: Conversation[];
    contacts: Contact[];
    self: Contact;
    transition: string;
    title: string;
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
