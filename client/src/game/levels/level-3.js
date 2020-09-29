import Manager from "../main/level-manager.js"

export default class level_3 extends Phaser.Scene {
  constructor() {
    super("level_3")
  }

  init(config) {
    this.level = config.level
    this.score_to_next_level = config.score_to_next_level

    this.manager = new Manager(this, config.config)
    this.manager.init()
  }

  create() {
    this.manager.create()

    this.manager.createGUI()
    this.manager.createFirstTarget()
    this.manager.createTargets()
    this.manager.setNewTarget()

    this.manager.centerTargets()

    this.darkenTargets()
    this.manager.createStick()
    this.manager.createCircles()
    this.manager.bindInputEvents()

    this.manager.GUI_helper.sceneIntro(this)
  }
  update() {
    if (!this.manager.game_started) return
    this.manager.updateRotationAngle()
    this.manager.updateCircleStickAngle()
    this.manager.checkIfMissedTarget()
  }
  darkenTargets() {
    this.manager.target_array[this.manager.current_target].setVisible(true)
    this.manager.target_array.forEach((target) => {
      target.setAlpha(Phaser.Math.Between(15, 50) / 100)
    })

    this.manager.target_array[this.manager.next_target].setVisible(false)
  }
}
