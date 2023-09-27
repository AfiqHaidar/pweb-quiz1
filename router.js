// router.js
document.addEventListener("DOMContentLoaded", function () {
    const contentDiv = document.getElementById("content");

    // Function to load content into the contentDiv
    function loadContent(page, path) {
        fetch(page)
            .then((response) => response.text())
            .then((html) => {
                contentDiv.innerHTML = html;
                window.history.pushState({ path }, '', path); // Update the URL
            })
            .catch((error) => {
                console.error("Error loading page:", error);
            });
    }

    // Function to handle navigation link clicks
    function handleNavigationClick(e) {
        e.preventDefault();
        const path = this.getAttribute("href");
        loadContent(path, path);
    }

    // Attach click event listeners to navigation links
    const navigationLinks = document.querySelectorAll(".a_menudesktop");
    navigationLinks.forEach((link) => {
        link.addEventListener("click", handleNavigationClick);
    });

    // Handle back/forward navigation in the browser
    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.path) {
            loadContent(e.state.path, e.state.path);
        }
    });
});
