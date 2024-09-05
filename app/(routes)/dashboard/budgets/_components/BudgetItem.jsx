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
      <div className="p-5 rounded-lg border border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 h-[170px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3 items-center">
            <h2 className="text-3xl p-3 bg-gray-700 rounded-full">
              {budget?.icon || '💼'}
            </h2>
            <div>
              <h2 className="text-lg font-bold text-gray-200">{budget.name}</h2>
              <h2 className="text-xs text-gray-400">{budget.totalItem} Item{budget.totalItem !== 1 ? 's' : ''}</h2>
            </div>
          </div>
          <div>
            <h2 className="text-xl text-blue-400 font-bold">
              ksh {budget.amount}
            </h2>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xs text-gray-400">ksh {budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
            <h2 className="text-xs text-gray-400">ksh {budget.amount - budget.totalSpend} Remaining</h2>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div 
              className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{width: `${Math.min(percentage, 100)}%`}}
            ></div>
          </div>
          {isFull && (
            <div className="flex items-center mt-2 text-red-400">
              <AlertCircle size={16} className="mr-1" />
              <span className="text-xs">Budget limit reached</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
