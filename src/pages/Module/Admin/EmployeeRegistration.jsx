import { useState } from "react";
import { registerEmployeeRequest } from "../../../api/auth";

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    cargo: "",
    salario_base: "",
    subsidio_transporte: "",
    otros_beneficios: "",
    estado: "",
    fecha_contratacion: "",
    tipo_horario: "",
    horas_diarias: "",
    telefono: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      nombre: formData.nombre,
      documento: formData.documento,
      cargo: formData.cargo,
      salario_base: parseFloat(formData.salario_base),
      beneficios: {
        subsidio_transporte: parseFloat(formData.subsidio_transporte) || 0,
        otros: parseFloat(formData.otros_beneficios) || 0,
      },
      estado: formData.estado,
      fecha_contratacion: formData.fecha_contratacion,
      horario: {
        tipo: formData.tipo_horario,
        horas_diarias: parseInt(formData.horas_diarias, 10),
      },
      contacto: {
        telefono: formData.telefono,
        email: formData.email,
      },
    };

    try {
      const response = await registerEmployeeRequest(payload);

      if (response.status === 201) {
        setMessage("Empleado registrado exitosamente");
        setFormData({
          nombre: "",
          documento: "",
          cargo: "",
          salario_base: "",
          subsidio_transporte: "",
          otros_beneficios: "",
          estado: "activo",
          fecha_contratacion: "",
          tipo_horario: "",
          horas_diarias: "",
          telefono: "",
          email: "",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || "Error al registrar el empleado"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Registro de Empleados</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Documento:</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Cargo:</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Salario Base:</label>
          <input
            type="number"
            name="salario_base"
            value={formData.salario_base}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Subsidio Transporte:</label>
          <input
            type="number"
            name="subsidio_transporte"
            value={formData.subsidio_transporte}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Otros Beneficios:</label>
          <input
            type="number"
            name="otros_beneficios"
            value={formData.otros_beneficios}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-semibold">Fecha de Contratación:</label>
          <input
            type="date"
            name="fecha_contratacion"
            value={formData.fecha_contratacion}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Tipo de Horario:</label>
          <input
            type="text"
            name="tipo_horario"
            value={formData.tipo_horario}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Horas Diarias:</label>
          <input
            type="number"
            name="horas_diarias"
            value={formData.horas_diarias}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default EmployeeRegistration;
