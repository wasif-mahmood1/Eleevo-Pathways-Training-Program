// Sample blog post data
const blogPosts = [
    {
        id: 1,
        title: "Building Modern Web Applications with React",
        description: "Learn how to create scalable and maintainable web applications using React and modern development practices.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
        category: "tech",
        date: "2024-01-15",
        author: "John Doe"
    },
    {
        id: 2,
        title: "Exploring the Hidden Gems of Southeast Asia",
        description: "A journey through the most beautiful and lesser-known destinations in Southeast Asia that will take your breath away.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
        category: "travel",
        date: "2024-01-12",
        author: "Jane Smith"
    },
    {
        id: 3,
        title: "The Art of Italian Cooking: Authentic Pasta Recipes",
        description: "Master the traditional techniques of Italian pasta making with these time-tested recipes from Nonna's kitchen.",
        image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop",
        category: "food",
        date: "2024-01-10",
        author: "Marco Rossi"
    },
    {
        id: 4,
        title: "Understanding JavaScript Closures and Scope",
        description: "Deep dive into one of JavaScript's most important concepts that every developer should master.",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=500&h=300&fit=crop",
        category: "tech",
        date: "2024-01-08",
        author: "Sarah Wilson"
    },
    {
        id: 5,
        title: "Backpacking Through the Swiss Alps",
        description: "An adventurous trek through the stunning landscapes of Switzerland with practical tips for fellow hikers.",
        image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1f39?w=500&h=300&fit=crop",
        category: "travel",
        date: "2024-01-05",
        author: "Mike Adventure"
    },
    {
        id: 6,
        title: "Mastering the Perfect Sourdough Bread",
        description: "Learn the secrets of creating artisanal sourdough bread at home with this comprehensive guide.",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&h=300&fit=crop",
        category: "food",
        date: "2024-01-03",
        author: "Emily Baker"
    },
    {
        id: 7,
        title: "Introduction to Machine Learning with Python",
        description: "Get started with machine learning using Python and popular libraries like scikit-learn and pandas.",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop",
        category: "tech",
        date: "2024-01-01",
        author: "Dr. Alex Chen"
    },
    {
        id: 8,
        title: "Solo Travel Safety Tips for Women",
        description: "Essential safety advice and practical tips for women embarking on solo adventures around the world.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=300&fit=crop",
        category: "travel",
        date: "2023-12-28",
        author: "Lisa Wanderer"
    },
    {
        id: 9,
        title: "Farm-to-Table: Growing Your Own Herbs",
        description: "Start your own herb garden and discover how fresh ingredients can transform your cooking.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop",
        category: "food",
        date: "2023-12-25",
        author: "Green Thumb Gary"
    },
    {
        id: 10,
        title: "CSS Grid vs Flexbox: When to Use Which",
        description: "A comprehensive comparison of CSS layout methods to help you choose the right tool for your projects.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
        category: "tech",
        date: "2023-12-22",
        author: "CSS Master"
    },
    {
        id: 11,
        title: "Digital Nomad Life in Bali",
        description: "Everything you need to know about working remotely from the beautiful island of Bali.",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop",
        category: "travel",
        date: "2023-12-20",
        author: "Remote Worker"
    },
    {
        id: 12,
        title: "Healthy Meal Prep for Busy Professionals",
        description: "Time-saving meal preparation strategies that will help you eat well even with a hectic schedule.",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop",
        category: "food",
        date: "2023-12-18",
        author: "Nutrition Pro"
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
    
    return `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy">
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
