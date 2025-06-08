import { useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";

function App() {
  return (
    <>
      <Header />
      <Body />
      <footer className="footer bg-dark mt-5 py-5">
        <div className="container-fluid"> {/* Cambiado a container-fluid */}
          <p className="footer-text">
            XoXo Gossip Cake - Todos los derechos Reservados ♥
          </p>
        </div>

        <style>{`
          /* Reset margin and padding for body and html */
          html, body {
            margin: 0;
            padding: 10;
            box-sizing: border-box;
            min-height: 100%;
          }
          *, *:before, *:after {
            box-sizing: inherit;
          }

          /* Footer styles */
          .footer {
            background-color: #212529; /* Bootstrap bg-dark color */
            margin: 0;
            padding: 2rem 0; /* Ajustado para que el padding sea uniforme */
            width: 100%;
          }
          .container-fluid { /* Cambiado a container-fluid */
            padding: 0 1rem; /* Padding horizontal para el contenido */
          }
          .footer-text {
            color: white;
            text-align: center;
            font-size: 1.25rem;
            margin-top: 1rem;
            margin-bottom: 0;
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
          }

          /* Responsive adjustments */
          @media (max-width: 10px) {
            .footer-text {
              font-size: 1rem;
              margin-top: 1.5rem;
              padding: 0 0.5rem;
            }
            .footer {
              padding: 2rem 0.5rem;
            }
          }

          @media (max-width: 500px) {
            .footer-text {
              font-size: 0.9rem;
              margin-top: 1rem;
              padding: 0 0.5rem;
            }
            .footer {
              padding: 0.5rem 0.5rem;
            }
          }
        `}</style>
      </footer>
    </>
  );
}

export default App;
