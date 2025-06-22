
import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface SettingsPageProps {
  onLogout: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onLogout }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-texto-principal">Menú / Configuración</h1>
      
      <Card>
        <h2 className="text-xl font-semibold text-texto-subtitulo mb-4">Cuenta</h2>
        <Button onClick={onLogout} variant="danger" fullWidth>
          Cerrar Sesión
        </Button>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-texto-subtitulo mb-4">Preferencias (Placeholder)</h2>
        <p className="text-gris-neutro">Modo Oscuro (Próximamente)</p>
        <p className="text-gris-neutro">Notificaciones (Próximamente)</p>
      </Card>
      
      <Card>
        <h2 className="text-xl font-semibold text-texto-subtitulo mb-4">Acerca de (Placeholder)</h2>
        <p className="text-gris-neutro">Versión de la App: 0.1.0 (MVP)</p>
        <p className="text-gris-neutro">Ayuda y Soporte</p>
        <p className="text-gris-neutro">Términos y Condiciones</p>
      </Card>
    </div>
  );
};

export default SettingsPage;
    