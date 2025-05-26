// Função para unir classes de forma condicional (usado no componente pagination)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
