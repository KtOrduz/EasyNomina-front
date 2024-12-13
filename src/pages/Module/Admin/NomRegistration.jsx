import { useForm } from "react-hook-form";
import { useEmployeeSelection } from "../../../store/useEmployeeSelection";
import { useNavigate } from "react-router-dom";

const NomRegistration = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { employees, loading, error, handleEmployeeChange } = useEmployeeSelection();
    const navigate = useNavigate();

    
    const handleNavigate = () => {
        navigate("/admin/employee-management");
    };

    // Manejo del envío del formulario
    const onSubmit = async (values) => {
        const formattedData = {
            periodo: {
                inicio: values.periodoInicio,
                fin: values.periodoFin,
            },
            empleado: {
                nombre: values.nombre,
                identificacion: values.identificacion,
            },
            laboral: {
                diasLaborados: parseInt(values.diasLaborados, 10),
                salarioBase: parseFloat(values.salario),
            },
            compensaciones: {
                horasExtras: parseFloat(values.horasExtras),
                otrosBeneficios: parseFloat(values.otrosBeneficios),
            },
            deducciones: {
                salud: parseFloat(values.deduccionSalud),
                pension: parseFloat(values.deduccionPension),
                otras: parseFloat(values.otrasDeducciones),
            },
            total: parseFloat(values.total),
        };

        console.log("Datos enviados:", formattedData);
    };

    // Mostrar spinner mientras se cargan los empleados
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
        <div>
            <h1 className="text-xl font-bold mb-4">Registro de Nómina</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Selección de empleado */}
                <div className="mb-4">
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre del Empleado
                    </label>
                    <select
                        {...register("nombre", { required: true })}
                        id="nombre"
                        className="w-full border rounded p-2"
                        onChange={(event) => handleEmployeeChange(event, setValue)}
                    >
                        <option value="">Seleccione el nombre del empleado</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp.nombre}>
                                {emp.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Campos del formulario */}
                <div className="mb-4">
                    <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
                        Identificación
                    </label>
                    <input
                        type="text"
                        {...register("identificacion", { required: true })}
                        id="identificacion"
                        className="w-full border rounded p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="periodoInicio" className="block text-sm font-medium text-gray-700">
                        Inicio del Periodo
                    </label>
                    <input
                        type="date"
                        {...register("periodoInicio", { required: true })}
                        id="periodoInicio"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="periodoFin" className="block text-sm font-medium text-gray-700">
                        Fin del Periodo
                    </label>
                    <input
                        type="date"
                        {...register("periodoFin", { required: true })}
                        id="periodoFin"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="diasLaborados" className="block text-sm font-medium text-gray-700">
                        Días laborados
                    </label>
                    <input
                        type="number"
                        {...register("diasLaborados", { required: true })}
                        placeholder="Días Laborados"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                        Salario Base
                    </label>
                    <input
                        type="text"
                        {...register("salario", { required: true })}
                        id="salario"
                        className="w-full border rounded p-2"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="horasExtras" className="block text-sm font-medium text-gray-700">
                        Horas Extras
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("horasExtras", { required: true })}
                        placeholder="Horas Extras"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="otrosBeneficios" className="block text-sm font-medium text-gray-700">
                        Otros Beneficios
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("otrosBeneficios", { required: true })}
                        placeholder="Otros Beneficios"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="deduccionSalud" className="block text-sm font-medium text-gray-700">
                        Deducción Salud
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("deduccionSalud", { required: true })}
                        placeholder="Deducción Salud"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="deduccionPension" className="block text-sm font-medium text-gray-700">
                        Deducción Pensión
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("deduccionPension", { required: true })}
                        placeholder="Deducción Pensión"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="otrasDeducciones" className="block text-sm font-medium text-gray-700">
                        Otras Deducciones
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("otrasDeducciones", { required: true })}
                        placeholder="Otras Deducciones"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                        Total
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("total", { required: true })}
                        placeholder="Total"
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Botones de acción */}
                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={handleNavigate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Registrar empleado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NomRegistration;
