// Each of your own card a sprite
export default class Card {
    constructor(card, position, scene) {
        this.card = card;
        this.isSelected = false;
        this.sprite = scene.add.image(500+position,700, card).setScale(0.15, 0.15).setInteractive();
        // scene.input.setDraggable(card);

        let self = this;

        this.sprite.on('pointerdown', function () {
            self.isSelected = !(self.isSelected);
        });

        this.sprite.on('pointerover', function () {
            if (!(self.isSelected)) {
                self.sprite.setTint(0x999989);
            }
        });

        this.sprite.on('pointerout', function () {
            if (!(self.isSelected)) {
                self.sprite.setTint(0xffffff);
            }
        });
    }
}