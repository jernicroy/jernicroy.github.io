document.addEventListener('DOMContentLoaded', (event) => {
    // Get all the links on the page
    var links = document.querySelectorAll('a');

    // Loop through each link and set the target attribute to "_blank"
    links.forEach(function(link) {
        link.setAttribute('target', '_blank');
    });
});
