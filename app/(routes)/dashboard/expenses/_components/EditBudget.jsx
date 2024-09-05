"use client";
import React, { useState, useEffect } from "react";
import Button from "../../../../../components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../../../../../@/components/ui/dialog";
import { cn } from "../../../../../lib/utils";
import { Input } from "../../../../../@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../../../../utils/dbConfig";
import { eq } from "drizzle-orm";
import { Budgets } from "../../../../../utils/schema";
import { toast } from "sonner";

function EditBudget({ budgetInfo,refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budgetInfo?.name);
  const [amount, setAmount] = useState(budgetInfo?.amount);

  useEffect(() => {
    setEmojiIcon(budgetInfo?.icon);
    setName(budgetInfo?.name);
    setAmount(budgetInfo?.amount);
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({ name: name, amount: amount, icon: emojiIcon })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast.success("Budget updated successfully", {
        style: {
          background: '#4CAF50',
          color: '#ffffff',
          border: 'none',
        },
        icon: '✅',
        duration: 3000,
      });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent
          className={cn(
            "max-w-md w-full mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6",
            "bg-white z-50" // Add background color and z-index
          )}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6">
              {" "}
              Edit Budget
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-6">
                <div className="relative">
                  <Button
                    variant="outline"
                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                    className="text-2xl p-2"
                  >
                    {emojiIcon}
                  </Button>
                  {openEmojiPicker && (
                    <div className="absolute z-10 mt-2">
                      <EmojiPicker
                        onEmojiClick={(e) => {
                          setEmojiIcon(e.emoji);
                          setOpenEmojiPicker(false);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-black font-medium mb-2">Budget Name</h2>
                  <Input
                    placeholder="e.g Home Decor"
                    onChange={(e) => setName(e.target.value)}
                    defaultValue={budgetInfo?.name}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h2 className="text-black font-medium mb-2">Budget Cost</h2>
                  <Input
                    placeholder="e.g ksh.500"
                    onChange={(e) => setAmount(e.target.value)}
                    defaultValue={budgetInfo?.amount}
                    type="number"
                    className="rounded-md"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="w-full rounded-md"
                disabled={!name || !amount}
                onClick={() => onUpdateBudget()}
              >
                {" "}
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
