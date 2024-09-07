import React, { useState } from "react";
import { Input } from "../../../../../@/components/ui/input";
import Button from "../../../../../components/ui/button";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { Loader } from "lucide-react";
import { AlertCircle } from 'lucide-react';

const AddExpense = ({budgetId, user, refreshData, budgetInfo}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [Loading, setLoading] = useState(false);

  // Convert budgetInfo values to numbers and handle potential undefined values
  const totalSpend = Number(budgetInfo?.totalSpend || 0);
  const budgetAmount = Number(budgetInfo?.amount || 0);

  // Calculate remaining budget
  const remainingBudget = budgetAmount - totalSpend;

  // Check if adding the new expense would exceed the budget
  const wouldExceedBudget = (Number(amount) || 0) > remainingBudget;

  const addNewExpense = async () => {
    if (wouldExceedBudget) {
      toast.error("This expense would exceed your budget limit.", {
        icon: <AlertCircle className="text-red-500" />,
      });
      return;
    }

    setLoading(true);
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: moment().format("YYYY-MM-DD HH:mm"),
      createdBy: user.primaryEmailAddress?.emailAddress, // Add this line
    }).returning({insertedId: Expenses.id});
    setName("");
    setAmount("");
    
    if(result){
        refreshData();
        setLoading(false);
      toast.success("Expense added successfully", {
        style: {
          background: '#4CAF50',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        iconTheme: {
          primary: '#ffffff',
          secondary: '#4CAF50',
        },
        duration: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-5">
      <h2 className="text-xl font-bold">Add Expense</h2>
      {wouldExceedBudget && (
        <div className="mt-2 mb-4 text-red-500 flex items-center">
          <AlertCircle className="mr-2" size={16} />
          <span className="text-sm">This expense would exceed your budget limit.</span>
        </div>
      )}
      <div>
        <h2 className="text-white font-medium mb-2">Expense Name</h2>
        <Input
          placeholder="e.g groceries"
          onChange={(e) => setName(e.target.value.toLowerCase())}
          className="rounded-md text-black"
          value={name}
        />
      </div>
      <div>
        <h2 className="text-white font-medium mb-2">Expense Amount</h2>
        <Input
          placeholder="e.g 500"
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-md text-black"
          value={amount}
          type="number"
        />
      </div>
      <Button disabled={!name || !amount || Loading || wouldExceedBudget}
      onClick={()=>addNewExpense()}
       className="w-full mt-5">
        {Loading ? <Loader className="animate-spin" /> : "Add New Expense"}</Button>
      
    </div>
  );
};

export default AddExpense;
