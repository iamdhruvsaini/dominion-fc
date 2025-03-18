import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import signUpBoxImage from "../assets/Images/soccer-player.webp";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

export function SignUpForm({ className, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { emailSignup, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    setLoading(true); // Start loading
    try {
      await emailSignup(formData.email, formData.password);
      toast.success("Signup successful!");
      navigate("/");
    } catch (error) {
      toast.error("Signup failed!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true); // Start loading
    try {
      await googleSignIn();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-in failed!");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="relative hidden bg-muted md:block">
            <img
              src={signUpBoxImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Register Now</h1>
                <p className="text-balance text-muted-foreground">
                  Create your Dominion Fc. account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                    maxLength: {
                      value: 100,
                      message: "Email cannot exceed 100 characters",
                    },
                  })}
                  required
                  autoComplete="off"
                />
                {errors.email && (
                  <span className="text-sm text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="off"
                  {...register("password", {
                    minLength: {
                      value: 4,
                      message: "Password must be at least 4 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Password cannot exceed 50 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-sm">{errors.password.message}</span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                onClick={handleSubmit(onSubmit)}
              >
                {loading ? "Wait ..." : "Register Me"}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleGoogleSignIn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to={"/login"} className="underline underline-offset-4">
                  Log In
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
