import Manager from "../main/levelBasic.js"
import helper from "../helper.js"

export default class level_5 extends Phaser.Scene {
  constructor() {
    super("level_5")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this)
    this.manager.init()
    this.manager.rotation_direction = -1
  }

  create() {
    this.manager.create()

    this.manager.createGUI()
    this.manager.createFirstTarget()
    this.manager.createTargets()
    this.manager.centerTargets()
    this.manager.target_array.reverse()
    this.manager.helper.checkNewTargetsQueue()
    this.manager.setNewTarget()

    this.manager.showTargets()
    this.manager.createStick()
    this.manager.createCircles()
    this.manager.bindInputEvents()

    helper.sceneIntro(this)
  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
}