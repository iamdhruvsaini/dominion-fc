import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import phoneStadium from "@/assets/Images/stadium-phone.jpeg";
import getBaseURL from "@/utils/baseURL";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        
      const response = await axios.post(`${getBaseURL()}/api/users/verify-admin`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      localStorage.setItem('role',JSON.stringify(response.data.role));
      localStorage.setItem('token',JSON.stringify(response.data.token));

      toast.success("Login successful!");
      
      navigate("/admin/portal", { replace: true });
      
    } catch (error) {
      if (error.response) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Check Your Network"); 
      }
      console.error("Login Failed:", error.response?.data || error.message);
    }finally{
        setLoading(false);
    }
  };
  
  return (
    <section className="relative flex items-center justify-center h-screen w-full">
      <img src={phoneStadium} alt="" className="absolute w-full h-full" />
      <Card className="relative z-10 w-full max-w-sm bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to log in to your account.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                autoComplete="off"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: { value: 4, message: "Password must be at least 4 characters" }, 
                    maxLength: { value: 255, message: "Password cannot exceed 255 characters" } 
                })}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ?"Verifying ...":"Login In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default AdminLogin;
