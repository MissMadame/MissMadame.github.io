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
            item.style.display = 'flex';
        });
    } else {
        allItems.forEach(item => {
            item.style.display = 'none';
        });

        const categoryItems = document.querySelectorAll(`.column-80 .grid-item[data-category="${category}"]`);
        categoryItems.forEach(item => {
            item.style.display = 'flex';
        });
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.column-20').classList.toggle('dark-mode');
    document.querySelector('.column-80').classList.toggle('dark-mode');
    document.querySelector('.header').classList.toggle('dark-mode');
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));

    const darkModeButton = document.querySelector('.button3');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = '☀️';
        darkModeButton.title = 'Switch to Light Mode';
    } else {
        darkModeButton.textContent = '🌙';
        darkModeButton.title = 'Switch to Dark Mode';
    }
}
