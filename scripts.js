// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const yearFilter = document.getElementById('yearFilter');
    const genreFilter = document.getElementById('genreFilter');
    const statusFilter = document.getElementById('statusFilter');
    const popularityFilter = document.getElementById('popularityFilter');
    const latestAnime = document.getElementById('latestAnime');
    const animeList = document.getElementById('animeList');
    const prevPage = document.getElementById('prevPage');
    const nextPage = document.getElementById('nextPage');

    let currentPage = 1;

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        fetchAnime(query);
    });

    const fetchAnime = async (query) => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=${currentPage}`);
            const data = await response.json();
            displayAnime(data);
        } catch (error) {
            console.error('Error fetching anime data:', error);
        }
    };

    const displayAnime = (data) => {
        animeList.innerHTML = '';
        data.results.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <h3>${anime.title}</h3>
                <img src="${anime.image_url}" alt="${anime.title}">
                <p>${anime.synopsis}</p>
                <button onclick="streamAnime('${anime.mal_id}')">Watch Now</button>
            `;
            animeList.appendChild(animeItem);
        });
    };

    const streamAnime = async (id) => {
        try {
            const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`);
            const data = await response.json();
            // Display streaming options (mock example)
            alert(`Streaming ${data.title}. Available at ${data.url}`);
        } catch (error) {
            console.error('Error fetching streaming data:', error);
        }
    };

    const fetchLatestAnime = async () => {
        try {
            const response = await fetch('https://api.jikan.moe/v4/top/anime');
            const data = await response.json();
            displayLatestAnime(data);
        } catch (error) {
            console.error('Error fetching latest anime:', error);
        }
    };

    const displayLatestAnime = (data) => {
        latestAnime.innerHTML = '';
        data.top.forEach(anime => {
            const animeThumbnail = document.createElement('img');
            animeThumbnail.src = anime.image_url;
            animeThumbnail.alt = anime.title;
            animeThumbnail.addEventListener('click', () => {
                streamAnime(anime.mal_id);
            });
            latestAnime.appendChild(animeThumbnail);
        });
    };

    prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAnime(searchInput.value);
        }
    });

    nextPage.addEventListener('click', () => {
        currentPage++;
        fetchAnime(searchInput.value);
    });

    fetchLatestAnime();
});
