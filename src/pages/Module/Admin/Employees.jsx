import { useState } from 'react';


const Employees = () => {
    const [formData, setFormData] = useState({
        _id: "emp12345",
        nombre: "Juan Pérez",
        documento: "123456789",
        cargo: "Chef",
        salario_base: 1500000,
        beneficios: {
            subsidio_transporte: 140606,
            otros: 50000
        },
        estado: "activo",
        fecha_contratacion: "2022-03-15",
        horario: {
            tipo: "completo",
            horas_diarias: 8
        },
        contacto: {
            telefono: "3214567890",
            email: "juan.perez@ejemplo.com"
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updateNestedState = (obj, path, value) => {
            const [head, ...rest] = path.split('.');
            return {
                ...obj,
                [head]: rest.length
                    ? updateNestedState(obj[head], rest.join('.'), value)
                    : value
            };
        };

        setFormData(prevState =>
            updateNestedState(prevState, name, value)
        );
    };

    const [employees, setEmployees] = useState([]);

    const NewEmployee = () => {
        const newEmployee = { id: employees.length + 1, name: `Empleado ${employees.length + 1}` };
        setEmployees([...employees, newEmployee]);
    };


    const DeleteEmployee = (id) => {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del empleado:", formData);
        // Aquí irá la lógica de envío de datos
    };

    return (
        <div className="min-h-screen flex items-center justify-absolute bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Registro de Empleado
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Sección: Información Personal */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                            Información Personal
                        </h3>

                        {/* Identificación */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Identificación
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                < input
                                    type="text"
                                    name="_id"
                                    value={formData._id}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="ID Empleado"
                                />
                            </div>
                        </div>

                        {/* Nombre */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Nombre Completo
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nombre del empleado"
                                />
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Teléfono
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="tel"
                                    name="contacto.telefono"
                                    value={formData.contacto.telefono}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Número de contacto"
                                />
                            </div>
                        </div>

                        {/* Correo */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Correo Electrónico
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="email"
                                    name="contacto.email"
                                    value={formData.contacto.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección: Información Laboral y Financiera */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                            Información Laboral y Financiera
                        </h3>

                        {/* Fecha de Contratación */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Fecha Contratación
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="date"
                                    name="fecha_contratacion"
                                    value={formData.fecha_contratacion}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Salario Base */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Salario Base
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <input
                                    type="number"
                                    name="salario_base"
                                    value={formData.salario_base}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Salario base"
                                />
                            </div>
                        </div>

                        {/* Tipo de contrato */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Tipo de contrato
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <select
                                    name="TipoContrato"
                                    value={formData.TipoContrato}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Fijo">Fijo</option>
                                    <option value="Indefinido">Indefinido</option>
                                    <option value="PrestacionServicios">Prestacíon de servicios</option>
                                </select>
                            </div>
                        </div>


                        {/* Estado */}
                        <div className="flex items-center space-x-4">
                            <label className="w-1/4 text-gray-700 font-semibold">
                                Estado
                            </label>
                            <div className="flex items-center">
                                <div className="absolute left-3 text-gray-500" size={20} />
                                <select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={NewEmployee}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Nuevo
                        </button>
                        <button
                            type="button"
                            onClick={DeleteEmployee}
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );


};

export default Employees;