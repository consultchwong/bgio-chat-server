/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game, TurnOrder, PlayerView } from "boardgame.io/core";
import sha3 from "crypto-js/sha3";
import CryptoJS from "crypto-js";

export const PlayerProfile = Game({
  name: "player-profile",

  setup: () => ({
    name: "player1",
    secret: {
      token: "12345",
      password: "AABBCC",
      authenticated: "",
      nickname: "test",
      pic: "https://material-ui.com/static/images/avatar/1.jpg"
    },
    token: ["12345"],
    rooms: {
      "1": {
        name: "New Game",
        room_admin: ["0"],
        type: "live-chat",
        status: "p",
        t: "2019-07-11T08:34:35.152Z"
      }
    },
    players: {
      "0": { authenticated: "" },
      "1": {
        name: "Serpent",
        pic: "https://material-ui.com/static/images/avatar/2.jpg",
        game_list: [1],
        nickname: ""
      },
      "2": {
        name: "Eva",
        pic: "https://material-ui.com/static/images/avatar/3.jpg",
        game_list: [1],
        nickname: ""
      }
    }
  }),
  playerView: PlayerView.STRIP_SECRETS,
  moves: {
    signUpPlayer(G, ctx, name) {
      //console.log("addText", sess_id, msg);
      var hash = sha3(new Date().toString(), { outputLength: 32 });
      console.log(hash.toString(CryptoJS.enc.Hex));
      var new_player_id = "player-" + hash.toString(CryptoJS.enc.Hex);
      console.log(new_player_id);

      G.players[new_player_id] = {
        name: name,
        pic: "",
        game_list: []
      };
      ctx.numPlayers = 20;
      //console.log("addText ret", { ...G });
    },
    createRoom(G, ctx, name, room_admin_id, type) {
      //console.log("addText", sess_id, msg);
      var hash = sha3(new Date().toString(), { outputLength: 32 });
      console.log(hash.toString(CryptoJS.enc.Hex));
      var new_room_id = "game-" + hash.toString(CryptoJS.enc.Hex);

      G.rooms[new_room_id] = {
        name: name,
        room_admin: [room_admin_id],
        type: type,
        status: "p",
        t: new Date()
      };
      //console.log("addText ret", { ...G });
    },
    authenticatePlayer(G, ctx, playerID, uid, pwd) {
      console.log("authenticatePlayer", uid, pwd);
      console.log("authenticatePlayer G.secret", G.secret);
      var hash = sha3(new Date().toString(), { outputLength: 32 });
      console.log(hash.toString(CryptoJS.enc.Hex));
      var new_room_id = uid + "-" + hash.toString(CryptoJS.enc.Hex);
      console.log(G.secret);
      var secret_password = "AABBCC";
      if (pwd === secret_password) {
        G.players[playerID]["token"] = new_room_id;
        G.players[playerID]["authenticated"] = "ok";
      } else {
        G.players[playerID]["token"] = "";
        G.players[playerID]["authenticated"] = "failed";
      }

      //G.token.push(new_room_id);
    },
    addBuddy(G, ctx, id) {}
  },

  flow: {
    numPlayers: 1,
    movesPerTurn: 1,
    turnOrder: TurnOrder.ANY,
    onMove: (G, ctx) => {
      Object.keys(G.players).map(key => {
        console.log(key, G.players[key]["authenticated"]);
        if (G.players[key]["authenticated"] === "ok") {
          console.log(G.secret);
          G.players[key].secret = G.secret;
          console.log(G.players[key].secret);
        }
        return "";
      });
    },
    endGameIf: (G, ctx) => {
      console.log("endGameIf", G.secret);
    }
  }
});
