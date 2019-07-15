/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import { Game, TurnOrder, PlayerView } from "boardgame.io/core";


const RPS = Game({
  name: "Rock–paper–scissors",

  setup: () => ({
    actions: [null, null],
    players: {
      "0": "secret0",
      "1": "secret1"
    }
  }),
  playerView: PlayerView.STRIP_SECRETS,
  moves: {
    takeAction(G, ctx, action) {
      console.log("takeAction", action);

      G.actions[ctx.currentPlayer] = action;
      console.log("takeAction G.actions", G.actions);
      console.log("takeAction ret", { ...G });
    },
    takePlayerAction(G, ctx, playerID, action) {
      console.log("takeAction", action);

      G.actions[playerID] = -1;
      G.players[playerID.toString()] = action;
      console.log("takeAction G.actions", G.actions);
      console.log("takeAction ret", { ...G });
    }
  },

  flow: {
    movesPerTurn: 1,
    turnOrder: TurnOrder.ANY,
    endGameIf: (G, ctx) => {
      console.log("endGameIf", G.players);
      if (G.actions[0] != null && G.actions[1] != null) {
        if (G.players["0"] === G.players["1"]) {
          return { draw: true };
        } else if (G.players["0"] === 0 && G.players["1"] === 2) {
          return { winner: 0, finalview: G.players };
        } else if (G.players["0"] === 2 && G.players["1"] === 1) {
          return { winner: 0, finalview: G.players };
        } else if (G.players["0"] === 1 && G.players["1"] === 0) {
          return { winner: 0, finalview: G.players };
        } else {
          return { winner: 1, finalview: G.players };
        }
      }
    }
  }
});



export default RPS;
