import React, { useState, useCallback, useRef } from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
import Button from '../components/common/Button';
import PlusIcon from '../components/icons/PlusIcon';
import { Transaction, StatementSummary } from '../types';
import { generateMockTransactions } from '../utils/mockData'; // For simulating PDF processing
import Spinner from '../components/common/Spinner';
import Card from '../components/common/Card'; // Added import for Card

interface DashboardPageProps {
  summary: StatementSummary;
  addTransactions: (newTransactions: Transaction[]) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ summary, addTransactions }) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
        setUploadStatus("Error: Solo se permiten archivos PDF.");
        return;
    }

    setIsProcessing(true);
    setUploadStatus("Procesando extracto...");

    // Simulate PDF parsing and data extraction
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay & processing

    try {
        // In a real app, this would involve sending the file to a backend for parsing.
        // Here, we just generate mock transactions.
        const newTransactions = generateMockTransactions(Math.floor(Math.random() * 5) + 3); // Add 3-7 new transactions
        addTransactions(newTransactions);
        setUploadStatus(`Éxito: ${newTransactions.length} transacciones importadas.`);
    } catch (error) {
        console.error("Error processing file:", error);
        setUploadStatus("Error al procesar el extracto. Intente de nuevo.");
    }


    setIsProcessing(false);
    // Reset file input to allow uploading the same file again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
    setTimeout(() => setUploadStatus(null), 5000); // Clear status message after 5 seconds

  }, [addTransactions]);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-texto-principal">Dashboard</h1>
        {/* Placeholder for user avatar or name */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Ingresos Hoy" amount={summary.incomeToday} textColorClass="text-azul-principal" />
        <SummaryCard title="Esta Semana" amount={summary.incomeThisWeek} textColorClass="text-verde-exito" />
        <SummaryCard title="Este Mes" amount={summary.incomeThisMonth} textColorClass="text-naranja-alerta" />
      </div>

      <div className="mt-8 text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".pdf"
          className="hidden"
          disabled={isProcessing}
        />
        <Button 
            onClick={triggerFileUpload} 
            variant="primary" 
            className="w-full md:w-auto px-8 py-4 text-lg"
            disabled={isProcessing}
        >
          {isProcessing ? (
            <Spinner size="sm" color="text-white" />
          ) : (
            <div className="flex items-center justify-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Subir Extracto Nequi
            </div>
          )}
        </Button>
        {uploadStatus && (
          <p className={`mt-4 text-sm ${uploadStatus.includes('Error') ? 'text-rojo-error' : 'text-verde-exito'}`}>
            {uploadStatus}
          </p>
        )}
         <p className="mt-2 text-xs text-gris-neutro">
          Sube tu extracto PDF de Nequi para actualizar tus ingresos.
        </p>
      </div>

      {/* Placeholder for recent activity or quick links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-texto-subtitulo mb-3">Actividad Reciente (Placeholder)</h2>
        <Card className="p-6">
          <p className="text-gris-neutro">Aquí se mostrará un resumen de las últimas transacciones o notificaciones importantes.</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;