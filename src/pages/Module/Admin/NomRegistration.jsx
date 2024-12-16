import { useForm, useFieldArray } from "react-hook-form";
import { useEmployeeSelection } from "../../../store/useEmployeeSelection";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NomRegistration = () => {
    const { register, handleSubmit, setValue, reset, control } = useForm();
    const { employees, loading, error, handleEmployeeChange } = useEmployeeSelection(); // Hook personalizado
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const { fields: deductionsFields, append: appendDeduction, remove: removeDeduction } = useFieldArray({
        control,
        name: "deducciones",
    });

    const { fields: benefitsFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: "beneficios",
    });

    const handleNavigate = () => {
        navigate("/admin/employee-registration");
    };

    const onSubmit = async (values) => {
        setIsLoading(true);
        setSubmitError("");

        try {
            const formattedData = {
                empleado_id: values.empleado_id,
                periodo_inicio: values.periodoInicio,
                periodo_fin: values.periodoFin,
                salario_base: parseFloat(values.salarioBase),
                horas_extras: [
                    {
                        tipo: values.tipoHoraExtra,
                        cantidad: parseFloat(values.cantidadHoraExtra),
                        total_pago: parseFloat(values.totalPagoHoraExtra),
                    },
                ],
                deducciones: values.deducciones.map((d) => ({
                    motivo: d.motivo,
                    monto: parseFloat(d.monto),
                })),
                beneficios: values.beneficios.map((b) => ({
                    motivo: b.motivo,
                    monto: parseFloat(b.monto),
                })),
                total_pago: parseFloat(values.totalPago),
            };

            const response = await axios.post(
                "https://easynomina-back.onrender.com/api/payroll",
                formattedData,
                { withCredentials: true }
            );

            alert("Nómina registrada exitosamente");
            reset();
        } catch (error) {
            console.error("Error al guardar la nómina:", error);
            setSubmitError("Error al registrar la nómina. Intente nuevamente.");
        } finally {
            setIsLoading(false);
        }
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
            <div className="text-center text-red-600 p-4">{error}</div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Registro de Nómina</h1>

            {submitError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Selección de empleado */}
                <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                        Nombre del Empleado *
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

                {/* Identificación */}
                <div>
                    <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700">
                        Identificación *
                    </label>
                    <input
                        type="text"
                        {...register("identificacion", { required: true })}
                        id="identificacion"
                        className="w-full border rounded p-2"
                        readOnly
                    />
                </div>

                {/* Periodo */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="periodoInicio" className="block text-sm font-medium text-gray-700">
                            Inicio del Periodo *
                        </label>
                        <input
                            type="date"
                            {...register("periodoInicio", { required: true })}
                            id="periodoInicio"
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="periodoFin" className="block text-sm font-medium text-gray-700">
                            Fin del Periodo *
                        </label>
                        <input
                            type="date"
                            {...register("periodoFin", { required: true })}
                            id="periodoFin"
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>

                {/* Días Laborados */}
                <div>
                    <label htmlFor="diasLaborados" className="block text-sm font-medium text-gray-700">
                        Días Laborados *
                    </label>
                    <input
                        type="number"
                        {...register("diasLaborados", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Salario Base */}
                <div>
                    <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                        Salario Base *
                    </label>
                    <input
                        type="text"
                        {...register("salario", { required: true })}
                        id="salario"
                        className="w-full border rounded p-2"
                        readOnly
                    />
                </div>

                {/* Deducciones */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Deducciones</h2>
                    {deductionsFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-2 gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="Motivo"
                                {...register(`deducciones.${index}.motivo`, { required: true })}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Monto"
                                {...register(`deducciones.${index}.monto`, { required: true })}
                                className="w-full border rounded p-2"
                                step="0.01"
                            />
                            <button
                                type="button"
                                onClick={() => removeDeduction(index)}
                                className="text-red-500 hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendDeduction({ motivo: "", monto: 0 })}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Agregar Deducción
                    </button>
                </div>

                {/* Beneficios */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Beneficios</h2>
                    {benefitsFields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-2 gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="Motivo"
                                {...register(`beneficios.${index}.motivo`, { required: true })}
                                className="w-full border rounded p-2"
                            />
                            <input
                                type="number"
                                placeholder="Monto"
                                {...register(`beneficios.${index}.monto`, { required: true })}
                                className="w-full border rounded p-2"
                                step="0.01"
                            />
                            <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="text-red-500 hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => appendBenefit({ motivo: "", monto: 0 })}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Agregar Beneficio
                    </button>
                </div>

                {/* Total */}
                <div>
                    <label htmlFor="total" className="block text-sm font-medium text-gray-700">
                        Total *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("total", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>

                {/* Botones */}
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        type="button"
                        onClick={handleNavigate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Registrar Empleado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NomRegistration;
