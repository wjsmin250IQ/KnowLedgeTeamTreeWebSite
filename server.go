package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

// Fonction pour démarrer le serveur web
func startWebServer(port string) {
    fs := http.FileServer(http.Dir("public")) // Dossier contenant HTML, CSS, JS
    http.Handle("/", fs) // Servir les fichiers statiques

    fmt.Printf("Serveur web démarré sur http://localhost:%s 🚀\n", port)
    
    // Démarrer le serveur en écoutant sur le port spécifié
    err := http.ListenAndServe(":"+port, nil)
    if err != nil {
        log.Fatalf("Erreur de démarrage du serveur web : %v", err) // Meilleure gestion des erreurs
    }
}

// Fonction pour démarrer un processus worker
func startWorker() {
    fmt.Println("Démarrage du processus worker...") // Log pour démarrer le worker
    // Ajouter ici la logique spécifique aux workers (par exemple traitement en arrière-plan)
    // Exemple : traitement de jobs, tâches programmées, etc.
    fmt.Println("Le worker est en fonctionnement...")
}

func main() {
    // Déterminer le port en fonction de l'environnement (Heroku ou local)
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080" // Port par défaut pour le développement local
    }

    // Vérifier les arguments pour savoir si on doit démarrer un processus web ou worker
    if len(os.Args) > 1 && os.Args[1] == "worker" {
        // Démarrer le processus worker
        startWorker()
    } else {
        // Démarrer le serveur web
        startWebServer(port)
    }
}
