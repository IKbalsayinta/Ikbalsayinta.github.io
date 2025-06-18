const Food = {
    x: Math.floor(Math.random() * COLUMNS),
    y: Math.floor(Math.random() * ROWS),
    image: new Image(),  // Create a new image object
    loaded: false,       // Flag to track if the image is loaded

    // Initialize the image and set its source
    init() {
        this.image.src = 'meteor.png';  // Path to your image

        // Add the 'onload' event to check if the image loaded successfully
        this.image.onload = () => {
            console.log("Image Loaded Successfully!");  // Debugging: Image loaded
            this.loaded = true;  // Set flag to true when image is loaded
        };

        // Add the 'onerror' event to handle failed image loading
        this.image.onerror = (e) => {
            console.log("Error loading image:", e);  // Debugging: Error loading image
        };
    },

    draw(context) {
        
        if (this.loaded) {
            const SCALE_FACTOR = 1.9; // Schaalfactor: 1.9x groter
    
            context.save(); // Sla de huidige context-instellingen op
    
            // Verplaats de context naar het midden van het voedsel
            context.translate(
                this.x * CELL_SIZE + (CELL_SIZE / 2),
                this.y * CELL_SIZE + (CELL_SIZE / 2)
            );
    
            // Schaal de context
            context.scale(SCALE_FACTOR, SCALE_FACTOR);
    
            // Teken de afbeelding, gecorrigeerd naar het midden
            context.drawImage(
                this.image,
                -CELL_SIZE / 2, // Correctie voor de schaal
                -CELL_SIZE / 2, // Correctie voor de schaal
                CELL_SIZE,
                CELL_SIZE
            );
    
            context.restore(); // Herstel de originele context
        } else {
            console.log('Image not loaded yet'); // Debugging: Image not loaded
        }
    },
    

    reset() {
        this.x = Math.floor(Math.random() * COLUMNS);
        this.y = Math.floor(Math.random() * ROWS);
    }
};

// Call the init method to load the image when the game starts
Food.init();


