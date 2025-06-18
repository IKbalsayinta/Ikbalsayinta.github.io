const Snake = {
    position: {x: 0, y: Math.floor(ROWS / 2)},
    velocity: {x: 1, y: 0},
    length: 3,
    segments: [],
    score: 0,
    headImages: {}, // Object voor de verschillende kopafbeeldingen
    bodyImage: 'snakebody3.png',
    currentHeadImage: 'rightsnake2.png', // Huidige afbeelding voor de kop

    // Zorg ervoor dat afbeeldingen worden geladen
    loadImages() {
        // Laad kopafbeeldingen
        this.headImages.up = new Image();
        this.headImages.up.src = 'upsnake.png';

        this.headImages.down = new Image();
        this.headImages.down.src = 'downsnake2.png';

        this.headImages.left = new Image();
        this.headImages.left.src = 'leftsnake2.png';

        this.headImages.right = new Image();
        this.headImages.right.src = 'rightsnake2.png';

        // Stel de standaard kopafbeelding in (bijvoorbeeld naar rechts)
        this.currentHeadImage = this.headImages.right;

        // Laad lichaamsafbeelding
        this.bodyImage = new Image();
        this.bodyImage.src = 'snakebody3.png';
    },

    scale: 1.9, // Schaalfactor, 1.5 betekent 150% van de oorspronkelijke grootte

    draw(context) {
        const scaledSize = CELL_SIZE * this.scale; // Bereken de geschaalde grootte
        this.segments.forEach((segment, i) => {
            if (i === 0 && this.currentHeadImage.complete) {
                // Teken de kop met de juiste afbeelding en geschaalde grootte
                context.drawImage(
                    this.currentHeadImage,
                    segment.x * CELL_SIZE,
                    segment.y * CELL_SIZE,
                    scaledSize, // Geschaalde breedte
                    scaledSize  // Geschaalde hoogte
                );
            } else if (this.bodyImage.complete) {
                // Teken de rest van het lichaam met de geschaalde grootte
                context.drawImage(
                    this.bodyImage,
                    segment.x * CELL_SIZE,
                    segment.y * CELL_SIZE,
                    scaledSize, // Geschaalde breedte
                    scaledSize  // Geschaalde hoogte
                );
            }
        });

        // Teken de score
        context.textAlign = 'left';
        context.fillStyle = 'white';
        context.fillText('score: ' + this.score, 20, 20);
    },

    update() {
        // Beweeg de slang
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Wijzig de kopafbeelding op basis van de beweging
        if (this.velocity.x === 1) {
            this.currentHeadImage = this.headImages.right;
        } else if (this.velocity.x === -1) {
            this.currentHeadImage = this.headImages.left;
        } else if (this.velocity.y === -1) {
            this.currentHeadImage = this.headImages.up;
        } else if (this.velocity.y === 1) {
            this.currentHeadImage = this.headImages.down;
        }

        // Voeg segmenten toe en verwijder overtollige
        this.segments.unshift({x: this.position.x, y: this.position.y});
        if (this.segments.length > this.length) {
            this.segments.pop();
        }

        // Botsing met muren
        if (
            this.position.x < 0 ||
            this.position.x > COLUMNS - 1 ||
            this.position.y < 0 ||
            this.position.y > ROWS - 1
        ) {
            GAME.gameOver = true;
        }

        // Eet voedsel
        if (this.position.x === Food.x && this.position.y === Food.y) {
            Food.reset();
            this.length++;
            this.score++;
        }

        // Botsing met eigen staart
        this.segments.forEach((segment, i) => {
            if (i > 0 && (segment.x === this.position.x && segment.y === this.position.y)) {
                this.segments.length = i + 1;
                this.score -= 5;
                this.length = this.segments.length;
            }
        });
    },

    reset() {
        this.score = 0;
        this.length = 3;
        this.segments = [];
        this.position = {x: 0, y: Math.floor(ROWS / 2)};
        this.velocity = {x: 1, y: 0};
        this.currentHeadImage = this.headImages.right; // Reset kopafbeelding naar standaard
    },

    moveUp() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = -1;
        }
    },

    moveDown() {
        if (this.velocity.y === 0) {
            this.velocity.x = 0;
            this.velocity.y = 1;
        }
    },

    moveLeft() {
        if (this.velocity.x === 0) {
            this.velocity.x = -1;
            this.velocity.y = 0;
        }
    },

    moveRight() {
        if (this.velocity.x === 0) {
            this.velocity.x = 1;
            this.velocity.y = 0;
        }
    }
};

// Zorgt ervoor dat afb laadt wanneer spel start
Snake.loadImages();
