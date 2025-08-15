const blogPosts = [
  {
    id: 1,
    title: "The Rise of Smartwear: When Fashion Meets Tech",
    description: "Explore how smart fabrics and wearable tech are revolutionizing style and function.",
    image: "virtual reality tech.webp",
    category: "fashion",
    date: "2025-08-12",
    author: "Wasif Mahmood"
  },
  {
    id: 2,
    title: "Top 10 Performance Sneakers for 2025",
    description: "Best high-performance sneakers for running, training, and daily wear.",
    image: "sports sneaker.jpeg",
    category: "sports",
    date: "2025-08-10",
    author: "Nasir Farid"
  },
  {
    id: 3,
    title: "How AI Is Changing the Game in Professional Sports",
    description: "From player analytics to fan experiences, AI is transforming sports.",
    image: "tech how ai is changing game.jpeg",
    category: "tech",
    date: "2025-08-08",
    author: "Zeeshan Khan"
  },
  {
    id: 4,
    title: "Streetwear Trends Dominating Fall 2025",
    description: "A look at the streetwear essentials taking over the fashion scene.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f.jpg",
    category: "fashion",
    date: "2025-08-06",
    author: "Abdullah Tauseef"
  },
  {
    id: 5,
    title: "Virtual Reality Fitness: Working Out in the Metaverse",
    description: "Discover how VR workouts are transforming fitness at home.",
    image: "virtual reality tech.webp",
    category: "tech",
    date: "2025-08-03",
    author: "Omar Abdullah"
  },
  {
    id: 6,
    title: "The Science Behind Recovery: Sports Tech You Need",
    description: "Latest recovery tools and technologies for faster and smarter training.",
    image: "tech how ai is changing game.jpeg",
    category: "sports",
    date: "2025-07-29",
    author: "Shawal Nasir"
  },
  {
    id: 7,
    title: "Sustainable Fashion Tech: Innovations Redefining the Industry",
    description: "Emerging tech enabling sustainable practices in high fashion.",
    image: "tech.png",
    category: "fashion",
    date: "2025-07-27",
    author: "Obaid Ullah Zahoor"
  },
  {
    id: 8,
    title: "Smart Stadiums: The Future of Live Sports Experiences",
    description: "How tech enhances live games—from AI ticketing to real-time stats.",
    image: "s1.jpeg",
    category: "tech",
    date: "2025-07-24",
    author: "Muhammad Hafeez"
  },
  {
    id: 9,
    title: "Athleisure 3.0: Blurring the Line Between Gym and Street",
    description: "Athleisure looks that combine comfort, performance, and style.",
    image: "f1.jpg",
    category: "fashion",
    date: "2025-07-22",
    author: "Muhammad Ibrahim"
  },
  {
    id: 10,
    title: "Top Fitness Apps of 2025 Reviewed",
    description: "AI coaching, real-time tracking—reviewing the year’s best fitness apps.",
    image: "f1.jpg",
    category: "tech",
    date: "2025-07-20",
    author: "Kashif Mushtaq"
  },
  {
    id: 11,
    title: "From Courtside to Catwalk: Basketball’s Influence on Fashion",
    description: "How basketball’s cultural crossover continues to shape fashion.",
    image: "fashion.jpg",
    category: "fashion",
    date: "2025-07-17",
    author: "Haseeb Anees"
  },
  {
    id: 12,
    title: "Wearables for Athletes: The Best in 2025",
    description: "Smartwatches, smart rings, and gear that pro athletes swear by.",
    image: "sports.webp",
    category: "sports",
    date: "2025-07-14",
    author: "Bilal Shakeel"
  }
];

// Configuration
const POSTS_PER_PAGE = 6;

// State management
let currentPage = 1;
let filteredPosts = [...blogPosts];
let currentCategory = 'all';
let currentSearchTerm = '';

// DOM elements
const postsContainer = document.getElementById('postsContainer');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const noResults = document.getElementById('noResults');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    renderPosts();
    updatePagination();
});

// Event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    categoryFilter.addEventListener('change', handleCategoryFilter);
    prevBtn.addEventListener('click', goToPreviousPage);
    nextBtn.addEventListener('click', goToNextPage);
}

// Search functionality
function handleSearch(event) {
    currentSearchTerm = event.target.value.toLowerCase().trim();
    currentPage = 1;
    filterPosts();
    renderPosts();
    updatePagination();
}

// Category filter functionality
function handleCategoryFilter(event) {
    currentCategory = event.target.value;
    currentPage = 1;
    filterPosts();
    renderPosts();
    updatePagination();
}

// Filter posts based on search term and category
function filterPosts() {
    filteredPosts = blogPosts.filter(post => {
        const matchesSearch = currentSearchTerm === '' || 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.description.toLowerCase().includes(currentSearchTerm);
        
        const matchesCategory = currentCategory === 'all' || 
            post.category === currentCategory;
        
        return matchesSearch && matchesCategory;
    });
}

// Render posts for current page
function renderPosts() {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    if (postsToShow.length === 0) {
        postsContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    postsContainer.style.display = 'grid';
    noResults.style.display = 'none';

    postsContainer.innerHTML = postsToShow.map(post => createPostCard(post)).join('');
    
    // Add animation delay for staggered effect
    const cards = postsContainer.querySelectorAll('.post-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Create individual post card HTML
function createPostCard(post) {
    const formattedDate = formatDate(post.date);
    const fallbackImage = 'https://via.placeholder.com/500x300/e9ecef/6c757d?text=Image+Not+Found';

    return `
        <article class="post-card">
            <img 
                src="${post.image}" 
                alt="${post.title}" 
                class="post-image" 
                loading="lazy" 
                onerror="this.onerror=null;this.src='${fallbackImage}'"
            >
            <div class="post-content">
                <span class="post-category ${post.category}">${post.category}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-description">${post.description}</p>
                <div class="post-meta">
                    <span class="post-date">
                        <i class="fas fa-calendar-alt"></i>
                        ${formattedDate}
                    </span>
                    <span class="post-author">
                        <i class="fas fa-user"></i>
                        ${post.author}
                    </span>
                </div>
            </div>
        </article>
    `;
}


// Format date for display
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Pagination functionality
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
        updatePagination();
        scrollToTop();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        updatePagination();
        scrollToTop();
    }
}

// Update pagination controls
function updatePagination() {
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages || totalPages === 0;
    
    if (totalPages === 0) {
        pageInfo.textContent = 'No pages';
    } else {
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
}

// Scroll to top of posts section
function scrollToTop() {
    postsContainer.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Utility function to show loading state (if needed for future enhancements)
function showLoading() {
    postsContainer.innerHTML = `
        <div class="loading">
            <i class="fas fa-spinner"></i>
            <p>Loading posts...</p>
        </div>
    `;
}

// Error handling for image loading
document.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        event.target.src = 'https://via.placeholder.com/500x300/e9ecef/6c757d?text=Image+Not+Found';
    }
}, true);

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' && !prevBtn.disabled) {
        goToPreviousPage();
    } else if (event.key === 'ArrowRight' && !nextBtn.disabled) {
        goToNextPage();
    }
});

// Search input focus shortcut
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === '/') {
        event.preventDefault();
        searchInput.focus();
    }
});
