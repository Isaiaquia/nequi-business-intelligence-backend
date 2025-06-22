
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import HomeIcon from '../icons/HomeIcon';
import ListBulletIcon from '../icons/ListBulletIcon';
import CogIcon from '../icons/CogIcon';
import { IconVariant } from '../../types';


const BottomNav: React.FC = () => {
  const navItems = [
    { path: ROUTES.DASHBOARD, label: 'Home', icon: HomeIcon },
    { path: ROUTES.TRANSACTIONS, label: 'Transacciones', icon: ListBulletIcon },
    { path: ROUTES.SETTINGS, label: 'Menú', icon: CogIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[-2px_0px_10px_rgba(0,0,0,0.1)] border-t border-gray-200">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full transition-colors ${
                  isActive ? 'text-azul-principal' : 'text-gris-neutro hover:text-azul-principal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon variant={isActive ? IconVariant.SOLID : IconVariant.OUTLINE} className="w-6 h-6 mb-0.5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
    