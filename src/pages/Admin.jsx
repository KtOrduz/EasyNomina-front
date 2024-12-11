import { useState } from "react";
import {
  Users,
  Briefcase,
  Newspaper,
  FilePlus2,
  ClipboardList,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import EmployeeRegistration from "./Module/Admin/EmployeeRegistration.jsx";

const Admin = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [activeSubSection, setActiveSubSection] = useState(null);
  const clearUser = useAuthStore((state) => state.clearUser);

  const menuItems = [
    {
      id: "empleados",
      label: "Empleados",
      icon: Users,
      description: "Gestión de información y registros de empleados",
      subMenu: [
        {
          id: "gestion-informacion",
          label: "Gestión de información",
          icon: ClipboardList,
        },
        {
          id: "registro-empleados",
          label: "Registro de empleados",
          icon: FilePlus2,
          component: <EmployeeRegistration />,
        },
      ],
    },
    {
      id: "nominas",
      label: "Nóminas",
      icon: Briefcase,
      description: "Administración de pagos y procesos de nómina",
    },
    {
      id: "novedades",
      label: "Novedades",
      icon: Newspaper,
      description: "Horas extras, recargos y ausencias",
    },
  ];

  const handleSectionSelect = (section) => {
    setActiveSection(section.id);
    setActiveSubSection(null);
  };

  const handleSubSectionSelect = (subSection) => {
    setActiveSubSection(subSection.id);
  };

  const getActiveComponent = () => {
    if (activeSubSection) {
      const activeMain = menuItems.find((item) => item.id === activeSection);
      const activeSub = activeMain?.subMenu?.find(
        (item) => item.id === activeSubSection
      );
      return activeSub ? activeSub.component : null;
    }
    const activeItem = menuItems.find((item) => item.id === activeSection);
    return activeItem ? activeItem.component : null;
  };

  const handleLogout = () => {
    clearUser();
    window.location.href = "/"; // Redirige al login tras cerrar sesión
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Módulo administrativo */}
      <div className="flex flex-col w-70 bg-white shadow-md overflow-hidden">
        <div className="bg-blue-600 text-white p-4 text-center font-bold">
          Módulo administrativo
        </div>
        {menuItems.map((item) => (
          <div key={item.id}>
            <div
              onClick={() => handleSectionSelect(item)}
              className={`flex items-center p-4 cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${
                activeSection === item.id
                  ? "bg-blue-100 border-r-4 border-blue-600"
                  : ""
              }`}
            >
              <item.icon
                className={`mr-4 ${
                  activeSection === item.id ? "text-blue-600" : "text-gray-500"
                }`}
                size={24}
              />
              <div>
                <div
                  className={`font-semibold ${
                    activeSection === item.id
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </div>
            {/* Submenú dinámico */}
            {item.subMenu && activeSection === item.id && (
              <div className="pl-8">
                {item.subMenu.map((subItem) => (
                  <div
                    key={subItem.id}
                    onClick={() => handleSubSectionSelect(subItem)}
                    className={`flex items-center p-2 cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${
                      activeSubSection === subItem.id
                        ? "bg-blue-100 border-r-4 border-blue-600"
                        : ""
                    }`}
                  >
                    <subItem.icon
                      className={`mr-3 ${
                        activeSubSection === subItem.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                      size={20}
                    />
                    <span
                      className={`text-sm ${
                        activeSubSection === subItem.id
                          ? "text-blue-700"
                          : "text-gray-700"
                      }`}
                    >
                      {subItem.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {/* Botón de cerrar sesión */}
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Contenido dinámico */}
      <div className="flex-grow bg-white shadow-md rounded-lg p-4 ml-4">
        {getActiveComponent() || (
          <div className="text-gray-500 text-center">
            Selecciona una sección del menú para comenzar.
          </div>
        )}
      </div>
    </div>
  );
};

export { Admin };
