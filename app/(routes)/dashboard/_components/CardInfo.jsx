import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";

function CardInfo({ budgetList, budgetCount }) {
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpent, setTotalSpent] = useState();
  const [noOfBudget, setNoOfBudget] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (budgetList.length > 0) {
      CalculateCardInfo();
      setIsLoading(false);
    }
  }, [budgetList]);

  const CalculateCardInfo = () => {
    let totalBudget = 0;
    let totalSpent = 0;
    let noOfBudget = 0;

    budgetList.forEach(budget => {
      totalBudget = totalBudget + Number(budget.amount);
      totalSpent = totalSpent + Number(budget.totalSpend);
      noOfBudget++;
    });

    setTotalBudget(totalBudget);
    setTotalSpent(totalSpent);
    setNoOfBudget(noOfBudget);
  }

  const SkeletonCard = () => (
    <div className="p-7 border rounded-lg flex items-center justify-between animate-pulse">
      <div>
        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
        <div className="h-8 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-sm font-medium text-gray-400 mb-2">Total Budget</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-400">
            ksh {totalBudget}
          </h2>
          <PiggyBank className="w-12 h-12 text-blue-500 bg-blue-500 bg-opacity-20 rounded-full p-2" />
        </div>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-sm font-medium text-gray-400 mb-2">Total Spent</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-400">
            ksh {totalSpent}
          </h2>
          <ReceiptText className="w-12 h-12 text-green-500 bg-green-500 bg-opacity-20 rounded-full p-2" />
        </div>
      </div>
      <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-lg">
        <h2 className="text-sm font-medium text-gray-400 mb-2">Total Budgets</h2>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-purple-400">{noOfBudget}</h2>
          <Wallet className="w-12 h-12 text-purple-500 bg-purple-500 bg-opacity-20 rounded-full p-2" />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
