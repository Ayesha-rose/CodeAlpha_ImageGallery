document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const imageItems = document.querySelectorAll('.image-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let currentIndex = 0;
    const images = Array.from(imageItems);

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
        });
    });

    // Lightbox functionality
    imageItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        if (images[currentIndex]) {
            const imgSrc = images[currentIndex].querySelector('img').src;
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
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox();
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
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
});
