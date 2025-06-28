const forIm = document.querySelector('.for-im');
forIm.addEventListener('mousemove', (e) => {
    const rect = forIm.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    forIm.style.setProperty('--x', `${x}px`);
    forIm.style.setProperty('--y', `${y}px`);
});

const imTrigger = document.querySelectorAll('.im-trigger');
const modalBox = document.getElementById('modal-box');
const modalIm = document.getElementById('modal-im');
const closeIcon = document.querySelector('.close-icon');
const Blur = document.querySelector('.blur');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currrentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function openModal(index) {
    currrentImageIndex = index;
    modalIm.src = imTrigger[index].getAttribute('data-large-src');
    modalBox.style.display = 'flex';
    Blur.style.display = 'flex';
}

imTrigger.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
        openModal(index);
    });
});

prevBtn.addEventListener('click', () => {
    currrentImageIndex = (currrentImageIndex - 1) % imTrigger.length;
    modalIm.src = imTrigger[currrentImageIndex].getAttribute('data-large-src');
});

nextBtn.addEventListener('click', () => {
    currrentImageIndex = (currrentImageIndex + 1) % imTrigger.length;
    modalIm.src = imTrigger[currrentImageIndex].getAttribute('data-large-src');
});

document.addEventListener('keydown', (e) => {
    if (modalBox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    }
});

closeIcon.addEventListener('click', () => {
    modalBox.style.display = 'none';
    Blur.style.display = 'none';
});

modalBox.addEventListener('click', (e) => {
    if (e.target === modalBox) {
        modalBox.style.display = 'none';
        Blur.style.display = 'none';
    }
});

modalBox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

modalBox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        currrentImageIndex = (currrentImageIndex + 1) % imTrigger.length;
        modalIm.src = imTrigger[currrentImageIndex].getAttribute('data-large-src');
    }
    else if (touchEndX > touchStartX + 50) {
        currrentImageIndex = (currrentImageIndex - 1 + imTrigger.length) % imTrigger.length;
        modalIm.src = imTrigger[currrentImageIndex].getAttribute('data-large-src');
    }
}


const projectImg = document.querySelectorAll('.project-img');

projectImg.forEach((container) => {
    const workImg = container.querySelector('img');

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = (y / rect.height - 0.5) * 20;
        const ry = (x / rect.width - 0.5) * 20;
        workImg.style.setProperty('--rx', `${rx}deg`);
        workImg.style.setProperty('--ry', `${ry}deg`);
    });

    container.addEventListener('mouseleave', () => {
        workImg.style.setProperty('--rx', '0deg');
        workImg.style.setProperty('--ry', '0deg');
    });
});

const elements = document.querySelectorAll('.slide-in, .zoom-in, .slide-left, .slide-up');

window.addEventListener('scroll', () => {
    elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            element.classList.add('show');
        }
    });
});