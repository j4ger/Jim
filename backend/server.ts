import { Application } from "https://deno.land/x/abc@v1.3.3/mod.ts";
import {
  acceptWebSocket,
  WebSocket,
} from "https://deno.land/x/abc@v1.3.3/vendor/https/deno.land/std/ws/mod.ts";
import { abcCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB("jim.db");

const app = new Application();

console.log("running");

class User {
  id!: number;
  nickname!: string;
  avatar!: string;

  constructor(params: [number, string, string]) {
    this.id = params[0];
    this.nickname = params[1];
    this.avatar = params[2];
  }
}

class WSMessage {
  type!: WSMessageType;
  message!: Message;

  constructor(type: WSMessageType, message: Message) {
    this.type = type;
    this.message = message;
  }
}

enum WSMessageType {
  SEND_MESSAGE = 0,
  RECEIVE_MESSAGE = 1,
}

class Message {
  from!: number;
  to!: number;
  content!: string;
  timestamp!: number;

  constructor(params: [number, number, string, number]) {
    this.from = params[0];
    this.to = params[1];
    this.content = params[2];
    this.timestamp = params[3];
  }
}

const allUsersQuery = db.prepareQuery<[number, string, string]>(
  "SELECT id,nickname,avatar FROM User"
);

const userQuery = db.prepareQuery<[number, string, string]>(
  "SELECT id,nickname,avatar FROM User WHERE id = :id"
);

const contactsQuery = db.prepareQuery<[string]>(
  "SELECT contacts FROM User WHERE id = :id"
);

const contactQuery = db.prepareQuery<[number, string, string]>(
  "SELECT id,nickname,avatar FROM User WHERE id = :id"
);

const messageQuery = db.prepareQuery<[number, number, string, number]>(
  "SELECT [from],[to],content,timestamp FROM Message WHERE [from] = :id OR [to] = :id"
);

const newMessageQuery = db.prepareQuery(
  "INSERT INTO Message ([from],[to],content,timestamp) VALUES (:sender,:receiver,:content,:timestamp)"
);

const userMap: Map<number, WebSocket> = new Map();

app
  .get("/alive", (_ctx) => {
    return "up";
  })
  .get("/all_users", (_ctx) => {
    return allUsersQuery.all().map((element) => new User(element));
  })
  .get(":id/self", (ctx) => {
    const { id } = ctx.params;
    const user = userQuery.one({ id });
    return new User(user);
  })
  .get("/:id/contacts", (ctx) => {
    const { id } = ctx.params;
    const [contacts] = contactsQuery.one({ id });
    const contactList: number[] = JSON.parse(contacts);
    const results = [];
    for (const id of contactList) {
      const result = contactQuery.one({ id });
      results.push(new User(result));
    }
    return results;
  })
  .get("/:id/messages", (ctx) => {
    const { id } = ctx.params;
    return messageQuery.all({ id }).map((element) => new Message(element));
  })
  .get("/:id/ws", async (ctx) => {
    const { id } = ctx.params;
    const userId = parseInt(id);
    const { conn, headers, r: bufReader, w: bufWriter } = ctx.request;
    const ws = await acceptWebSocket({
      conn,
      headers,
      bufReader,
      bufWriter,
    });

    userMap.set(userId, ws);

    for await (const e of ws) {
      console.log(e);
      const wSMessage: WSMessage = JSON.parse(e.toString());
      if (wSMessage.type == WSMessageType.SEND_MESSAGE) {
        const { from, to, content, timestamp } = wSMessage.message;
        newMessageQuery.execute({
          sender: from,
          receiver: to,
          content,
          timestamp,
        });
        userMap
          .get(to)
          ?.send(
            JSON.stringify(
              new WSMessage(WSMessageType.RECEIVE_MESSAGE, wSMessage.message)
            )
          );
      }
    }

    userMap.delete(userId);
  })
  .use(abcCors())
  .start({ hostname: "0.0.0.0", port: 11451 });
