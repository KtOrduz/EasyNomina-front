import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://easynomina-back.onrender.com/api/employees', {
          withCredentials: true
        });
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar empleados:", err);
        setError("Error al cargar la lista de empleados");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Empleados</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Documento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cargo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salario Base
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.documento}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.cargo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${employee.salario_base.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.estado === 'activo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div>{employee.contacto.email}</div>
                    <div className="text-gray-500">{employee.contacto.telefono}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => console.log('Editar', employee._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => console.log('Eliminar', employee._id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;