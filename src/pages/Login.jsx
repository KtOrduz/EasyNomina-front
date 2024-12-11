import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { ImSpinner8 } from "react-icons/im";
import { useAuthStore } from "../store/authStore";
import { loginRequest } from "../api/auth";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    if (!value) {
      setErrors({ ...errors, email: "El correo electrónico es obligatorio" });
    } else if (!validateEmail(value)) {
      setErrors({ ...errors, email: "Correo electrónico no válido" });
    } else {
      setErrors({ ...errors, email: "" });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, password: value });

    if (!value) {
      setErrors({ ...errors, password: "La contraseña es obligatoria" });
    } else if (value.length < 8) {
      setErrors({
        ...errors,
        password: "La contraseña debe tener al menos 8 caracteres",
      });
    } else {
      setErrors({ ...errors, password: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!errors.email && !errors.password && formData.email && formData.password) {
      setIsLoading(true);
      try {
        const response = await loginRequest(formData);
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (err) {
        console.error("Error en el inicio de sesión:", err);
        setErrorMessage(
          err.response?.data?.message || "Error al iniciar sesión, intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  // useEffect that shows on console the user data
  useEffect(() => {
    if (User) {
      console.log(
        `El usuario con el id ${User.id} ha iniciado sesión, el cual se identifica con el nombre de ${User.name}`,
      );
    }
  }, [User]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bienvenido
        </h1>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                required
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                value={formData.email}
                onChange={handleEmailChange}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                className={`w-full pl-10 pr-12 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                value={formData.password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 flex items-center justify-center space-x-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <ImSpinner8 className="animate-spin" />
                <span>Iniciando Sesión...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export { Login };
