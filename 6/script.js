let scrollAmount = 100; // Adjust this to control how much each click scrolls

function scrollUp() {
    window.scrollBy(0, -scrollAmount); // Scroll up by the specified amount
}

function scrollDown() {
    window.scrollBy(0, scrollAmount); // Scroll down by the specified amount
}


let columns = 12;
let lastScrollTop = 0;
let isUpdating = false;

function updateGrid() {
    const grid = document.querySelector('.column-80 .grid');
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
}

window.addEventListener('scroll', function () {
    if (isUpdating) return; // Skip if still updating

    isUpdating = true;
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        if (columns > 1) columns -= 1;
    } else {
        if (columns < 20) columns += 1;
    }

    updateGrid();

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    setTimeout(() => isUpdating = false, 100); // Delay for smoother updates
});

function showCategory(category) {
    const allItems = document.querySelectorAll('.column-80 .grid-item');

    if (category === "homepage") {
        // Show all items if "homepage" is clicked
        allItems.forEach(item => {
            item.style.display = 'flex';
        });
    } else {
        // Hide all items initially
        allItems.forEach(item => {
            item.style.display = 'none';
        });

        // Show only items with the selected category
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

    // Toggle dark mode on all grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => item.classList.toggle('dark-mode'));

    // Update button icon and tooltip for feedback
    const darkModeButton = document.querySelector('.button3');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = '☀️';
        darkModeButton.title = 'Switch to Light Mode';
    } else {
        darkModeButton.textContent = '🌙';
        darkModeButton.title = 'Switch to Dark Mode';
    }
}