// server/main.go
package main

import (
    "fmt"
    "net/http"
    "os"
)

func startWebServer(port string) {
    fmt.Printf("Serveur démarré sur http://localhost:%s 🚀\n", port)
    err := http.ListenAndServe(":"+port, nil)
    if err != nil {
        fmt.Println("Erreur de démarrage du serveur :", err)
    }
}

func main() {
    // Déterminer le port
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    startWebServer(port)
}
