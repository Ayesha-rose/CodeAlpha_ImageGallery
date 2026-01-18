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


    imageItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            const imagesInCategory = Array.from(document.querySelectorAll(`.image-item[data-category="${category}"]`));
            const categoryIndex = imagesInCategory.findIndex(img => img === item);
            openLightbox(category, categoryIndex);
        });
    });

    function openLightbox(category, index) {
        const imagesInCategory = Array.from(document.querySelectorAll(`.image-item[data-category="${category}"]`));
        if (imagesInCategory[index]) {
            const imgSrc = imagesInCategory[index].querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
            currentIndex = index;
            currentCategory = category;
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }

    let currentCategory = 'all';

    function showPrevImage() {
        const imagesInCategory = Array.from(document.querySelectorAll(`.image-item[data-category="${currentCategory}"]`));
        currentIndex = (currentIndex - 1 + imagesInCategory.length) % imagesInCategory.length;
        openLightbox(currentCategory, currentIndex);
    }

    function showNextImage() {
        const imagesInCategory = Array.from(document.querySelectorAll(`.image-item[data-category="${currentCategory}"]`));
        currentIndex = (currentIndex + 1) % imagesInCategory.length;
        openLightbox(currentCategory, currentIndex);
    }

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});
