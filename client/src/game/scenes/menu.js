import helper from "../helper";

export default class menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  init() {
    this.tween_duration = 300;
  }
  create() {
    helper.createBackground(this, "menu-bg");

    this.createPlayButtonSet();
    this.createCustomizeButtonSet();

    this.showButtons();
    this.showLogos();
    helper.sceneIntro(this);
  }

  showLogos() {
    this.add.image(20, 20, "geometrytrinity").setOrigin(0);
    this.add.image(this.game.GW - 20, 20, "instagram").setOrigin(1, 0);
  }
  hideButtons() {
    return new Promise((resolve) => {
      this.customizeButtonTween(20);
      setTimeout(() => {
        this.playButtonTween(-20).then(() => resolve());
      }, this.tween_duration / 2);
    });
  }

  showButtons() {
    this.playButtonTween("-=35");
    setTimeout(() => this.customizeButtonTween(-40), this.tween_duration / 2);
  }

  customizeButtonTween(angle) {
    return new Promise((resolve, reject) => {
      this.tweens.add({
        targets: this.customize_stick,
        angle: angle,
        duration: this.tween_duration,
        onUpdate: () => {
          const angle = Phaser.Math.DegToRad(this.customize_stick.angle);

          const x =
            this.customize_stick.x +
            (this.customize_stick.displayWidth +
              this.customize_button.displayWidth / 2 -
              10) *
              Math.cos(angle);

          const y =
            this.customize_stick.y -
            (this.customize_button.displayWidth / 2 +
              this.customize_stick.displayWidth -
              10) *
              -Math.sin(angle);

          this.customize_button.x = x;
          this.customize_button.y = y;
        },
        onComplete: () => resolve(),
      });
    });
  }

  playButtonTween(angle) {
    return new Promise((resolve) => {
      this.tweens.add({
        targets: this.play_stick,
        angle: angle,
        duration: this.tween_duration,
        onUpdate: () => {
          const angle = Phaser.Math.DegToRad(this.play_stick.angle);

          const x =
            this.play_stick.x -
            (this.play_stick.displayWidth +
              this.play_button.displayWidth / 2 +
              5) *
              Math.cos(angle);

          const y =
            this.play_stick.y -
            (this.play_button.displayWidth / 2 +
              this.play_stick.displayWidth -
              5) *
              Math.sin(angle);

          this.play_button.x = x;
          this.play_button.y = y;
        },
        onComplete: () => resolve(),
      });
    });
  }

  createStick(x, y, origin, target, sprite) {
    const stick = this.add.image(x, y, sprite);

    stick.setOrigin(origin.x, origin.y);

    stick.displayWidth =
      Phaser.Math.Distance.Between(stick.x, stick.y, target.x, target.y) -
      target.displayWidth / 2;

    return stick;
  }

  createCustomizeButtonSet() {
    this.customize_button = helper
      .createButton(this, 0, this.game.GH / 2 + 200, "customize-button", () => {
        this.hideButtons().then(() =>
          helper.sceneTransition(this, "customize")
        );
      })
      .setDepth(1);

    this.customize_button.x -= this.customize_button.displayWidth / 2;

    this.customize_stick = this.createStick(
      0,
      this.game.GH + 10,
      { x: 0, y: 0.5 },
      this.customize_button,
      "menu-stick-blue"
    );
    this.customize_stick.x -= this.customize_stick.displayHeight / 2;
    const angle_between = Phaser.Math.Angle.BetweenPoints(
      this.customize_button,
      this.customize_stick
    );
    this.customize_stick.setAngle(Phaser.Math.RadToDeg(angle_between) + 180);
  }

  createPlayButtonSet() {
    this.play_button = helper
      .createButton(
        this,
        this.game.GW,
        this.game.GH / 2 + 80,
        "play-button",
        () => {
          this.hideButtons().then(() =>
            helper.sceneTransition(this, "levelSelect")
          );
        }
      )
      .setDepth(1);
    this.play_button.x += this.play_button.displayWidth / 2;

    this.play_stick = this.createStick(
      this.game.GW,
      this.game.GH + 10,
      { x: 1, y: 0.5 },
      this.play_button,
      "menu-stick-yellow"
    );

    const angle_between = Phaser.Math.Angle.BetweenPoints(
      this.play_button,
      this.play_stick
    );
    this.play_stick.setAngle(Phaser.Math.RadToDeg(angle_between));
    this.play_button.setAngle(Phaser.Math.RadToDeg(angle_between));
  }
}

/*
import helper from "../helper";

export default class menu extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  init() {
    this.tween_duration = 800;
  }
  create() {
    helper.createBackground(this, "menu-bg");

    this.createPlayButtonSet();
    this.createCustomizeButtonSet();

    this.showButtons();
  }

  showButtons() {
    this.showPlayButton().then(() => this.showCustomizeButton());
  }

  showPlayButton() {
    return new Promise((resolve, reject) => {
      this.tweens.add({
        targets: this.play_stick,
        angle: +75,
        duration: this.tween_duration,
        ease: "Bounce.easeOut",
        onUpdate: () => {
          const angle = Phaser.Math.DegToRad(this.play_stick.angle);

          const x =
            this.play_stick.x -
            (this.play_button.displayWidth / 2 - this.play_stick.displayWidth) *
              -Math.cos(angle);

          const y =
            this.play_stick.y +
            (this.play_button.displayWidth / 2 + this.play_stick.displayWidth) *
              -Math.sin(angle);

          this.play_button.x = x;
          this.play_button.y = y;
          // this.play_button.setPosition(x, y);
        },
        onComplete: () => resolve(),
      });
    });
  }

  showCustomizeButton() {
    return new Promise((resolve, reject) => {
      this.tweens.add({
        targets: this.customize_stick,
        angle: -50,
        duration: this.tween_duration,
        ease: "Bounce.easeOut",
        onUpdate: () => {
          const angle = Phaser.Math.DegToRad(this.customize_stick.angle);

          const x =
            this.customize_stick.x +
            (this.customize_button.displayWidth / 2 +
              this.customize_stick.displayWidth) *
              Math.cos(angle);

          const y =
            this.customize_stick.y +
            (this.customize_button.displayWidth / 2 +
              this.customize_stick.displayWidth) *
              Math.sin(angle);

          this.customize_button.setPosition(x, y);
        },
        onComplete: () => resolve(),
      });
    });
  }

  createStick(x, y, origin, target) {
    const stick = this.add.image(x, y, "stick_1");

    stick.setOrigin(origin.x, origin.y);

    stick.displayWidth =
      Phaser.Math.Distance.Between(stick.x, stick.y, target.x, target.y) -
      target.displayWidth / 2;

    return stick;
  }

  createCustomizeButtonSet() {
    this.customize_button = helper.createButton(
      this,
      this.game.GW / 2 + 100,
      this.game.GH,
      "customize-button",
      () => this.scene.start("customize")
    );

    this.customize_stick = this.createStick(
      0,
      this.game.GH,
      { x: 0, y: 0.5 },
      this.customize_button
    );
  }

  createPlayButtonSet() {
    this.play_button = helper.createButton(
      this,
      this.game.GW / 2 - 200,
      this.game.GH,
      "play-button",
      () => this.scene.start("levelSelect")
    );

    this.play_stick = this.createStick(
      this.game.GW,
      this.game.GH,
      { x: 1, y: 0.5 },
      this.play_button
    );
  }
}

*/