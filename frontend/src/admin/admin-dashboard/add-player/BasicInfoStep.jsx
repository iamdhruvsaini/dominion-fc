import React from "react";
import { Camera } from "lucide-react";

const BasicInfoStep = ({ register, errors, positions, trigger, onNext }) => {
  const handleNext = async () => {
    // Validate fields specific to Basic Information step
    const valid = await trigger([
      "shortName",
      "age",
      "nationality",
      "clubPosition",
      "clubJerseyNumber",
      "overall",
      "potential",
      "trending",
      "playerFaceUrl",
    ]);
    if (valid) onNext();
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Short Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Short Name *</label>
          <input
            type="text"
            {...register("shortName", {
              required: "Short Name is required",
              maxLength: { value: 20, message: "Short Name must not exceed 20 characters" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.shortName && <p className="text-red-500 text-sm mt-1">{errors.shortName.message}</p>}
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Full Name </label>
          <input
            type="text"
            {...register("longName", {
              maxLength: { value: 100, message: "Full Name must not exceed 100 characters" },
            })}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-1">Age *</label>
          <input
            type="number"
            min="16"
            max="45"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required",
              min: { value: 16, message: "Age must be at least 16" },
              max: { value: 45, message: "Age must not exceed 45" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium mb-1">Nationality *</label>
          <input
            type="text"
            {...register("nationality", {
              required: "Nationality is required",
              maxLength: { value: 50, message: "Nationality must not exceed 50 characters" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality.message}</p>}
        </div>

        {/* League */}
        <div>
          <label className="block text-sm font-medium mb-1">League </label>
          <input
            type="text"
            {...register("leagueName", {
              required: "League is required",
              maxLength: { value: 50, message: "League must not exceed 50 characters" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.leagueName && <p className="text-red-500 text-sm mt-1">{errors.leagueName.message}</p>}
        </div>

        {/* Club */}
        <div>
          <label className="block text-sm font-medium mb-1">Club </label>
          <input
            type="text"
            {...register("clubName", {
              required: "Club is required",
              maxLength: { value: 50, message: "Club must not exceed 50 characters" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.clubName && <p className="text-red-500 text-sm mt-1">{errors.clubName.message}</p>}
        </div>

        {/* Position */}
        <div>
          <label className="block text-sm font-medium mb-1">Position *</label>
          <select
            {...register("clubPosition", { required: "Position is required" })}
            className="w-full p-2 border rounded"
          >
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          {errors.clubPosition && <p className="text-red-500 text-sm mt-1">{errors.clubPosition.message}</p>}
        </div>

        {/* Jersey Number */}
        <div>
          <label className="block text-sm font-medium mb-1">Jersey Number *</label>
          <input
            type="number"
            min="1"
            max="99"
            {...register("clubJerseyNumber", {
              valueAsNumber: true,
              required: "Jersey Number is required",
              min: { value: 1, message: "Jersey Number must be at least 1" },
              max: { value: 99, message: "Jersey Number must not exceed 99" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.clubJerseyNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.clubJerseyNumber.message}</p>
          )}
        </div>

        {/* Overall Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Overall Rating *</label>
          <input
            type="number"
            min="1"
            max="99"
            {...register("overall", {
              valueAsNumber: true,
              required: "Overall Rating is required",
              min: { value: 1, message: "Overall Rating must be at least 1" },
              max: { value: 99, message: "Overall Rating must not exceed 99" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.overall && <p className="text-red-500 text-sm mt-1">{errors.overall.message}</p>}
        </div>

        {/* Potential Rating */}
        <div>
          <label className="block text-sm font-medium mb-1">Potential Rating *</label>
          <input
            type="number"
            min="1"
            max="99"
            {...register("potential", {
              valueAsNumber: true,
              required: "Potential Rating is required",
              min: { value: 1, message: "Potential Rating must be at least 1" },
              max: { value: 99, message: "Potential Rating must not exceed 99" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.potential && <p className="text-red-500 text-sm mt-1">{errors.potential.message}</p>}
        </div>

        {/* Trending */}
        <div>
          <label className="block text-sm font-medium mb-1">Trending *</label>
          <select
            {...register("trending", { required: "Trending is required" })}
            className="w-full p-2 border rounded"
          >
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
          {errors.trending && <p className="text-red-500 text-sm mt-1">{errors.trending.message}</p>}
        </div>

        {/* Player Face URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Player Face URL *</label>
          <div className="flex items-center">
            <input
              type="text"
              {...register("playerFaceUrl", {
                required: "Player Face URL is required",
                maxLength: { value: 200, message: "Player Face URL must not exceed 200 characters" },
              })}
              className="w-full p-2 border rounded"
            />
            <button type="button" className="ml-2 bg-blue-100 p-2 rounded">
              <Camera size={20} />
            </button>
          </div>
          {errors.playerFaceUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.playerFaceUrl.message}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfoStep;
