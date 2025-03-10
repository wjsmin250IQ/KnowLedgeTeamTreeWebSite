// server.go
package main

import (
    "fmt"
    "net/http"
)

func main() {
    fs := http.FileServer(http.Dir("public")) // Dossier contenant HTML, CSS, JS
    http.Handle("/", fs) // Servir les fichiers statiques

    fmt.Println("Serveur démarré sur http://localhost:8080 🚀")
    http.ListenAndServe(":8080", nil)
}
