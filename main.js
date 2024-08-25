// Function to get user input from the input field
// Function to get user input from the input field
function getUserInput() {
    return document.querySelector(".js-userinput").value;
}

// Function to display GIFs in the UI
function displayGifs(data) {
    const container = document.querySelector(".js-container"); // Update class name to match HTML
    container.innerHTML = ""; // Clear previous results

    data.data.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url; // Use appropriate image size if needed
        img.alt = gif.title; // Add alt text for accessibility
        container.appendChild(img);
    });
}

// Function to search Giphy with the user input
function searchGiphy(query) {
    const apiKey = 'z6j5WFh7KCxZK0eygDJ9WQwxrWqEjGCP';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayGifs(data);
        })
        .catch(error => console.error('Error:', error));
}

// Add event listener for the "Go" button
document.querySelector(".js-go").addEventListener("click", function () {
    const userInput = getUserInput(); // Use the function to get user input
    searchGiphy(userInput);
});

// Add event listener for the "Enter" key in the input field
document.querySelector(".js-userinput").addEventListener("keyup", function (e) {
    if (e.which === 13) { // 13 is the Enter key
        const userInput = getUserInput(); // Use the function to get user input
        searchGiphy(userInput);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page-number');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentPage = 1;

    function showPage(pageNumber) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`page${pageNumber}`).classList.add('active');
        currentPage = pageNumber;

        // Add your logic to display page content based on `currentPage`
        console.log(`Showing content for page ${pageNumber}`);
    }

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pages.length) {
            showPage(currentPage + 1);
        }
    });

    pages.forEach(page => {
        page.addEventListener('click', (e) => {
            e.preventDefault();
            const pageNumber = parseInt(e.target.textContent);
            showPage(pageNumber);
        });
    });

    // Initialize the first page as active
    showPage(currentPage);
});
