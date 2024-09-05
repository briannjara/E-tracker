import Link from "next/link";
import React from "react";
import { AlertCircle } from 'lucide-react';

const calculatePercentage = (budget) => {
  const percentage = (budget.totalSpend / budget.amount) * 100;
  return percentage.toFixed(2);
}

export const BudgetItem = ({ budget }) => {
  const percentage = calculatePercentage(budget);
  const isFull = percentage >= 100;

  return (
    <Link href={`/dashboard/expenses/${budget.id}`}>
      <div className="p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-100 h-[170px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-3xl p-3 bg-slate-100 rounded-full">
              {budget?.icon || '💼'}
            </h2>
            <div>
              <h2 className="text-lg font-bold">{budget.name}</h2>
              <h2 className="text-xs text-slate-400">{budget.totalItem} Item</h2>
            </div>
          </div>
          <div>
            <h2 className="text-xl text-primary font-bold">
              ksh {budget.amount}
            </h2>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs text-slate-400">ksh {budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
            <h2 className="text-xs text-slate-400">ksh {budget.amount - budget.totalSpend} Remaining</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div 
              className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-primary'}`}
              style={{width: `${Math.min(percentage, 100)}%`}}
            ></div>
          </div>
          {isFull && (
            <div className="flex items-center mt-2 text-red-500">
              <AlertCircle size={16} className="mr-1" />
              <span className="text-xs">Budget limit reached</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
