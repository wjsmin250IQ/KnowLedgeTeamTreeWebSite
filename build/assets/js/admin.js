document.getElementById("add-link").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const url = document.getElementById("url").value;

    await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url })
    });

    alert("Lien ajouté !");
});
