
import React, { useState, useEffect, useCallback } from 'react';
import { Transaction } from '../../types';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Spinner from '../common/Spinner';
import { suggestNoteForTransaction } from '../../services/geminiService';

interface TransactionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onSaveNote: (transactionId: string, note: string) => void;
}

const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onSaveNote,
}) => {
  const [note, setNote] = useState<string>('');
  const [isSuggestingNote, setIsSuggestingNote] = useState<boolean>(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  useEffect(() => {
    if (transaction) {
      setNote(transaction.notes || '');
      setSuggestionError(null);
    }
  }, [transaction]);

  const handleSave = () => {
    if (transaction) {
      onSaveNote(transaction.id, note);
      onClose();
    }
  };

  const handleSuggestNote = useCallback(async () => {
    if (!transaction || !transaction.description) return;

    setIsSuggestingNote(true);
    setSuggestionError(null);
    try {
      const suggestedNote = await suggestNoteForTransaction(transaction.description);
      setNote(prevNote => prevNote ? `${prevNote}\n\nSugerencia IA: ${suggestedNote}` : `Sugerencia IA: ${suggestedNote}`);
    } catch (error) {
      console.error("Error suggesting note:", error);
      setSuggestionError("No se pudo obtener la sugerencia. Intenta de nuevo.");
    } finally {
      setIsSuggestingNote(false);
    }
  }, [transaction]);

  if (!transaction) return null;

  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: transaction.currency,
  }).format(transaction.amount);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de Transacción">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gris-neutro">Descripción</p>
          <p className="text-lg font-semibold text-texto-principal">{transaction.description}</p>
        </div>
        <div>
          <p className="text-sm text-gris-neutro">Monto</p>
          <p className={`text-lg font-semibold ${transaction.amount >= 0 ? 'text-verde-exito' : 'text-rojo-error'}`}>
            {formattedAmount}
          </p>
        </div>
        <div>
          <p className="text-sm text-gris-neutro">Fecha y Hora</p>
          <p className="text-texto-principal">{new Date(transaction.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })} - {transaction.time}</p>
        </div>
        <div>
          <label htmlFor="transactionNote" className="block text-sm font-medium text-gris-neutro mb-1">
            Notas
          </label>
          <textarea
            id="transactionNote"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-azul-principal focus:border-azul-principal outline-none text-base text-gris-neutro"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Añade tus notas aquí..."
          />
        </div>
        {suggestionError && <p className="text-sm text-rojo-error">{suggestionError}</p>}
        <Button onClick={handleSuggestNote} variant="secondary" disabled={isSuggestingNote} className="w-full mt-2">
          {isSuggestingNote ? <Spinner size="sm" /> : 'Sugerir Nota con IA'}
        </Button>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Guardar Nota
        </Button>
      </div>
    </Modal>
  );
};

export default TransactionDetailModal;
    