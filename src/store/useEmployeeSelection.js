import { useState, useEffect } from "react";
import axios from "axios";

export const useEmployeeSelection = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://easynomina-back.onrender.com/api/employees",
          { withCredentials: true }
        );
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar empleados:", err);
        setError("Error al cargar la lista de empleados");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeChange = (event, setValue) => {
    const employeeName = event.target.value;
    const employee = employees.find((emp) => emp.nombre === employeeName);

    if (employee) {
      setSelectedEmployee(employee);
      setValue("identificacion", employee.documento);
      setValue("salario", employee.salario_base); 
    } else {
      setSelectedEmployee(null);
      setValue("identificacion", "");
      setValue("salario", "");
    }
  };

  return { employees, loading, error, selectedEmployee, handleEmployeeChange };
};
