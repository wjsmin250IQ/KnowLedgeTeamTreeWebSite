document.addEventListener("DOMContentLoaded", async function() {
    const container = document.getElementById("links-container");

    // Récupération des liens depuis l'API
    const response = await fetch("/api/links");
    const links = await response.json();

    links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.url;
        a.className = "link";
        a.innerText = link.name;
        a.target = "_blank";
        container.appendChild(a);
    });
});
