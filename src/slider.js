
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.slider__wrapper');
    const cards = Array.from(slider.querySelectorAll('.slider__card'));
    const prevBtn = slider.querySelector('.slider__arrow-left')?.closest('button');
    const nextBtn = slider.querySelector('.slider__arrow-right')?.closest('button');
    const bullets = Array.from(slider.querySelectorAll('.slider__bullet'));

    if (cards.length === 0) return;

    let currentIndex = 0;
    const total = cards.length;

    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        card.classList.toggle('slider__card_active', index === currentIndex);
    });

    function updateSlider() {
        wrapper.style.setProperty('--current', currentIndex);

        cards.forEach((card, index) => {
            card.classList.toggle('slider__card_active', index === currentIndex);
        });

        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('slider__bullet_active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + total) % total;
        updateSlider();
    }

    function goToSlide(index) {
        if (index < 0 || index >= total) return;
        currentIndex = index;
        updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => goToSlide(index));
        bullet.setAttribute('role', 'button');
        bullet.setAttribute('tabindex', '0');
        bullet.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });

        document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    updateSlider();
});