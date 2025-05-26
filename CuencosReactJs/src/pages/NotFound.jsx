import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Página ou recurso não encontrado:",
      location.pathname,
      "\nEste erro ocorre quando o servidor não consegue encontrar o recurso solicitado.",
      "\nVerifique se a URL está correta e se todos os recursos necessários estão disponíveis."
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Página não encontrada</p>
        <p className="text-gray-500 mb-4">O recurso solicitado não está disponível.</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para a Página Inicial
        </a>
      </div>
    </div>
  );
};

export default NotFound;
