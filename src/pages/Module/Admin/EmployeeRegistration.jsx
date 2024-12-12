import { useForm } from "react-hook-form";
import { registerEmployeeRequest } from "../../../api/auth";
import { useState } from "react";

const EmployeeRegistration = () => {
  const { register, handleSubmit, reset } = useForm();
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values) => {
    setIsLoading(true);
    setSubmitError("");

    try {
      // Asegurarse de que los valores numéricos sean números y los strings estén limpios
      const formattedData = {
        nombre: String(values.nombre).trim(),
        documento: String(values.documento).trim(),
        cargo: String(values.cargo).trim(),
        salario_base: parseFloat(values.salario_base),
        beneficios: {
          subsidio_transporte: parseFloat(values.subsidio_transporte || 0),
          otros: parseFloat(values.otros_beneficios || 0),
        },
        estado: "activo",
        fecha_contratacion: values.fecha_contratacion,
        horario: {
          tipo: values.tipo_horario,
          horas_diarias: parseInt(values.horas_diarias, 10),
        },
        contacto: {
          telefono: String(values.telefono).trim(),
          email: String(values.email).trim().toLowerCase(),
        },
      };

      // Log para debugging
      console.log("Datos a enviar al servidor:", formattedData);

      const response = await registerEmployeeRequest(formattedData);

      console.log("Respuesta del servidor:", response);

      if (
        response.status === 200 ||
        response.status === 201 ||
        response.status === 204
      ) {
        alert("Empleado registrado exitosamente");
        reset(); // Limpiar el formulario
      }
    } catch (error) {
      console.error("Error detallado:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.response?.config?.data, // Ver qué datos se enviaron
      });

      setSubmitError(
        error.response?.data?.message ||
          "Error al registrar empleado. Por favor, verifique los datos e intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Registro de Empleados</h1>

      {submitError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre completo *
            </label>
            <input
              type="text"
              {...register("nombre", { required: true })}
              className="w-full border rounded p-2"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Documento *
            </label>
            <input
              type="text"
              {...register("documento", { required: true })}
              className="w-full border rounded p-2"
              placeholder="Ej: 123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cargo *
            </label>
            <input
              type="text"
              {...register("cargo", { required: true })}
              className="w-full border rounded p-2"
              placeholder="Ej: Desarrollador"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salario Base *
            </label>
            <input
              type="number"
              step="0.01"
              {...register("salario_base", { required: true, min: 0 })}
              className="w-full border rounded p-2"
              placeholder="Ej: 1500000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subsidio de Transporte
            </label>
            <input
              type="number"
              step="0.01"
              {...register("subsidio_transporte")}
              className="w-full border rounded p-2"
              placeholder="Ej: 140606"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Otros Beneficios
            </label>
            <input
              type="number"
              step="0.01"
              {...register("otros_beneficios")}
              className="w-full border rounded p-2"
              placeholder="Ej: 50000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de Contratación *
            </label>
            <input
              type="date"
              {...register("fecha_contratacion", { required: true })}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Horario *
            </label>
            <select
              {...register("tipo_horario", { required: true })}
              className="w-full border rounded p-2"
            >
              <option value="completo">Tiempo Completo</option>
              <option value="parcial">Medio Tiempo</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Horas Diarias *
            </label>
            <input
              type="number"
              {...register("horas_diarias", {
                required: true,
                min: 1,
                max: 24,
              })}
              className="w-full border rounded p-2"
              placeholder="Ej: 8"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teléfono *
            </label>
            <input
              type="tel"
              {...register("telefono", { required: true })}
              className="w-full border rounded p-2"
              placeholder="Ej: 3214567890"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              {...register("email", {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className="w-full border rounded p-2"
              placeholder="Ej: juan.perez@ejemplo.com"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registrando..." : "Registrar Empleado"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
