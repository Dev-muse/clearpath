"use client";

import { useState } from "react";

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(350000);
  const [termYears, setTermYears] = useState<number>(25);

  // Calculate the derived monthly payment inline during render pass
  const P = loanAmount;
  const r = 0.045 / 12; // 4.5% illustrative annual rate / 12 months
  const n = termYears * 12;
  
  let monthlyPayment = 0;
  if (P > 0 && n > 0) {
    const payment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    monthlyPayment = Math.round(payment);
  }

  return (
    <section id="calculator" className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="bg-navy-900 rounded-3xl p-8 md:p-12 text-white grid grid-cols-1 lg:grid-cols-2 gap-16 items-center shadow-2xl">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Calculate Your Potential Payments
            </h2>
            <p className="font-body text-base text-navy-100/70 mb-10 leading-relaxed">
              Use our expert tool to estimate your monthly costs. This is based on current market averages and subject to lender approval.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4 items-end">
                  <span className="font-body text-sm font-semibold text-navy-100/80">Loan Amount</span>
                  <span className="font-heading text-2xl font-bold text-gold-500">
                    £{loanAmount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-4 items-end">
                  <span className="font-body text-sm font-semibold text-navy-100/80">Term (Years)</span>
                  <span className="font-heading text-2xl font-bold text-gold-500">
                    {termYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  step="1"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full accent-gold-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center flex flex-col justify-center items-center">
            <p className="font-heading text-xs uppercase tracking-widest text-navy-100/60 font-semibold mb-4">
              Estimated Monthly Payment
            </p>
            <div className="font-heading text-4xl md:text-5xl font-bold text-gold-500 mb-2">
              £{monthlyPayment.toLocaleString()}
            </div>
            <p className="font-body text-xs text-navy-100/50 italic mb-8">
              *Based on an illustrative 4.5% interest rate.
            </p>
            <button className="w-full py-4 bg-gold-500 text-white font-body font-semibold rounded-lg hover:bg-gold-600 active:scale-[0.99] transition-all shadow-lg">
              Apply with This Rate
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}