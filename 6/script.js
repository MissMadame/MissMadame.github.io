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
});
