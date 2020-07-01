const menuContainer = document.querySelector('.menu-container');
const burger = document.querySelector('.burger');
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');

menuContainer.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    header.classList.toggle('active');
});