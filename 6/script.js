let columns = 12;
let changeInterval = null; // Variable to store interval ID for gradual change

function updateGrid() {
    const grid = document.querySelector('.column-80 .grid');
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

// Gradually increase or decrease columns
function changeColumns(targetColumns) {
    clearInterval(changeInterval); // Clear any ongoing interval

    // Gradually adjust columns
    changeInterval = setInterval(() => {
        if (columns < targetColumns) {
            columns += 1;
            updateGrid();
        } else if (columns > targetColumns) {
            columns -= 1;
            updateGrid();
        } else {
            clearInterval(changeInterval); // Stop interval when target is reached
        }
    }, 100); // Adjust interval time for speed (100ms for smoother changes)
}

// Increase columns when the increase button is clicked
function increaseColumns() {
    changeColumns(columns < 20 ? columns + 1 : columns); // Targeting gradual increase up to max 20
}

// Decrease columns when the decrease button is clicked
function decreaseColumns() {
    changeColumns(columns > 1 ? columns - 1 : columns); // Targeting gradual decrease down to min 1
}

// Add event listeners to buttons
document.querySelector('.button1').addEventListener('click', increaseColumns);
document.querySelector('.button2').addEventListener('click', decreaseColumns);

function showCategory(category) {
    const allItems = document.querySelectorAll('.column-80 .grid-item');

    if (category === "homepage") {
        allItems.forEach(item => {
            item.style.display = 'flex'; // Show all items
        });
    } else {
        allItems.forEach(item => {
            item.style.display = 'none'; // Hide all items by default
        });

        allItems.forEach(item => {
            const categories = item.getAttribute('data-category').split(" ");
            if (categories.includes(category)) {
                item.style.display = 'flex'; // Show items that match the category
            }
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.column-20').classList.toggle('dark-mode');
    document.querySelector('.column-80').classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    
    // Select both .grid-item and .grid-item2
    const gridItems = document.querySelectorAll('.grid-item, .grid-item2');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));

    // Apply dark mode to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => button.classList.toggle('dark-mode'));

    const darkModeButton = document.querySelector('.button3');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = 'lightmode';
        darkModeButton.title = 'Switch to Light Mode';
    } else {
        darkModeButton.textContent = 'darkmode';
        darkModeButton.title = 'Switch to Dark Mode';
    }
}

// Function to generate random bright, saturated colors
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); // Hue can be any value (0 to 360)
    const saturation = Math.floor(Math.random() * 50) + 50; // Saturation: 50% to 100%
    const lightness = Math.floor(Math.random() * 30) + 50; // Lightness: 50% to 80% for brightness
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}


// Add event listeners to all grid items
const gridItems = document.querySelectorAll('.grid-item2');

gridItems.forEach(item => {
    item.addEventListener('mouseover', function() {
        // Change text color to random color on hover
        const categoryText = this.querySelector('.category');
        categoryText.style.color = getRandomColor();
    });

    item.addEventListener('mouseout', function() {
        // Reset the text color when the mouse leaves
        const categoryText = this.querySelector('.category');
        categoryText.style.color = ''; // Reset to original color
    });
});

// Select all buttons whose class starts exactly with "button"
const buttons = document.querySelectorAll('button[class^="button"]');

buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
        // Change the background color of the button to a random color
        this.style.backgroundColor = getRandomColor();
    });

    button.addEventListener('mouseout', function() {
        // Reset the background color when the mouse leaves
        this.style.backgroundColor = '#767676'; // Default background color
    });


// Select all grid items with images
const gridItems = document.querySelectorAll('.grid-item');

const imageMetadata = {
    "image1": { date: "2023-01-10", author: "Alice Johnson" },
    "image2": { date: "2023-02-15", author: "Bob Smith" },
    "image3": { date: "2023-03-20", author: "Cathy Brown" },
    // Add more images as needed
};

// Function to handle the click event for toggling size and showing info
function toggleImageSize(event) {
    const clickedItem = event.currentTarget;
    const isExpanded = clickedItem.classList.toggle('span-four'); // Toggle size

    // Retrieve the unique identifier
    const imageId = clickedItem.getAttribute('data-id');
    const metadata = imageMetadata[imageId];

    // Check if button already exists, if not, create one
    let closeButton = clickedItem.querySelector('.close-button');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = '🔗';
        clickedItem.appendChild(closeButton);
    }

    let infoBox = clickedItem.querySelector('.image-info');
    if (!infoBox) {
        infoBox = document.createElement('div');
        infoBox.classList.add('image-info');

        // Use the metadata if it exists, otherwise fallback to default
        const date = metadata ? metadata.date : '2024';
        const author = metadata ? metadata.author : 'Unknown Author';
        infoBox.textContent = `${date} | ${author}`;

        clickedItem.appendChild(infoBox);
    }

    // Show/hide the infoBox and closeButton based on expansion state
    closeButton.style.display = isExpanded ? 'block' : 'none';
    infoBox.style.display = isExpanded ? 'block' : 'none';

    // Add click event for the source button to open image source
    closeButton.onclick = (e) => {
        e.stopPropagation();
        const imageLink = clickedItem.querySelector('a')
            ? clickedItem.querySelector('a').href
            : clickedItem.querySelector('img').src;
        window.open(imageLink, '_blank');
    };
}


// Add click event listeners to all grid items
gridItems.forEach(item => {
    item.addEventListener('click', toggleImageSize);
});

// Create and style tooltip element
const tooltip = document.createElement('div');
tooltip.classList.add('cursor-tooltip');
document.body.appendChild(tooltip);

// Define text for each category button (customize as needed)
const categoryTexts = {
    "Bold" : "So not expecting this",
    "Gradient" : "Schrödinger's colors",
    "Soft" : "Transitioning",
    "Circle": "Flattening everything out",
    "View": "On windy days",
    "Plant": "I hope to watch them grow up",
    "Lil Monster": "If they were my friends",
    "If It Moves": "Constantly changing",
    "When It Writes": "...",
    "ABCabc": "game with 26"
};

// Function to show tooltip with dynamic text
function showTooltip(event) {
    const category = event.target.querySelector('.category').textContent;
    tooltip.textContent = categoryTexts[category] || "";
    tooltip.style.display = 'block';
}

// Function to hide tooltip
function hideTooltip() {
    tooltip.style.display = 'none';
}

// Function to move tooltip with cursor
function moveTooltip(event) {
    tooltip.style.top = `${event.clientY + 15}px`; // 15px below the cursor
    tooltip.style.left = `${event.clientX + 15}px`; // 15px to the right of the cursor
}

// Attach event listeners to each category button
const categoryButtons = document.querySelectorAll('.grid-item2');
categoryButtons.forEach(button => {
    button.addEventListener('mouseover', showTooltip);
    button.addEventListener('mouseout', hideTooltip);
    button.addEventListener('mousemove', moveTooltip);
});

function showTooltip(event) {
    const category = event.target.querySelector('.category').textContent.trim();
    console.log(`Hovering over category: ${category}`); // Debugging line
    tooltip.textContent = categoryTexts[category] || "";
    tooltip.style.display = 'block';
}

});

// Function to highlight category images and text
function highlightCategoryImages(event) {
    const categoryButton = event.currentTarget;
    const categoryText = categoryButton.querySelector('.category');
    const highlightColor = getRandomColor();

    // Set the random color to the category text only
    categoryText.style.color = highlightColor;

    // Add 'highlighted' class to the images in the grid that match the category
    document.querySelectorAll('.grid-item').forEach(item => {
        const categories = item.getAttribute('data-category').split(" ");
        if (categories.includes(categoryText.textContent.trim())) {
            item.classList.add('highlighted');
        }
    });
}

// Function to remove the highlight effect
function removeHighlight(event) {
    const categoryText = event.currentTarget.querySelector('.category');
    categoryText.style.color = ''; // Reset category text color

    document.querySelectorAll('.grid-item').forEach(item => {
        item.classList.remove('highlighted'); // Remove highlighted class
    });
}

// Attach event listeners to each category button
document.querySelectorAll('.grid-item2').forEach(button => {
    button.addEventListener('mouseover', highlightCategoryImages);
    button.addEventListener('mouseout', removeHighlight);
});

// Define tooltip text for each button
const buttonTooltips = {
    button1: "keep clicking",
    button2: "keep clicking",
    button3: "night night",
    button4: "what is this?",
    button5: "Let's see them all"
};

// Select the tooltip element
const tooltip = document.getElementById("button-tooltip");

// Show tooltip on mouse over
document.querySelectorAll('button[class^="button"]').forEach(button => {
    button.addEventListener('mouseover', function(event) {
        const buttonId = this.classList[0]; // Assumes button classes are named as button1, button2, etc.
        tooltip.textContent = buttonTooltips[buttonId] || ""; // Set tooltip text based on button class
        tooltip.style.display = 'block';
    });

    // Hide tooltip on mouse out
    button.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });

    // Move tooltip with the cursor
    button.addEventListener('mousemove', (event) => {
        tooltip.style.top = `${event.clientY + 15}px`; // Position below cursor
        tooltip.style.left = `${event.clientX + 15}px`; // Position to the right of cursor
    });
});
