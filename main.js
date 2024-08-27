document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const userInput = document.getElementById('searchInput');
    const resultContainer = document.getElementById('resultsContainer');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const menuToggle = document.getElementById('menuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    let query = '';
    let offset = 0;
    const limit = 10; // Number of GIFs per page

    // Function to fetch GIFs from Giphy API
    const fetchGifs = async (query, offset, limit) => {
        const apiKey = 'z6j5WFh7KCxZK0eygDJ9WQwxrWqEjGCP'; // Replace with your Giphy API key
        const url = `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            if (data.data.length > 0) {
                displayGifs(data.data);
                loadMoreButton.style.display = data.pagination.total_count > offset + limit ? 'block' : 'none';
            } else {
                if (offset === 0) {
                    resultContainer.innerHTML = '<p class="error-message">No GIFs found for your search term.</p>';
                } else {
                    loadMoreButton.style.display = 'none'; // Hide button if no more results
                }
            }
        } catch (error) {
            console.error('Error fetching GIFs:', error);
            resultContainer.innerHTML = '<p class="error-message">Failed to fetch GIFs. Please try again later.</p>';
        }
    };

    // Function to display GIFs in the UI
    const displayGifs = (gifs) => {
        resultContainer.innerHTML += gifs.map(gif => `
            <div class="gif-item">
                <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
            </div>
        `).join('');
    };

    // Event listener for the search button
    searchButton.addEventListener('click', () => {
        query = userInput.value.trim();
        if (query) {
            offset = 0; // Reset offset for new search
            resultContainer.innerHTML = ''; // Clear previous results
            fetchGifs(query, offset, limit);
        } else {
            resultContainer.innerHTML = '<p class="error-message">Please enter a search term.</p>';
        }
    });

    // Event listener for pressing Enter in the input field
    userInput.addEventListener('keyup', (e) => {
        if (e.which === 13) { // 13 is the Enter key
            query = userInput.value.trim();
            if (query) {
                offset = 0; // Reset offset for new search
                resultContainer.innerHTML = ''; // Clear previous results
                fetchGifs(query, offset, limit);
            } else {
                resultContainer.innerHTML = '<p class="error-message">Please enter a search term.</p>';
            }
        }
    });

    // Event listener for the "Load More" button
    loadMoreButton.addEventListener('click', () => {
        offset += limit; // Increase offset for next page
        fetchGifs(query, offset, limit);
    });

    // Event listener for the hamburger menu toggle
    menuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });
});

});
