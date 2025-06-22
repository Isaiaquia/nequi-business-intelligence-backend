
import React from 'react';
import Button from '../components/common/Button';
import { APP_NAME, COLORS } from '../constants';
import PlusIcon from '../components/icons/PlusIcon'; // Example icon

interface OnboardingPageProps {
  onLogin: () => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-azul-principal to-blue-700 p-6 text-white font-inter">
      <div className="text-center max-w-md">
        <div className="mb-8">
          {/* Placeholder for a logo or illustration */}
          <div className="bg-white/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.517L21.75 6M2.25 6l4.5 4.5M2.25 6H5.25m5.002 0h2.998M12 2.25a8.964 8.964 0 00-6.717 3.083m6.717-3.083a8.964 8.964 0 016.717 3.083m0 0L21.75 6M12 2.25v3.821M12 18H2.25m9.75 0h9.75M12 18v3.75M4.5 12H2.25m2.25 0H12m0 0h7.5m-7.5 0V6m0 6v6m6-6H12m6 0h2.25" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">{APP_NAME}</h1>
          <p className="text-lg text-white/80">
            Transforma tus extractos de Nequi en inteligencia de negocios.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full">
            <h2 className="text-2xl font-semibold text-texto-principal mb-6">Bienvenido</h2>
            <p className="text-gris-neutro mb-6">
                Accede para organizar tus finanzas y tomar mejores decisiones.
            </p>
            <Button onClick={onLogin} variant="primary" fullWidth className="bg-azul-principal hover:bg-blue-700">
                Comenzar
            </Button>
             <p className="text-xs text-texto-placeholder mt-6">
                Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
            </p>
        </div>

        <p className="mt-12 text-sm text-white/60">
          Diseñado para pequeños comerciantes y emprendedores en Colombia.
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
    