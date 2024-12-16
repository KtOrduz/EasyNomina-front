import { useState, useEffect } from "react";
import axios from "axios";

const NominaList = () => {
    const [nominas, setNominas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNominas = async () => {
            try {
                const response = await axios.get("https://easynomina-back.onrender.com/api/payroll", {
                    withCredentials: true,
                });
                setNominas(response.data);
                setLoading(false);
            } catch {
                setError("Error al cargar las nóminas.");
                setLoading(false);
            }
        };

        fetchNominas();
    }, []);

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
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Lista de Nóminas</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Identificación</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Inicio</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Fecha de Fin</th>
                        <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {nominas.map((nomina) => (
                        <tr key={nomina.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{nomina.empleado.nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{nomina.empleado.identificacion}</td>
                            <td className="border border-gray-300 px-4 py-2">{nomina.periodo.inicio}</td>
                            <td className="border border-gray-300 px-4 py-2">{nomina.periodo.fin}</td>
                            <td className="border border-gray-300 px-4 py-2">{nomina.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NominaList;
