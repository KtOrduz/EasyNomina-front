import { useForm } from "react-hook-form";
import { registerEmployeeRequest } from "../../../api/auth";
import { useEffect, useState } from "react";

const NewsOthersRegistration = () => {
    const { register, handleSubmit } = useForm();
    const [employee, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employees') // Ajusta la URL según tu configuración
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.error("Error al cargar los empleados:", error));
    }, []); 0

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

        const info = await registerEmployeeRequest(formattedData);
        console.log(info)

    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Registro de horas extras</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="mb-4">
                    <select
                        {...register("nombre", { required: true })}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Seleccione el nombre del empleado</option>
                        {employee.map((employee) => (
                            <option key={employee.id} value={employee.nombre}>
                                {employee.nombre}
                            </option>
                        ))}
                    </select>
                    {/* {errors.nombre && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>
                <div>
                    <input
                        type="text"
                        {...register("documento", { required: true })}
                        placeholder="Documento"
                        className="w-full border rounded p-2"
                    />
                </div>
                {/* Vacaciones */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-2">Vacaciones</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="vacacionesInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="vacacionesInicio"
                                {...register("vacacionesInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="vacacionesFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="vacacionesFin"
                                {...register("vacacionesFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="vacacionesTotal">Total</label>
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
                            <label className="block text-sm font-medium mb-1" htmlFor="incapacidadesInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="incapacidadesInicio"
                                {...register("incapacidadesInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="incapacidadesFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="incapacidadesFin"
                                {...register("incapacidadesFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="incapacidadesTotal">Total</label>
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
                            <label className="block text-sm font-medium mb-1" htmlFor="ausenciasInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="ausenciasInicio"
                                {...register("ausenciasInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="ausenciasFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="ausenciasFin"
                                {...register("ausenciasFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="ausenciasTotal">Total</label>
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
                            <label className="block text-sm font-medium mb-1" htmlFor="permisosInicio">Fecha Inicio</label>
                            <input
                                type="date"
                                id="permisosInicio"
                                {...register("permisosInicio", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="permisosFin">Fecha Fin</label>
                            <input
                                type="date"
                                id="permisosFin"
                                {...register("permisosFin", { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor="permisosTotal">Total</label>
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
