document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const body = document.body;

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeSwitcher.checked = true;
    }

    themeSwitcher.addEventListener('change', () => {
        if (themeSwitcher.checked) {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        }
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    const imageItems = document.querySelectorAll('.image-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;
    let filteredImages = [];

    function updateFilteredImages() {
        const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
        if (activeFilter === 'all') {
            filteredImages = Array.from(imageItems);
        } else {
            filteredImages = Array.from(imageItems).filter(item => item.dataset.category === activeFilter);
        }
    }

    // Filter images
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            imageItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
            updateFilteredImages();
        });
    });

    // Lightbox functionality
    imageItems.forEach((item) => {
        item.addEventListener('click', () => {
            updateFilteredImages();
            currentIndex = filteredImages.indexOf(item);
            openLightbox();
        });
    });

    function openLightbox() {
        if (filteredImages[currentIndex]) {
            const imgSrc = filteredImages[currentIndex].querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex'; // Make it visible for transition
            // Add 'active' class after a short delay to allow 'display: flex' to apply
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10); // Small delay to ensure display:flex is rendered
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active'); // Start fade-out
        setTimeout(() => {
            lightbox.style.display = 'none'; // Hide after transition
        }, 300); // Match CSS transition duration
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        openLightbox();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        openLightbox();
    }

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    updateFilteredImages();
});
