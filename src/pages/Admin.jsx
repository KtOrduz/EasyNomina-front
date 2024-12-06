import  { useState } from 'react';
import { Users, Briefcase, Newspaper } from 'lucide-react';
  
  const Admin = () => {
    const [activeSection, setActiveSection] = useState(null);

    const menuItems = [
      {
        id: 'empleados',
        label: 'Empleados',
        icon: Users,
        description: 'Gestión de información y registros de empleados'
      },
      {
        id: 'nominas',
        label: 'Nóminas',
        icon: Briefcase,
        description: 'Administración de pagos y procesos de nómina'
      },
      {
        id: 'novedades',
        label: 'Novedades',
        icon: Newspaper,
        description: 'Horas extras, recargos y ausencias'
      }
    ];

    const handleSectionSelect = (section) => {
      setActiveSection(section.id);
      // Aquí puedes añadir la lógica de navegación o cambio de vista
      console.log(`Sección seleccionada: ${section.label}`);
    };

    return (
      <div className="min-h-screen flex items-center justify-absolute bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
       <div className="flex flex-col w-64 bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-4 text-center font-bold">
          Modulo administrativo
        </div>

        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSectionSelect(item)}
            className={`
            flex items-center p-4 cursor-pointer 
            hover:bg-blue-50 transition-colors duration-200
            ${activeSection === item.id ? 'bg-blue-100 border-r-4 border-blue-600' : ''}
          `}
          >
            <item.icon
              className={`mr-4 
              ${activeSection === item.id ? 'text-blue-600' : 'text-gray-500'}
            `}
              size={24}
            />
            <div>
              <div className={`
              font-semibold 
              ${activeSection === item.id ? 'text-blue-700' : 'text-gray-700'}
            `}>
                {item.label}
              </div>
              <div className="text-xs text-gray-500">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
      
    );
  };

  export {Admin};

