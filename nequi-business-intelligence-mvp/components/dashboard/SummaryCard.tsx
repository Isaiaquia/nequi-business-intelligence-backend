
import React from 'react';
import Card from '../common/Card';
import ArrowUpIcon from '../icons/ArrowUpIcon'; // Placeholder, actual change indicator logic needed

interface SummaryCardProps {
  title: string;
  amount: number;
  currency?: string;
  // percentageChange?: number; // For future trend indicator
  bgColorClass?: string; // e.g. 'bg-azul-claro'
  textColorClass?: string; // e.g. 'text-azul-principal'
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  amount,
  currency = 'COP',
  // percentageChange,
  bgColorClass = 'bg-white',
  textColorClass = 'text-azul-principal',
}) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <Card className={`shadow-lg ${bgColorClass}`}>
      <div className="flex flex-col">
        <h3 className="text-base font-medium text-gris-neutro mb-1">{title}</h3>
        <p className={`text-[32px] font-bold ${textColorClass} leading-tight`}>{formattedAmount}</p>
        {/* Placeholder for percentage change - requires previous data */}
        {/* {percentageChange !== undefined && (
          <div className={`mt-2 flex items-center text-sm ${percentageChange >= 0 ? 'text-verde-exito' : 'text-rojo-error'}`}>
            <ArrowUpIcon className={`w-4 h-4 mr-1 ${percentageChange < 0 ? 'transform rotate-180' : ''}`} />
            <span>{Math.abs(percentageChange)}%</span>
          </div>
        )} */}
      </div>
    </Card>
  );
};

export default SummaryCard;
    