let lastScrollY = window.scrollY; 

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
    header.classList.add('hidden');
    } else {
    header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY; 
})