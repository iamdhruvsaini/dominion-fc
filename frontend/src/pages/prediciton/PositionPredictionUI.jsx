import React, { useState } from "react";
import {
  Activity,
  Award,
  Zap,
  Weight,
  Dumbbell,
  Sparkles,
  DollarSign,
  Hash,
  Crosshair,
  Loader2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const PositionPredictionUI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const defaultValues = {
    overall: 93,
    potential: 95,
    value_eur: 100500000,
    wage_eur: 550000,
    pace: 93,
    shooting: 89,
    passing: 86,
    dribbling: 96,
    defending: 27,
    physic: 63,
    skill_moves: 4,
    BMI: 23.46,
  };

  // Initialize formState with defaultValues and empty errors object
  const [formState, setFormState] = useState({
    values: defaultValues,
    errors: {},
  });

  // Create register function to handle form inputs
  const register = (name, validations = {}) => {
    return {
      name,
      value: formState.values[name],
      onChange: (e) => {
        const value =
          e.target.type === "number"
            ? e.target.value === ""
              ? ""
              : Number(e.target.value)
            : e.target.value;

        setFormState((prev) => ({
          ...prev,
          values: {
            ...prev.values,
            [name]: value,
          },
        }));
      },
      onBlur: () => {
        // Validate on blur
        if (
          validations.required &&
          (formState.values[name] === "" ||
            formState.values[name] === undefined)
        ) {
          setFormState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: { message: validations.required },
            },
          }));
        } else if (
          validations.min &&
          formState.values[name] < validations.min.value
        ) {
          setFormState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: { message: validations.min.message },
            },
          }));
        } else if (
          validations.max &&
          formState.values[name] > validations.max.value
        ) {
          setFormState((prev) => ({
            ...prev,
            errors: {
              ...prev.errors,
              [name]: { message: validations.max.message },
            },
          }));
        } else {
          // Clear error if validation passes
          setFormState((prev) => {
            const newErrors = { ...prev.errors };
            delete newErrors[name];
            return {
              ...prev,
              errors: newErrors,
            };
          });
        }
      },
    };
  };

  // Watch form values
  const watch = () => formState.values;

  // Reset form function
  const reset = (values) => {
    setFormState({
      values,
      errors: {},
    });
  };

  // Form submission handler
  const handleSubmit = (callback) => {
    return (e) => {
      e.preventDefault();

      // Validate all fields
      let hasErrors = false;
      const newErrors = {};

      Object.keys(formState.values).forEach((key) => {
        if (
          formState.values[key] === undefined ||
          formState.values[key] === ""
        ) {
          newErrors[key] = { message: `${key} is required` };
          hasErrors = true;
        }
      });

      if (hasErrors) {
        setFormState((prev) => ({
          ...prev,
          errors: newErrors,
        }));
        return;
      }

      callback(formState.values);
    };
  };

  // Get form errors from state
  const errors = formState.errors;

  // Watch all form values for the summary panel
  const formValues = watch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://position-predict.onrender.com/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Network error occurred" }));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const responseData = await response.json();
      setResult(responseData);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const resetForm = () => {
    reset(defaultValues);
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 xl:w-[1300px] mx-auto bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl">
      <div className="w-full md:w-2/3">
        <div className="mb-8">
          <h1 className="block text-3xl font-bold text-gray-800 mb-2">
            Football Position Predictor
          </h1>
          <p className="block text-gray-600">
            Enter player statistics to predict the optimal position
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start">
            <AlertTriangle
              className="text-red-500 mr-3 mt-0.5 flex-shrink-0"
              size={20}
            />
            <div className="block">
              <h3 className="font-medium text-red-800">Prediction Error</h3>
              <p className="text-sm text-red-600">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="block space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Basics */}
            <div className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Award className="mr-2 text-blue-600" size={20} />
                Player Rating
              </h2>
              <div className="space-y-4">
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overall Rating
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.overall ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("overall", {
                      required: "Overall rating is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.overall && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.overall.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Potential Rating
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.potential ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("potential", {
                      required: "Potential rating is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.potential && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.potential.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Economics */}
            <div className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <DollarSign className="mr-2 text-green-600" size={20} />
                Economics
              </h2>
              <div className="space-y-4">
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value (EUR)
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.value_eur ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("value_eur", {
                      required: "Value is required",
                      min: { value: 0, message: "Must be positive" },
                    })}
                  />
                  {errors.value_eur && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.value_eur.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Wage (EUR)
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.wage_eur ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("wage_eur", {
                      required: "Wage is required",
                      min: { value: 0, message: "Must be positive" },
                    })}
                  />
                  {errors.wage_eur && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.wage_eur.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Activity className="mr-2 text-purple-600" size={20} />
                Player Attributes
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Zap className="mr-1 text-yellow-500" size={16} />
                    Pace
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.pace ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("pace", {
                      required: "Pace is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.pace && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.pace.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Crosshair className="mr-1 text-red-500" size={16} />
                    Shooting
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.shooting ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("shooting", {
                      required: "Shooting is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.shooting && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.shooting.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Weight className="mr-1 text-blue-500" size={16} />
                    Passing
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.passing ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("passing", {
                      required: "Passing is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.passing && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.passing.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Sparkles className="mr-1 text-purple-500" size={16} />
                    Dribbling
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.dribbling ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("dribbling", {
                      required: "Dribbling is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.dribbling && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.dribbling.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Dumbbell className="mr-1 text-gray-500" size={16} />
                    Defending
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.defending ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("defending", {
                      required: "Defending is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.defending && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.defending.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Dumbbell className="mr-1 text-orange-500" size={16} />
                    Physic
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.physic ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("physic", {
                      required: "Physic is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 99, message: "Max value is 99" },
                    })}
                  />
                  {errors.physic && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.physic.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Extra Stats */}
            <div className="block bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Hash className="mr-2 text-indigo-600" size={20} />
                Additional Stats
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skill Moves (1-5)
                  </label>
                  <input
                    type="number"
                    className={`w-full px-4 py-2.5 border ${
                      errors.skill_moves ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("skill_moves", {
                      required: "Skill moves is required",
                      min: { value: 1, message: "Min value is 1" },
                      max: { value: 5, message: "Max value is 5" },
                    })}
                  />
                  {errors.skill_moves && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.skill_moves.message}
                    </p>
                  )}
                </div>
                <div className="block">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    BMI
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className={`w-full px-4 py-2.5 border ${
                      errors.BMI ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50`}
                    {...register("BMI", {
                      required: "BMI is required",
                      min: { value: 15, message: "Min value is 15" },
                      max: { value: 40, message: "Max value is 40" },
                    })}
                  />
                  {errors.BMI && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.BMI.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Predicting...
                </>
              ) : (
                <>
                  Predict Position
                  <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-3.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <div className="w-full md:w-1/3">
        <div className="block sticky top-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Activity className="mr-2 text-blue-600" size={20} />
            Player Summary
          </h2>

          <div className="space-y-6">
            <div className="block">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Player Rating
              </h3>
              <div className="flex justify-between mt-1 pb-2 border-b border-gray-100">
                <span className="text-gray-700">Overall</span>
                <span className="font-medium">{formValues.overall}/99</span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-700">Potential</span>
                <span className="font-medium">{formValues.potential}/99</span>
              </div>
            </div>

            <div className="block">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Economics
              </h3>
              <div className="flex justify-between mt-1 pb-2 border-b border-gray-100">
                <span className="text-gray-700">Value</span>
                <span className="font-medium">
                  {formatCurrency(formValues.value_eur)}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-700">Wage</span>
                <span className="font-medium">
                  {formatCurrency(formValues.wage_eur)}/week
                </span>
              </div>
            </div>

            <div className="block">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Key Attributes
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Pace</span>
                  <span className="font-medium">{formValues.pace}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Shooting</span>
                  <span className="font-medium">{formValues.shooting}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Passing</span>
                  <span className="font-medium">{formValues.passing}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Dribbling</span>
                  <span className="font-medium">{formValues.dribbling}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Defending</span>
                  <span className="font-medium">{formValues.defending}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100">
                  <span className="text-gray-700">Physic</span>
                  <span className="font-medium">{formValues.physic}</span>
                </div>
              </div>
            </div>

            {result && (
              <div className="block mt-8 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-center mb-3 text-blue-800">
                  Predicted Position
                </h3>
                <div className="flex justify-center items-center my-4">
                  <div className="text-4xl font-bold text-blue-700">
                    {result.predicted_position}
                  </div>
                </div>
                <p className="text-sm text-gray-700 text-center">
                  Based on the provided statistics, this player is best suited
                  as a {result.predicted_position}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionPredictionUI;
