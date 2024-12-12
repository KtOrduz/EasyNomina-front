import { useForm } from "react-hook-form";
import { registerEmployeeRequest } from "../../../api/auth";
import { useEffect, useState } from "react";

const NewsRegistration = () => {
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
            empleado: {
                nombre: values.nombreEmpleado,
                identificacion: values.identificacion
            },
            horasExtras: {
                H_E_D: parseFloat(values.horasExtrasDiurnas),
                H_E_N: parseFloat(values.horasExtrasNocturnas),
                H_E_D_D_F: parseFloat(values.horasExtrasDiurnasFestivas),
                H_E_N_D_F: parseFloat(values.horasExtrasNocturnasFestivas),
                R_N: parseFloat(values.recargosNocturnos),
                R_D_F: parseFloat(values.recargosDiurnosFestivos),
                R_N_D_F: parseFloat(values.recargosNocturnosFestivos)
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
             {/* Horas Extras */}
            <div className="mb-6">
                <h2 className="text-lg font-bold mb-2">Horas Extras</h2>
                {[
                    { id: "horasExtrasDiurnas", label: "H.E.D" },
                    { id: "horasExtrasNocturnas", label: "H.E.N" },
                    { id: "horasExtrasDiurnasFestivas", label: "H.E.D.F" },
                    { id: "horasExtrasNocturnasFestivas", label: "H.E.N.F" },
                    { id: "recargosNocturnos", label: "R.N" },
                    { id: "recargosDiurnosFestivos", label: "R.D.F" },
                    { id: "recargosNocturnosFestivos", label: "R.N.F" },
                ].map((item) => (
                    <div className="flex gap-4 mt-4" key={item.id}>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor={`${item.id}Cantidad`}>{item.label}<span className="block">Cantidad</span></label>
                            <input
                                type="number"
                                step="1"
                                id={`${item.id}Cantidad`}
                                {...register(`${item.id}Cantidad`, { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1" htmlFor={`${item.id}Valor`}>{item.label}<span className="block">Valor</span></label>
                            <input
                                type="number"
                                step="0.01"
                                id={`${item.id}Valor`}
                                {...register(`${item.id}Valor`, { required: true })}
                                className="w-full border rounded p-2"
                            />
                        </div>
                    </div>
                ))}
                <div className="flex gap-4 mt-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1" htmlFor="totalRecargos">
                            Total de Recargos y H.E.
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="totalRecargos"
                            {...register("totalRecargos", { required: true })}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1" htmlFor="valorTotalRecargos">
                            Valor Total de Recargos y H.E.
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="valorTotalRecargos"
                            {...register("valorTotalRecargos", { required: true })}
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

export default NewsRegistration;
