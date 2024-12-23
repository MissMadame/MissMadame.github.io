

const bookCounts = [ 25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
const impacts = [
    "Ignite a love for reading in 5 children",
    "Stock a mini-library for a classroom",
    "Build 3 home libraries for young readers",
    "Refresh a school library with new stories",
    "Give 15 kids their own book collections",
    "Support a literacy program for 20 children",
    "Set up a reading corner in a community center",
    "Help 25 kids improve their reading skills",
    "Supply books for 30 classrooms",
    "Create mobile book boxes for underserved areas",
    "Support 10 kids to graduate elementary school",
    "Furnish a small community library for year-round access"
];
function fillRectangles() {
    const sliderValue = parseInt(document.getElementById("slider").value, 10);
    const rectangles = document.querySelectorAll(".rectangles .rectangle");
    const titleElement = document.getElementById("title");
    const textDisplayElement = document.getElementById("textDisplay");
    const logoElement = document.querySelector(".logo-image");
    const bodyElement = document.body;
    const footerElement = document.getElementById("footer"); // Get the footer element

    const numberToFill = sliderValue * 10;

    rectangles.forEach((rectangle, index) => {
        const rectIndexFromBottom = rectangles.length - 1 - index;

        if (sliderValue === 11) {
            // Add sparkle animation
            rectangle.classList.add("sparkle");
            rectangle.style.backgroundColor = "white";
            rectangle.style.border = "1px solid white";
            rectangle.style.width = "7.2px";
            rectangle.style.borderRadius = "50%";
        } else {
            // Remove sparkle animation
            rectangle.classList.remove("sparkle");
            if (parseInt(rectangle.className.replace(/^\D+/g, '')) < numberToFill) {
                rectangle.style.backgroundColor = "#70CDDD";
                rectangle.style.border = "1px solid #70CDDD";
                rectangle.style.width = ""; // Reset
                rectangle.style.borderRadius = ""; // Reset
            } else {
                rectangle.style.backgroundColor = "white";
                rectangle.style.border = "1px solid #000";
                rectangle.style.width = ""; // Reset
                rectangle.style.borderRadius = ""; // Reset
            }
        }
    });

    // Update text and background
    if (bookCounts[sliderValue] !== undefined && impacts[sliderValue] !== undefined) {
        document.getElementById("bookCount").textContent = bookCounts[sliderValue];
        document.getElementById("impact").textContent = impacts[sliderValue];
    }

    // Apply styles for slider value 500
    if (sliderValue === 11) {
        titleElement.textContent = "500 Books Reached!";
        bodyElement.style.backgroundColor = "#70CDDD";
        bodyElement.style.backgroundImage = "none";

        titleElement.style.color = "white";
        textDisplayElement.style.color = "white";

        logoElement.src = "assets/logo white.svg";
        logoElement.style.transform = "scale(1.1)"; // Slight enlargement for effect

        // Update footer styles for 500 books
        footerElement.style.backgroundColor = "white";
        footerElement.style.color = "#70CDDD";
    } else {
        titleElement.textContent = "Books Are Wings";
        bodyElement.style.backgroundColor = "white";
        bodyElement.style.backgroundImage = "";

        titleElement.style.color = ""; // Reset
        textDisplayElement.style.color = ""; // Reset

        logoElement.src = "assets/logo.svg";
        logoElement.style.transform = "scale(1)"; // Reset size

        // Reset footer styles
        footerElement.style.backgroundColor = "#70CDDD";
        footerElement.style.color = "white";
    }
}


// Attach the function to the slider's input event
document.getElementById("slider").addEventListener("input", fillRectangles);
