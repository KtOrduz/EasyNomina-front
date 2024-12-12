import { useForm } from "react-hook-form";
import { registerEmployeeRequest } from "../../../api/auth";

const EmployeeRegistration = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    // Estructura los datos de acuerdo con el formato solicitado
    const formattedData = {
      nombre: values.nombre,
      documento: values.documento,
      cargo: values.cargo,
      salario_base: parseFloat(values.salario_base),
      fecha_contratacion: values.fecha_contratacion,
      horario: {
        tipo: values.tipo_horario,
        horas_diarias: parseInt(values.horas_diarias, 10),
      },
      contacto: {
        telefono: values.telefono,
        email: values.email,
      },
    };

    const info = await registerEmployeeRequest(formattedData);
    console.log(info);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Registro de Empleados</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Nombre"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("documento", { required: true })}
            placeholder="Documento"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("cargo", { required: true })}
            placeholder="Cargo"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("salario_base", { required: true })}
            placeholder="Salario Base"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="date"
            {...register("fecha_contratacion", { required: true })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("tipo_horario", { required: true })}
            placeholder="Tipo de Horario"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="number"
            {...register("horas_diarias", { required: true })}
            placeholder="Horas Diarias"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="text"
            {...register("telefono", { required: true })}
            placeholder="Teléfono"
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
