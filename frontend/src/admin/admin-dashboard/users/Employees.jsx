import { useState } from "react";
import { Search } from "lucide-react"; // Importing search icon
import { useGetEmployeeDetailsQuery, useUpdateEmployeeMutation } from "@/redux/features/admin/adminApi";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Employees = () => {
  const { data: employees, isLoading } = useGetEmployeeDetailsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [updateEmployeeLoading, setupdateEmployeeLoading] = useState(false);
  const {handleSubmit,register,formState:{errors}}=useForm();
  const [updateEmployee]=useUpdateEmployeeMutation();

  // Filter employees based on search query
  const filteredEmployees = employees?.data?.filter((employee) =>
    `${employee.name} ${employee.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleEmployeeUpdate=async(formData)=>{
    setupdateEmployeeLoading(true);
    try {
      await updateEmployee(formData).unwrap();
      toast.success("Updated employee details");
    } catch (error) {
      console.log("Error in updating Employee",error);
      toast.error("Ensure emp id is valid !");
    }finally{
      setupdateEmployeeLoading(false);
    }
  }

  return (

    <div className="min-h-screen p-2 lg:flex lg:flex-row-reverse gap-4">

      <div className="lg:w-[30%] bg-white p-2">
          <h1 className="text-md font-bold text-gray-900 mb-2">Update Employee</h1>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleEmployeeUpdate)}
          >

            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-800 dark:text-white"
              >
                Employee ID
              </label>
              <input
                type="number"
                id="userId"
                placeholder="101"
                autoComplete="off"
                className="w-full p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("employeeId", { required: "Id is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.employeeId.message}</p>
              )}
            </div>
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 dark:text-white"
              >
                New name
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
                New email
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
                Change Role
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
              disabled={updateEmployeeLoading}
            >
              {updateEmployeeLoading ? "Updating ..." : "Update Employee"}
            </button>
          </form>
    
      </div>
      {/* Search Bar with Icon */}
      <div className="lg:w-[70%] mt-10 lg:mt-0">
        <h1 className="text-lg font-bold mb-4">Search For Employee</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full p-2 pl-10 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Table>
          <TableCaption>A list of your recent Employees.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Emp Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees?.map((employee) => (
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

      

    </div>
  );
};

export default Employees;
