/**
 * Utilitário para monitorar e depurar erros 404 (recursos não encontrados)
 */

// Intercepta requisições de recursos para detectar erros 404
export const setupResourceErrorMonitoring = () => {
  if (typeof window !== 'undefined') {
    // Monitorar erros de carregamento de recursos
    window.addEventListener('error', (event) => {
      const target = event.target;
      
      // Verificar se é um erro de carregamento de recursos (imagens, scripts, etc)
      if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        console.error(
          `Erro 404: Recurso não encontrado: ${target.src || target.href}`,
          '\nTipo de elemento:', target.tagName,
          '\nVerifique se o caminho está correto e se o arquivo existe.'
        );
      }
    }, true);
    
    // Monitorar requisições de rede com fetch
    const originalFetch = window.fetch;
    window.fetch = async function(input, init) {
      const response = await originalFetch(input, init);
      
      if (response.status === 404) {
        console.error(
          `Erro 404: API ou recurso não encontrado: ${typeof input === 'string' ? input : input.url}`,
          '\nVerifique se o endpoint da API está correto ou se o recurso solicitado existe.'
        );
      }
      
      return response;
    };
    
    console.log('Monitoramento de recursos 404 inicializado');
  }
};
