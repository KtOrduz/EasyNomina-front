
// const NomRegistration = () => {
//     const { register, handleSubmit } = useForm();

//     // const onSubmit = handleSubmit(async (values) => {
//     //     const res = await registerEmployeeRequest(values);
//     //     console.log(res);
//     // });

//     return (
//         <div>
//             <h1 className="text-xl font-bold mb-4">Registro de Empleados</h1>
//             <form onSubmit={onSubmit} className="space-y-4">
//                 <div>
//                     <input
//                         type="text"
//                         {...register("nombre", { required: true })}
//                         placeholder="Nombre"
//                         className="w-full border rounded p-2"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         {...register("documento", { required: true })}
//                         placeholder="Documento"
//                         className="w-full border rounded p-2"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         {...register("cargo", { required: true })}
//                         placeholder="Cargo"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         {...register("salario_base", { required: true })}
//                         placeholder="Salario Base"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         {...register("subsidio_transporte", { required: true })}
//                         placeholder="Subsidio Transporte"
//                         className="w-full border rounded p-2"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         {...register("otros_beneficios", { required: true })}
//                         placeholder="Otros Beneficios"
//                         className="w-full border rounded p-2"
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="date"
//                         {...register("fecha_contratacion", { required: true })}
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="text"
//                         {...register("tipo_horario", { required: true })}
//                         placeholder="Tipo de Horario"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         {...register("horas_diarias", { required: true })}
//                         placeholder="Horas Diarias"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="number"
//                         {...register("telefono", { required: true })}
//                         placeholder="Teléfono"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <input
//                         type="email"
//                         {...register("email", { required: true })}
//                         placeholder="Email"
//                         className="w-full border rounded p-2"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                     Cargar
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EmployeeRegistration;
