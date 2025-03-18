import React from "react";

const PlayerSkillsStep = ({ register, errors, submission,onBack }) => {

  return (
    <div className="bg-purple-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-purple-700">Player Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Skill Moves */}
        <div>
          <label className="block text-sm font-medium mb-1">Skill Moves (1-5)</label>
          <input
            type="number"
            {...register("skillMoves", {
              required: "Skill Moves is required",
              valueAsNumber: true,
              min: { value: 1, message: "Skill Moves must be at least 1" },
              max: { value: 5, message: "Skill Moves must not exceed 5" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.skillMoves && <p className="text-red-500 text-sm mt-1">{errors.skillMoves.message}</p>}
        </div>

        {/* Pace */}
        <div>
          <label className="block text-sm font-medium mb-1">Pace</label>
          <input
            type="number"
            {...register("pace", {
              required: "Pace is required",
              valueAsNumber: true,
              min: { value: 0, message: "Pace must be at least 0" },
              max: { value: 100, message: "Pace must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.pace && <p className="text-red-500 text-sm mt-1">{errors.pace.message}</p>}
        </div>

        {/* Shooting */}
        <div>
          <label className="block text-sm font-medium mb-1">Shooting</label>
          <input
            type="number"
            {...register("shooting", {
              required: "Shooting is required",
              valueAsNumber: true,
              min: { value: 0, message: "Shooting must be at least 0" },
              max: { value: 100, message: "Shooting must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.shooting && <p className="text-red-500 text-sm mt-1">{errors.shooting.message}</p>}
        </div>

        {/* Passing */}
        <div>
          <label className="block text-sm font-medium mb-1">Passing</label>
          <input
            type="number"
            {...register("passing", {
              required: "Passing is required",
              valueAsNumber: true,
              min: { value: 0, message: "Passing must be at least 0" },
              max: { value: 100, message: "Passing must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.passing && <p className="text-red-500 text-sm mt-1">{errors.passing.message}</p>}
        </div>

        {/* Dribbling */}
        <div>
          <label className="block text-sm font-medium mb-1">Dribbling</label>
          <input
            type="number"
            {...register("dribbling", {
              required: "Dribbling is required",
              valueAsNumber: true,
              min: { value: 0, message: "Dribbling must be at least 0" },
              max: { value: 100, message: "Dribbling must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.dribbling && <p className="text-red-500 text-sm mt-1">{errors.dribbling.message}</p>}
        </div>

        {/* Defending */}
        <div>
          <label className="block text-sm font-medium mb-1">Defending</label>
          <input
            type="number"
            {...register("defending", {
              required: "Defending is required",
              valueAsNumber: true,
              min: { value: 0, message: "Defending must be at least 0" },
              max: { value: 100, message: "Defending must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.defending && <p className="text-red-500 text-sm mt-1">{errors.defending.message}</p>}
        </div>

        {/* Physic */}
        <div>
          <label className="block text-sm font-medium mb-1">Physic</label>
          <input
            type="number"
            {...register("physic", {
              required: "Physic is required",
              valueAsNumber: true,
              min: { value: 0, message: "Physic must be at least 0" },
              max: { value: 100, message: "Physic must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.physic && <p className="text-red-500 text-sm mt-1">{errors.physic.message}</p>}
        </div>

        {/* Attacking Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Attacking Skills</label>
          <input
            type="number"
            {...register("attackingSkills", {
              required: "Attacking Skills are required",
              valueAsNumber: true,
              min: { value: 0, message: "Attacking Skills must be at least 0" },
              max: { value: 100, message: "Attacking Skills must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.attackingSkills && <p className="text-red-500 text-sm mt-1">{errors.attackingSkills.message}</p>}
        </div>

        {/* Skill Attributes */}
        <div>
          <label className="block text-sm font-medium mb-1">Skill Attributes</label>
          <input
            type="number"
            {...register("skillAttributes", {
              required: "Skill Attributes are required",
              valueAsNumber: true,
              min: { value: 0, message: "Skill Attributes must be at least 0" },
              max: { value: 100, message: "Skill Attributes must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.skillAttributes && <p className="text-red-500 text-sm mt-1">{errors.skillAttributes.message}</p>}
        </div>

        {/* Movement Skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Movement Skills</label>
          <input
            type="number"
            {...register("movementSkills", {
              required: "Movement Skills are required",
              valueAsNumber: true,
              min: { value: 0, message: "Movement Skills must be at least 0" },
              max: { value: 100, message: "Movement Skills must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.movementSkills && <p className="text-red-500 text-sm mt-1">{errors.movementSkills.message}</p>}
        </div>

        {/* Power Attributes */}
        <div>
          <label className="block text-sm font-medium mb-1">Power Attributes</label>
          <input
            type="number"
            {...register("powerAttributes", {
              required: "Power Attributes are required",
              valueAsNumber: true,
              min: { value: 0, message: "Power Attributes must be at least 0" },
              max: { value: 100, message: "Power Attributes must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.powerAttributes && <p className="text-red-500 text-sm mt-1">{errors.powerAttributes.message}</p>}
        </div>

        {/* mental Attribute  */}
        <div>
          <label className="block text-sm font-medium mb-1">Mental Attributes</label>
          <input
            type="number"
            {...register("mentalAttributes", {
              required: "mental Attributes are required",
              valueAsNumber: true,
              min: { value: 0, message: "mental Attributes must be at least 0" },
              max: { value: 100, message: "mental Attributes must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.mentalAttributes && <p className="text-red-500 text-sm mt-1">{errors.mentalAttributes.message}</p>}
        </div>

        {/* defending skills */}
        <div>
          <label className="block text-sm font-medium mb-1">Defending Skills</label>
          <input
            type="number"
            {...register("defendingSkills", {
              required: "defending skills are required",
              valueAsNumber: true,
              min: { value: 0, message: "defending skills must be at least 0" },
              max: { value: 100, message: "defending skills must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.defendingSkills && <p className="text-red-500 text-sm mt-1">{errors.defendingSkills.message}</p>}
        </div>

        {/* goalKeeping Ability  */}
        <div>
          <label className="block text-sm font-medium mb-1">Goalkeeping Ability</label>
          <input
            type="number"
            {...register("goalKeepingAbility", {
              required: "goalKeeping ability is required",
              valueAsNumber: true,
              min: { value: 0, message: "goalkeeping ability must be at least 0" },
              max: { value: 100, message: "goalkeeping ability must not exceed 100" },
            })}
            className="w-full p-2 border rounded"
          />
          {errors.goalKeepingAbility && <p className="text-red-500 text-sm mt-1">{errors.goalKeepingAbility.message}</p>}
        </div>

      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
          Back
        </button>
        <button type="submit" className="px-4 py-2 bg-purple-500 text-white rounded">
          {submission?"Submitting":"Submit"}
        </button>
      </div>
    </div>
  );
};

export default PlayerSkillsStep;
