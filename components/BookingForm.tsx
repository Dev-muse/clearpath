"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  timeSlot: z.enum(["morning", "afternoon"], {
    errorMap: () => ({ message: "Please select a preferred time slot" }),
  }),
  notes: z.string().optional(),
});

type BookingInput = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingInput) => {
    setIsSubmitting(true);
    setSuccessMessage("");

    // Simulate an API network roundtrip to your backend routes
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsSubmitting(false);
    setSuccessMessage("Consultation requested successfully. An expert advisor will call you shortly to confirm.");
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-2xl border border-brand-border shadow-xl">
      <h2 className="font-heading text-2xl font-bold text-navy-900 mb-2">
        Schedule Your Advisory Call
      </h2>
      <p className="font-body text-sm text-brand-muted mb-8">
        Select your timeline preferences, and we will pair you with a London whole-of-market specialist.
      </p>

      {successMessage ? (
        <div className="p-6 bg-green-50 text-green-800 font-body text-sm rounded-xl border border-green-200 flex flex-col gap-2">
          <span className="material-symbols-outlined text-green-600 text-3xl">check_circle</span>
          <p className="font-semibold text-base">Request Received</p>
          <p className="text-green-700/90 leading-relaxed">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-body text-sm">
          <div>
            <label className="block text-xs font-semibold text-brand-text/70 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Alexander Wright"
              {...register("fullName")}
              className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                errors.fullName ? "border-red-500 bg-red-50/30" : "border-brand-border"
              }`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="alex@example.com"
                {...register("email")}
                className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.email ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+44 7123 456789"
                {...register("phone")}
                className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.phone ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">Preferred Date</label>
              <input
                type="date"
                {...register("preferredDate")}
                className={`w-full p-3.5 rounded-lg border text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.preferredDate ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              />
              {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text/70 mb-2">Preferred Time Window</label>
              <select
                {...register("timeSlot")}
                className={`w-full p-3.5 rounded-lg border bg-white text-brand-text focus:outline-none focus:border-navy-900 ${
                  errors.timeSlot ? "border-red-500 bg-red-50/30" : "border-brand-border"
                }`}
              >
                <option value="morning">Morning (09:00 - 12:00)</option>
                <option value="afternoon">Afternoon (12:00 - 17:00)</option>
              </select>
              {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-text/70 mb-2">Additional Profile Details (Optional)</label>
            <textarea
              rows={3}
              placeholder="Details regarding property localization, multi-source income parameters, or target timelines..."
              {...register("notes")}
              className="w-full p-3.5 rounded-lg border border-brand-border text-brand-text focus:outline-none focus:border-navy-900 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-navy-900 text-white font-semibold rounded-lg hover:bg-navy-900/90 active:scale-[0.99] transition-all disabled:opacity-50 font-body"
          >
            {isSubmitting ? "Submitting Portfolio Access Request..." : "Request Priority Consultation"}
          </button>
        </form>
      )}
    </div>
  );
}