import { useForm } from "react-hook-form";
import { useEmployeeSelection } from "../../../store/useEmployeeSelection";

const NewsOthersRegistration = () => {
    const { register, handleSubmit, setValue } = useForm();
    const { employees, loading, error, handleEmployeeChange } = useEmployeeSelection();


    const onSubmit = async (values) => {
        // Estructura los datos de acuerdo con el formato solicitado
        const formattedData = {
            empleado: {
                nombre: values.nombreEmpleado,
                identificacion: values.identificacion
            },
            vacaciones: {
                F_I: values.vacacionesInicio,
                F_F: values.vacacionesFin,
                Total: parseFloat(values.vacacionesTotal)
            },
            incapacidades: {
                F_I: values.incapacidadesInicio,
                F_F: values.incapacidadesFin,
                Total: parseFloat(values.incapacidadesTotal)
            },
            ausencias: {
                F_I: values.ausenciasInicio,
                F_F: values.ausenciasFin,
                Total: parseFloat(values.ausenciasTotal)
            },
            permisos: {
                F_I: values.permisosInicio,
                F_F: values.permisosFin,
                Total: parseFloat(values.permisosTotal)
            }

        };

        console.log("Datos enviados:", formattedData);

    };

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
            <h1 className="text-xl font-bold mb-4">Registro de otras novedades</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                {/* Vacaciones */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Vacaciones</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="vacacionesInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="vacacionesInicio"
                                {...register("vacacionesInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="vacacionesFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="vacacionesFin"
                                {...register("vacacionesFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="vacacionesTotal">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                id="vacacionesTotal"
                                {...register("vacacionesTotal", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Incapacidades */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Incapacidades</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="incapacidadesInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="incapacidadesInicio"
                                {...register("incapacidadesInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="incapacidadesFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="incapacidadesFin"
                                {...register("incapacidadesFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="incapacidadesTotal">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                id="incapacidadesTotal"
                                {...register("incapacidadesTotal", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Ausencias */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Ausencias</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="ausenciasInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="ausenciasInicio"
                                {...register("ausenciasInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="ausenciasFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="ausenciasFin"
                                {...register("ausenciasFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="ausenciasTotal">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                id="ausenciasTotal"
                                {...register("ausenciasTotal", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                </div>

                {/* Permisos */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Permisos</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="permisosInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="permisosInicio"
                                {...register("permisosInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="permisosFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="permisosFin"
                                {...register("permisosFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700" htmlFor="permisosTotal">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                id="permisosTotal"
                                {...register("permisosTotal", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                </div>




                {/* Botón de Guardar */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>

    );


};

export default NewsOthersRegistration;
