"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const eligibilitySchema = z.object({
  goal: z.enum(["Buying my first home", "Remortgaging my property", "Property investment"]),
  propertyValue: z.number({ 
    error: "Enter a valid amount" 
  }).min(50000, "Minimum value is £50,000"),
  deposit: z.number({ 
    error: "Enter a valid amount" 
  }).min(0, "Deposit cannot be negative"),
}).refine((data) => data.deposit < data.propertyValue, {
  message: "Deposit must be less than the property value",
  path: ["deposit"],
});

type EligibilityInput = z.infer<typeof eligibilitySchema>;

export default function EligibilityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EligibilityInput>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      goal: "Buying my first home",
    },
  });

  const onSubmit = async (data: EligibilityInput) => {
    setIsSubmitting(true);
    setSuccessMessage("");
    
    // Illustrative processing delay - ready to wire up to your API / Resend route later
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSuccessMessage("Eligibility check processed! Redirecting to specialist pairing...");
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-brand-border relative z-10">
      <h3 className="font-heading text-xl font-bold text-navy-900 mb-6">
        Get Your Pre-Approval
      </h3>
      
      {successMessage ? (
        <div className="p-4 bg-green-50 text-green-700 font-body text-sm rounded-lg border border-green-200">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 font-body text-sm">
          <div>
            <label className="block text-xs font-semibold text-brand-text/70 mb-2">
              What&apos;s your primary goal?
            </label>
            <select 
              {...register("goal")}
              className="w-full p-3.5 rounded-lg border border-brand-border bg-brand-bg text-brand-text focus:outline-none focus:border-navy-900"
            >
              <option value="Buying my first home">Buying my first home</option>
              <option value="Remortgaging my property">Remortgaging my property</option>
              <option value="Property investment">Property investment</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">
                Property Value (£)
              </label>
              <input 
                type="number" 
                placeholder="e.g. 500000" 
                {...register("propertyValue", { valueAsNumber: true })}
                className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.propertyValue ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              />
              {errors.propertyValue && (
                <p className="text-red-500 text-xs mt-1">{errors.propertyValue.message}</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">
                Deposit Amount (£)
              </label>
              <input 
                type="number" 
                placeholder="e.g. 50000" 
                {...register("deposit", { valueAsNumber: true })}
                className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.deposit ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              />
              {errors.deposit && (
                <p className="text-red-500 text-xs mt-1">{errors.deposit.message}</p>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-4 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-900/90 active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Check Eligibility"}
          </button>
        </form>
      )}
    </div>
  );
}