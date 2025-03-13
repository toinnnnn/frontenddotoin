document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/game")
        .then(response => response.json())
        .then(data => {
            document.querySelector(".elden h1").innerText = data.title;
            document.querySelector(".elden h4").innerText = data.developer;
            document.querySelector(".elden h3").innerText = data.description;
        })
        .catch(error => console.error("Erro ao carregar API:", error));
});
fetch("http://localhost:3000/api/trailer")
    .then(response => response.json())
    .then(data => {
        document.querySelector(".ctaa").href = data.trailer_url;
    });

fetch("http://localhost:3000/api/preorder")
    .then(response => response.json())
    .then(data => {
        document.querySelector(".navlist a[href*='store.steampowered']").href = data.preorder_url;
    });
