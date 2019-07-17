import "babel-polyfill";
import { Server } from "./libs/boardgame.io/server";
import  Game  from "./game";
import  PlayerProfile  from "./playerprofile";

console.log(Game);

const port = process.env.PORT || 8000;
const server = Server({ games: [Game, PlayerProfile] });

server.run(port, () => {
  console.log("App is running on port " + port);
});
