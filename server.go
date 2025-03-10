package main

import (
    "fmt"
    "net/http"
    "os"
)

func main() {
    fs := http.FileServer(http.Dir("public")) // Dossier contenant HTML, CSS, JS
    http.Handle("/", fs) // Servir les fichiers statiques

    // Récupérer le port depuis la variable d'environnement ou utiliser le port par défaut (8080)
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080" // Port par défaut pour le développement local
    }

    fmt.Printf("Serveur démarré sur http://localhost:%s 🚀\n", port)
    err := http.ListenAndServe(":"+port, nil)
    if err != nil {
        fmt.Println("Erreur de démarrage du serveur :", err)
    }
}
