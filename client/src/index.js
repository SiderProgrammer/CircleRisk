import Phaser from "./main/lib/phaser-full"

import config from "./main/game/core/game-config"
import accountCreator from "./main/account-creator"
import { getProgress } from "./main/shortcuts/save.js"
import bindPrototypeExtendedFunctions from "./main/prototypes"

bindPrototypeExtendedFunctions()

window.main_font = "luckiestGuy"
window.CLIENT_GAME_VERSION = 1;
//localStorage.clear()
export const startGame = () => {
  const game = new Phaser.Game(config)
  game.GW = config.width
  game.GH = config.height

  if (!game.device.os.desktop) game.input.mouse.enabled = false
}

window.onload = () => getProgress() === null ? accountCreator() : startGame()
  

