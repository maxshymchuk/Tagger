const authMenu = document.getElementById('auth-menu');
const closeAuthMenu = document.getElementById('close-auth-menu');

closeAuthMenu.addEventListener('click', closeMenu);

// temp
let isAuth = false;

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

const REDIRECT_URI = 'https://maxshymchuk.github.io';

const AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

document.getElementById('auth_btn').addEventListener('click', () => {
    const authUrl = `${AUTH_URL}?client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=${encodeURIComponent(SCOPE)}&include_granted_scopes=true`;

    console.log(authUrl)

    const width = 500;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    const authWindow = window.open(authUrl, 'GoogleAuth', `width=${width},height=${height},top=${top},left=${left}`);

    window.addEventListener('message', async (event) => {
        if (event.origin !== window.location.origin) {
            return;
        }

        const { code } = event.data;
        if (code) {
            const token = await fetchToken(code);
            console.log('Access Token:', token.access_token);

            const userInfo = await fetchUserInfo(token.access_token);
            console.log('User Info:', userInfo);

            isAuth = true;
            window.dispatchEvent(new Event('load'));
            authWindow.close();
        }
    }, false);
});

async function fetchToken(code) {
    const response = await fetch(TOKEN_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            code: code,
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code'
        })
    });

    return response.json();
}

async function fetchUserInfo(token) {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export {
    init as initAuth,
    openMenu as openAuthMenu,
    closeMenu as closeAuthMenu
};