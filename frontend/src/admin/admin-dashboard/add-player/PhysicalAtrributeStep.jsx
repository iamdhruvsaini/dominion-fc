import React from "react";

const PhysicalAttributesStep = ({ register, errors, trigger, onNext, onBack }) => {
  const handleNext = async () => {
    const valid = await trigger(["heightCm", "weightKg"]);
    if (valid) onNext();
  };

  return (
    <div className="bg-amber-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-amber-700">Physical Attributes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Height (cm) */}
        <div>
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <input
            type="number"
            {...register("heightCm", {
              required: "Height is required",
              valueAsNumber: true,
              min: { value: 0, message: "Height must be non-negative" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.heightCm && <p className="text-red-500 text-sm mt-1">{errors.heightCm.message}</p>}
        </div>

        {/* Weight (kg) */}
        <div>
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input
            type="number"
            {...register("weightKg", {
              required: "Weight is required",
              valueAsNumber: true,
              min: { value: 0, message: "Weight must be non-negative" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.weightKg && <p className="text-red-500 text-sm mt-1">{errors.weightKg.message}</p>}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
          Back
        </button>
        <button type="button" onClick={handleNext} className="px-4 py-2 bg-amber-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default PhysicalAttributesStep;
