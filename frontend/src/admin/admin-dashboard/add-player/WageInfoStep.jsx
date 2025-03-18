import React from "react";

const WageInfoStep = ({ register, errors, trigger, onNext, onBack }) => {
  const handleNext = async () => {
    const valid = await trigger(["wageEur", "valueEur", "bought"]);
    if (valid) onNext();
  };

  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Wage Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Wage (EUR) */}
        <div>
          <label className="block text-sm font-medium mb-1">Wage (EUR)</label>
          <input
            type="number"
            {...register("wageEur", {
              required: "Wage is required",
              valueAsNumber: true,
              min: { value: 0, message: "Wage must be non-negative" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.wageEur && <p className="text-red-500 text-sm mt-1">{errors.wageEur.message}</p>}
        </div>

        {/* Market Value (EUR) */}
        <div>
          <label className="block text-sm font-medium mb-1">Market Value (EUR)</label>
          <input
            type="number"
            {...register("valueEur", {
              required: "Market Value is required",
              valueAsNumber: true,
              min: { value: 0, message: "Market Value must be non-negative" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.valueEur && <p className="text-red-500 text-sm mt-1">{errors.valueEur.message}</p>}
        </div>

        {/* Bought */}
        <div>
          <label className="block text-sm font-medium mb-1">Bought</label>
          <input
            type="number"
            {...register("bought", {
              required: "Bought is 0 or 1",
              valueAsNumber: true,
              min: { value: 0, message: "Bought must be 0 or 1" },
              max:{value :1 , message:"Bought must be 0 or 1"}
            })}
            className="w-full p-2 border rounded"
          />
          {errors.bought && <p className="text-red-500 text-sm mt-1">{errors.bought.message}</p>}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
          Back
        </button>
        <button type="button" onClick={handleNext} className="px-4 py-2 bg-green-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default WageInfoStep;
