import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import userBackground from "@/assets/Images/admin-users.svg";
import { Link } from "react-router-dom";
import {
 
  useAddNewEmployeeMutation,
  useGetEmployeeDetailsQuery,
  useRemoveEmployeeMutation,
} from "@/redux/features/admin/adminApi";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const UsersPage = () => {
  const { data: employees} = useGetEmployeeDetailsQuery();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const {
    handleSubmit: handleSubmitRemove,
    register: registerRemove,
    formState: { errors: errorsRemove },
  } = useForm();
  const [addEmployee] = useAddNewEmployeeMutation();
  const [removeEmployee]=useRemoveEmployeeMutation();

  const [addEmployeeLoading, setaddEmployeeLoading] = useState(false);
  const [removeEmployeeLoading, setRemoveEmployeeLoading] = useState(false);

  const handleEmployeeAdd = async (formData) => {
    setaddEmployeeLoading(true);
    try {
      const response = await addEmployee(formData).unwrap();
      Swal.fire({
        title: "<strong>Employee Added Successfully</strong>",
        icon: "success",
        html: `
          <div style="text-align: left; font-size: 16px; color: #333;">
            <p><strong>🔑 Password:</strong> <span style="color: #d32f2f;">${response.admin.password}</span></p>
            <p><strong>🆔 Employee ID:</strong> <span style="color: #1976d2;">${response.admin.admin_id}</span></p>
            <p>📩 Please share the credentials with the employee securely.</p>
          </div>
        `,
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "OK",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally {
      setaddEmployeeLoading(false);
    }
  };

  const handleEmployeeRemove = async (formData) => {
    setRemoveEmployeeLoading(true);
    try {
        const response = await removeEmployee(formData).unwrap();
        toast.success("Employee removed successfully")
      } catch (error) {
        console.error("Error adding employee:", error);
        toast.error("Check employee email !");
      } finally {
        setRemoveEmployeeLoading(false);
      }
  };

  return (
    <div className="lg:flex lg:justify-between gap-6 items-stretch">
      <div className="lg:w-[50%]">
        <div className="py-2">
          <div className="flex justify-between items-center mb-1">
            <h1 className="text-md font-bold pl-2">Employees</h1>
            <Link
              to={"/admin/portal/employees-details"}
              className="text-white bg-blue-600 hover:bg-blue-700 rounded-md p-2 font-medium text-sm"
            >
              View All
            </Link>
          </div>
          <Table>
            <TableCaption>A list of your recent Employees.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Emp Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>email</TableHead>
                <TableHead className="text-right">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees?.data?.slice(0, 5).map((employee) => (
                <TableRow key={employee.admin_id}>
                  <TableCell className="font-medium">
                    {employee.admin_id}
                  </TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell className="text-right">{employee.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="w-full bg-white p-2 dark:bg-gray-800 mt-4">
          <h1 className="text-md font-bold text-gray-900 mb-2">Add Employee</h1>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleEmployeeAdd)}
          >
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Sergio Wood"
                autoComplete="off"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 dark:text-white"
              >
                Enter email
              </label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                autoComplete="off"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Select Field */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-800 dark:text-white"
              >
                Choose an option
              </label>
              <select
                id="role"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("role", { required: "Role is required" })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="maintainer">Maintainer</option>
                <option value="viewer">Viewer</option>
                <option value="developer">Developer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-2 font-medium text-sm"
              disabled={addEmployeeLoading}
            >
              {addEmployeeLoading ? "Adding ..." : "Add Employee"}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:w-[50%] flex flex-col justify-between gap-4">
        <div className="w-full p-2 dark:bg-gray-800 bg-white">
          <h1 className="text-md font-bold text-gray-900 mb-2">Remove user</h1>
          <form
            onSubmit={handleSubmitRemove(handleEmployeeRemove)}
            className="space-y-4 bg-white dark:bg-gray-800"
          >
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-white">
                Name
              </label>
              <input
                type="text"
                {...registerRemove("name", { required: "Name is required" })}
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Sergio Wood"
                autoComplete="off"
              />
              {errorsRemove.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errorsRemove.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-800 dark:text-white">
                Enter Email
              </label>
              <input
                type="email"
                {...registerRemove("email", { required: "Email is required" })}
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@company.com"
                autoComplete="off"
              />
              {errorsRemove.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errorsRemove.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg p-2 font-medium text-sm"
            >
              {removeEmployeeLoading?"Removing ... ":"Remove Employee"}
            </button>
          </form>
        </div>
        <img src={userBackground} alt="" className="h-[340px] mx-auto" />
      </div>
    </div>
  );
};

export default UsersPage;
