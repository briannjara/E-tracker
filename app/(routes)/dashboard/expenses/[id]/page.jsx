"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { desc, eq, getTableColumns, sql, and } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { BudgetItem } from "../../budgets/_components/BudgetItem";
import AddExpense from "./../_components/AddExpense";
import ExpenseListTable from "./../_components/ExpenseListTable";
import { Button } from "../../../../../@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../../@/components/ui/alert-dialog";
import { cn } from "../../../../../lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "./../_components/EditBudget";

const ExpensesScreen = ({ params }) => {
  const { user, isLoaded } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      getBudgetInfo();
    }
  }, [isLoaded, user, params.id]);

  // get latest
  const getExpensesList = async () => {
    if (!user) return;
    
    const result = await db
      .select({
        expenses: Expenses,
        budgets: Budgets
      })
      .from(Expenses)
      .innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
      .where(
        and(
          eq(Expenses.budgetId, params.id),
          eq(Expenses.createdBy, user.primaryEmailAddress?.emailAddress),
          eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress)
        )
      )
      .orderBy(desc(Expenses.id));

    setExpensesList(result.map(r => r.expenses));
  };

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`,
          totalItem: sql`count(${Expenses.id})`,
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      if (result.length === 0) {
        // Budget not found or doesn't belong to the user
        router.push("/dashboard/budgets");
        return;
      }

      setBudgetInfo(result[0]);
      getExpensesList();
    } catch (error) {
      console.error("Error fetching budget info:", error);
    }
  };

  // delete budget
  const deleteBudget = async () => {
    const deleteExpenseResult= await db.delete(Expenses)
    .where(eq(Expenses.budgetId, params.id)).returning();

    if(deleteExpenseResult){
      const result = await db.delete(Budgets).where(eq(Budgets.id, params.id))
      .returning();
    }
    toast.error("Budget deleted", {
      description: "Your budget and all associated expenses have been permanently removed.",
      icon: <Trash className="h-5 w-5" />,
    });
    router.push("/dashboard/budgets");
  };

  const handleDeleteExpense = (deletedExpenseId) => {
    setExpensesList(prevList => prevList.filter(expense => expense.id !== deletedExpenseId));
    if (budgetInfo) {
      const deletedExpense = expensesList.find(e => e.id === deletedExpenseId);
      if (deletedExpense) {
        setBudgetInfo(prevInfo => ({
          ...prevInfo,
          totalSpend: Number(prevInfo.totalSpend) - Number(deletedExpense.amount),
          totalItem: prevInfo.totalItem - 1
        }));
      }
    }
  };

  if (!isLoaded || !user) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (!budgetInfo) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">Budget not found or you don't have permission to view it.</div>;
  }

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col text-white">
      <div className="flex-grow p-4 sm:p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">My Expenses</h2>
          <div className="flex gap-2">
            <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()}/>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex gap-2">
                  <Trash />
                  <span className="hidden sm:inline">Delete</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="fixed inset-0 flex items-center justify-center z-50">
                <div className={cn(
                  "fixed inset-0 bg-gray-500/75 transition-opacity",
                  isAlertOpen ? "opacity-100" : "opacity-0"
                )} />
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 max-w-md w-full mx-4 relative z-10">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                      This action cannot be undone. This will permanently delete your current budget and all its expenses.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="space-x-2 mt-6">
                    <AlertDialogCancel className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteBudget()}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            <BudgetItem budget={budgetInfo} />
          </div>
          <div className="order-1 lg:order-2">
            <AddExpense
              budgetId={params.id}
              user={user}
              refreshData={() => getBudgetInfo()}
              budgetInfo={budgetInfo}
            />
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Latest Expenses</h2>
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getBudgetInfo}
            onDeleteExpense={handleDeleteExpense}
            userEmail={user.primaryEmailAddress?.emailAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesScreen;
