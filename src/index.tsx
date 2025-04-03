import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

// Lazy loading de l'App pour améliorer le chargement initial
const App = lazy(() => import("./App"));

// Création d'un Error Boundary pour éviter que l'app crash
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Erreur capturée :", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>🚨 Une erreur est survenue. Veuillez recharger la page.</h1>;
    }
    return this.props.children;
  }
}

// Sélectionne l'élément root
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("L'élément root est introuvable");

// Création du root React 18
const root = ReactDOM.createRoot(rootElement);

// Rendu optimisé
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<h1>Chargement... ⏳</h1>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
