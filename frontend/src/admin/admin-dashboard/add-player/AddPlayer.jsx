import React, { useState } from "react";
import { useForm } from "react-hook-form";
import WageInfoStep from "./WageInfoStep";
import PhysicalAttributesStep from "./PhysicalAtrributeStep";
import PlayerSkillsStep from "./PlayerSkillsStep";
import BasicInfoStep from "./BasicInfoStep";
import { useAddPlayerMutation } from "@/redux/features/admin/adminApi";
import Swal from "sweetalert2";

const AddPlayer = () => {
  const [step, setStep] = useState(0);
  const [submission,setSubmission]=useState(false);
  const { handleSubmit, register,reset, formState: { errors }, trigger } = useForm();
  const [addPlayer]=useAddPlayerMutation();

  const positions = [
    'LW', 'ST', 'RW', // Forwards
    'CDM', 'CAM', 'CM', // Midfielders
    'RB', 'CB', 'LB', // Defenders
    'GK' // Goalkeeper
  ];
  
  const formSubmit = async(formData) => {
    setSubmission(true);
    try {
      await addPlayer(formData).unwrap();
      Swal.fire({
        icon: "success",
        title: "Added Successfully",
        text: "player is added to database",
      });
      reset();
      setStep(0);
    } catch (error) {
      alert(error);
      Swal.fire({
        icon: "error",
        title: "Error Occured",
        text: "some error occured",
      });
    }finally{
      setSubmission(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold mb-6 text-blue-800">Add New Player</h1>
        <form onSubmit={handleSubmit(formSubmit)} className="space-y-8">
          {step === 0 && (
            <BasicInfoStep
              register={register}
              errors={errors}
              positions={positions}
              trigger={trigger}
              onNext={() => setStep(1)}
            />
          )}
          {step === 1 && (
            <WageInfoStep
              register={register}
              errors={errors}
              trigger={trigger}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <PhysicalAttributesStep
              register={register}
              errors={errors}
              trigger={trigger}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <PlayerSkillsStep register={register} errors={errors} submission={submission} onBack={() => setStep(2)} />
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPlayer;
