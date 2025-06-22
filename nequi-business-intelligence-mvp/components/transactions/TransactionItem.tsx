
import React from 'react';
import { Transaction } from '../../types';
import DocumentTextIcon from '../icons/DocumentTextIcon'; // Example icon

interface TransactionItemProps {
  transaction: Transaction;
  onClick: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: transaction.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(transaction.amount);

  const transactionDate = new Date(transaction.date);
  // Format date as "Apr 32" (Example: "Dec 25")
  const formattedDate = transactionDate.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' }).replace('.', '');


  return (
    <li
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 mb-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 p-2 bg-azul-claro rounded-full">
            <DocumentTextIcon className="w-5 h-5 text-azul-principal" />
          </div>
          <div>
            <p className="text-base font-medium text-texto-principal">{transaction.description}</p>
            <p className="text-sm text-gris-neutro">
              {formattedDate} - {transaction.time}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-semibold ${transaction.amount >= 0 ? 'text-verde-exito' : 'text-rojo-error'}`}>
            {formattedAmount}
          </p>
          {transaction.notes && <p className="text-xs text-texto-placeholder mt-0.5">Tiene nota</p>}
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
    