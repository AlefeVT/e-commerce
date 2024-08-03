export const translateStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    pending: 'Pendente',
    approved: 'Aprovado',
    denied: 'Negado',
    returned: 'Devolvido',
    completed: 'Concluído',
  };
  return statusMap[status] || status;
};
