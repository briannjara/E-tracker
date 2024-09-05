import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useState, useEffect } from "react";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState();
  const [totalSpent, setTotalSpent] = useState();
  const [noOfBudget, setNoOfBudget] = useState();

  // Add a new state for loading
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

  // Skeleton component
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
    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="text-2xl font-bold">
          ksh {totalBudget}
          </h2>
        </div>
        <PiggyBank className="w-12 h-12 bg-primary text-white rounded-full p-3" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">Total Spent</h2>
          <h2 className="text-2xl font-bold">
           ksh {totalSpent}
          </h2>
        </div>
        <ReceiptText className="w-12 h-12 bg-primary text-white rounded-full p-3" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">No. of Budget</h2>
          <h2 className="text-2xl font-bold">
          {noOfBudget}
          </h2>
        </div>
        <Wallet className="w-12 h-12 bg-primary text-white rounded-full p-3" />
      </div>
    </div>
  );
}

export default CardInfo;
