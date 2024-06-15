const authMenu = document.getElementById('auth-menu');
const closeAuthMenu = document.getElementById('close-auth-menu');

closeAuthMenu.addEventListener('click', closeMenu);

// temp
let isAuth = false;

function auth() {
    isAuth = true;
    window.dispatchEvent(new Event('load'));
}

function openMenu() {
    authMenu.style.transform = 'translateY(-100%)';
}

function closeMenu() {
    authMenu.style.transform = 'translateY(0)';
    if (!isAuth) auth();
}

async function init() {
    return isAuth;
}

export {
    init as initAuth,
    openMenu as openAuthMenu,
    closeMenu as closeAuthMenu
};