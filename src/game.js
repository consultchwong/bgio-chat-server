/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game, TurnOrder, PlayerView } from "boardgame.io/core";

const LiveChat = Game({
  name: "live-chat",

  setup: () => ({
    chatSession: {
      chathere: {
        topic: "Just Say It",
        messages: [
          {
            avatar: 0,
            t: "Thanks for joining the chat",
            dt: "2019-07-11T08:34:35.152Z"
          }
        ],
        subscribers: [0, 2]
      }
    },
    players: {
      "0": "secret0",
      "1": "secret1"
    },
    avatars: [
      {
        name: "Adam",
        pic: "https://material-ui.com/static/images/avatar/1.jpg"
      },
      {
        name: "Serpent",
        pic: "https://material-ui.com/static/images/avatar/2.jpg"
      },
      {
        name: "Eva",
        pic: "https://material-ui.com/static/images/avatar/3.jpg"
      }
    ]
  }),
  playerView: PlayerView.STRIP_SECRETS,
  moves: {
    addText(G, ctx, sess_id, a_id, msg) {
      //console.log("addText", sess_id, msg);

      G.chatSession[sess_id].messages.push({
        avatar: a_id,
        t: msg,
        dt: new Date()
      });
      //console.log("addText ret", { ...G });
    },
    addAvatar(G, ctx, sess_id, avatar) {
      //console.log("addAvatar", avatar);

      G.chatSession[sess_id].subscribers.push(avatar);
      //console.log(
      //  "addAvatar G.chatSession[sess_id].subscribers",
      //  G.chatSession[sess_id].subscribers
      //);
      //console.log("addAvatar ret", { ...G });
    },
    invite(G, ctx, sess_id, avatar_id) {
      //console.log("invite", sess_id, avatar_id);

      G.chatSession[sess_id].subscribers.push(avatar_id);
      //console.log(
      //  "invite G.chatSession[sess_id].subscribers",
      //  G.chatSession[sess_id].subscribers
      //);
      //console.log("invite ret", { ...G });
    },
    createChatSession(G, ctx, sess_id, topic, player_id) {
      //console.log("createChatSession", G);
      //console.log("createChatSession", sess_id, topic, player_id);

      G.chatSession = {
        ...G.chatSession,
        [sess_id]: { topic: topic, messages: [], subscribers: [player_id] }
      };
      //console.log("createChatSession G.chatSession", G.chatSession);
      //console.log("createChatSession ret", { ...G });
    }
  },

  flow: {
    movesPerTurn: 1,
    turnOrder: TurnOrder.ANY,
    endGameIf: (G, ctx) => {
      //console.log("endGameIf", G.players);
    }
  }
});

export default LiveChat;
