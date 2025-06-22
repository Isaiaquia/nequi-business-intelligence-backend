
import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import TransactionItem from '../components/transactions/TransactionItem';
import TransactionDetailModal from '../components/transactions/TransactionDetailModal';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

interface TransactionsPageProps {
  transactions: Transaction[];
  updateTransactionNote: (transactionId: string, note: string) => void;
}

const TransactionsPage: React.FC<TransactionsPageProps> = ({ transactions, updateTransactionNote }) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleExport = () => {
    // Simulate Excel export process
    console.log("Iniciando exportación a Excel...");
    alert("Simulación: Generando archivo Excel... Revisa la consola.");
    // In a real app, this would trigger a backend process or use a client-side library.
    // For V1.0, this is a basic export.
    const dataToExport = transactions.map(t => ({
        Fecha: t.date,
        Hora: t.time,
        Descripcion: t.description,
        Monto: t.amount,
        Moneda: t.currency,
        Notas: t.notes || ''
    }));
    console.log("Datos para exportar:", dataToExport);
    console.log("Simulación: Archivo Excel generado y listo para descargar.");
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || b.time.localeCompare(a.time)); // Sort by date desc, then time desc
  }, [transactions, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-texto-principal">Transacciones</h1>
        <Button onClick={handleExport} variant="secondary" className="w-full md:w-auto">
          Exportar a Excel (MVP: Simulado)
        </Button>
      </div>
      
      <Input
        type="text"
        placeholder="Buscar por descripción..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {filteredTransactions.length > 0 ? (
        <ul className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onClick={() => handleTransactionClick(transaction)}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-gris-neutro text-lg">No se encontraron transacciones.</p>
          <p className="text-sm text-texto-placeholder">Intenta subir un extracto o ajusta tu búsqueda.</p>
        </div>
      )}

      {selectedTransaction && (
        <TransactionDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          transaction={selectedTransaction}
          onSaveNote={updateTransactionNote}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
    