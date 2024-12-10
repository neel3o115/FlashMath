document.addEventListener('DOMContentLoaded', () => {
    const welcomePopup = document.getElementById('welcome-popup');
    const mainContent = document.getElementById('main-content');

    document.addEventListener('click', () => {
        welcomePopup.style.display = 'none';
        mainContent.style.filter = 'none';
        document.body.style.overflow = 'auto'; 
    });
});