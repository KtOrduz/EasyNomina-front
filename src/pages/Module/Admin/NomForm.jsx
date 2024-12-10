import { useState } from "react";



const NomForm = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        empleado_id: "",
        periodo_inicio: "",
        periodo_fin: "",
        dias_laborados: "",
        salario_base: "",
        horas_extras:
        {
            cantidad: "",
            total_pago: ""
        },
        deducciones:
        {
            Salud: "",
            Pension: "",
            otros: ""
        },
        beneficios:
        {
            subsidio_transporte: "",
            otros: ""
        },
        total_pago: "",
    });

    // configuracion de fecha
    const getMonthLimits = () => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
            .toISOString()
            .split("T")[0];
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            .toISOString()
            .split("T")[0];
        return { firstDay, lastDay };
    };

    const { firstDay, lastDay } = getMonthLimits();

    const [employees] = useState([]);

    const [nom, setNom] = useState([]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes(".")) {
            // Actualizar campos anidados
            const [section, key] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [section]: { ...prev[section], [key]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const SaveNom = () => {
        const newNom = { id: nom.length + 1, name: `Empleado ${nom.length + 1}` };
        setNom([...nom, newNom]);
    };

    


    const handleSubmit = (e) => {
        e.preventDefault();
        SaveNom(formData);
        alert("Nómina guardada exitosamente");
        setFormData({
            nombre: "",
            empleado_id: "",
            periodo_inicio: "",
            periodo_fin: "",
            dias_laborados: "",
            salario_base: "",
            horas_extras:
            {
                cantidad: "",
                total_pago: ""
            },
            deducciones:
            {
                Salud: "",
                Pension: "",
                otros: ""
            },
            beneficios:
            {
                subsidio_transporte: "",
                otros: ""
            },
            total_pago: "",
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Registro de Nómina
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selección de Empleado */}
                <div className="flex items-center space-x-4">
                    <label className="w-1/4 text-gray-700 font-semibold">Nombre</label>
                    <select
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="w-3/4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                       <option value="">Seleccione un empleado</option>
                        {employees.map((empleado) => (
                            <option
                                key={empleado.empleado_id}
                                value={empleado.nombre}
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        empleado_id: empleado.empleado_id,
                                        salario_base: empleado.salario_base,
                                    }))
                                }
                            >
                                {empleado.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fechas del Periodo */}
                <div className="flex items-center space-x-4">
                    <label className="w-1/4 text-gray-700 font-semibold">
                        Periodo Inicio
                    </label>
                    <input
                        type="date"
                        name="periodo_inicio"
                        value={formData.periodo_inicio}
                        onChange={handleChange}
                        min={firstDay}
                        max={lastDay}
                        className="w-3/4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <label className="w-1/4 text-gray-700 font-semibold">Periodo Fin</label>
                    <input
                        type="date"
                        name="periodo_fin"
                        value={formData.periodo_fin}
                        onChange={handleChange}
                        min={firstDay}
                        max={lastDay}
                        className="w-3/4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Días Laborados */}
                <div className="flex items-center space-x-4">
                    <label className="w-1/4 text-gray-700 font-semibold">
                        Días Laborados
                    </label>
                    <input
                        type="number"
                        name="dias_laborados"
                        value={formData.dias_laborados}
                        onChange={handleChange}
                        className="w-3/4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese los días laborados"
                    />
                </div>

                {/* Salario Base */}
                <div className="flex items-center space-x-4">
                    <label className="w-1/4 text-gray-700 font-semibold">
                        Salario Base
                    </label>
                    <input
                        type="number"
                        name="salario_base"
                        value={formData.salario_base}
                        onChange={handleChange}
                        className="w-3/4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Guardar Nómina
                    </button>
                </div>
            </form>
        </div>
    );
};

export default {NomForm};
