
import { Transaction } from '../types';

const mockDescriptions = [
  "Venta de empanadas",
  "Pago servicio de diseño gráfico",
  "Ingreso por consultoría",
  "Venta de postres caseros",
  "Transferencia de cliente A",
  "Pago por artículo freelance",
  "Venta online camiseta",
];

const getRandomElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateMockTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const randomDaysAgo = Math.floor(Math.random() * 30); // transactions within the last 30 days
    const date = new Date(today);
    date.setDate(today.getDate() - randomDaysAgo);

    const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
    const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');

    transactions.push({
      id: `txn_${Date.now()}_${i}`,
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      time: `${hour}:${minute}`,
      description: getRandomElement(mockDescriptions),
      amount: parseFloat((Math.random() * (200000 - 5000) + 5000).toFixed(2)), // Random amount between 5,000 and 200,000 COP
      currency: 'COP',
      notes: Math.random() > 0.7 ? "Nota de ejemplo para esta transacción." : undefined,
    });
  }
  return transactions;
};
    