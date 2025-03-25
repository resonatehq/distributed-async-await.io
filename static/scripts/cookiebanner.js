document.addEventListener('DOMContentLoaded', function() {
    // Function to get the root domain
    function getRootDomain() {
        const hostParts = window.location.hostname.split('.');
        return hostParts.slice(-2).join('.');
    }

    // Check if the consent cookie exists
    if (!document.cookie.split(';').some((item) => item.trim().startsWith('resonatehq_cookie_banner_consent='))) {
        // Create modal element
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 20%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            text-align: center;
            font-family: Arial, sans-serif;
        `;

        // Add content to modal
        modal.innerHTML = `
            <p style="margin-bottom: 20px; color: black;">We use cookies to track user behaviour on our websites. By continuing to use our websites you consent to the use of cookies for this purpose.</p>
            <button id="acceptCookies" style="background-color: black; color: white; border: none; padding: 10px 20px; border-radius: 3px; cursor: pointer;">Accept</button>
        `;

        // Add modal to body
        document.body.appendChild(modal);

        // Add event listener to accept button
        document.getElementById('acceptCookies').addEventListener('click', function() {
            // Set cookie for the root domain
            const rootDomain = getRootDomain();
            document.cookie = `resonatehq_cookie_banner_consent=true; path=/; domain=${rootDomain}; max-age=31536000; SameSite=Lax`;
            // Remove modal
            modal.remove();
        });
    }
});