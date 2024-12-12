import { useForm } from "react-hook-form";
import { registerEmployeeRequest } from "../../../api/auth";
import  { useEffect, useState } from "react";


const NomRegistration = () => {
    const { register, handleSubmit } = useForm();
    const [employee, setEmployees] = useState([]);

    useEffect(() => {
        fetch('/api/employees') // Ajusta la URL según tu configuración
            .then((response) => response.json())
            .then((data) => setEmployees(data))
            .catch((error) => console.error("Error al cargar los empleados:", error));
    }, []);

    const onSubmit = async (values) => {
        // Estructura los datos de acuerdo con el formato solicitado
        const formattedData = {
            
            periodo: {
                inicio: values.periodoInicio,
                fin: values.periodoFin
            },
            empleado: {
                nombre: values.nombreEmpleado,
                identificacion: values.identificacion
            },
            laboral: {
                diasLaborados: parseInt(values.diasLaborados, 10),
                salarioBase: parseFloat(values.salario)
            },
            compensaciones: {
                horasExtras: parseFloat(values.horasExtras),
                otrosBeneficios: parseFloat(values.otrosBeneficios)
            },
            deducciones: {
                salud: parseFloat(values.deduccionSalud),
                pension: parseFloat(values.deduccionPension),
                otras: parseFloat(values.otrasDeducciones)
            },
            total: parseFloat(values.total)
        };

        const info = await registerEmployeeRequest(formattedData);
        console.log(info);
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Registro de Nomina</h1>
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
                        type="date"
                        {...register("periodoInicio", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        {...register("periodoFin", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        {...register("identificacion", { required: true })}
                        placeholder="Documento"
                        className="w-full border rounded p-2"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        {...register("diasLaborados", { required: true })}
                        placeholder="Días Laborados"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.diasLaborados && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("salario", { required: true })}
                        placeholder="Salario Base"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.salario && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>
                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("horasExtras", { required: true })}
                        placeholder="Horas Extras"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.horasExtras && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("otrosBeneficios", { required: true })}
                        placeholder="Otros Beneficios"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.otrosBeneficios && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("deduccionSalud", { required: true })}
                        placeholder="Deducción Salud"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.deduccionSalud && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("deduccionPension", { required: true })}
                        placeholder="Deducción Pensión"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.deduccionPension && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("otrasDeducciones", { required: true })}
                        placeholder="Otras Deducciones"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.otrasDeducciones && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        step="0.01"
                        {...register("total", { required: true })}
                        placeholder="Total"
                        className="w-full border rounded p-2"
                    />
                    {/* {errors.total && <span className="text-red-500">Este campo es obligatorio</span>} */}
                </div>
                <div className="flex justify-between mt-4">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Guardar
                </button>
               
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => console.log("Agregar empleado")}
                    >
                        Agregar Empleado
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NomRegistration;

