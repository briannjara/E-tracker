"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter, DialogClose } from "../../../../../@/components/ui/dialog";
import { Button } from "../../../../../@/components/ui/button";
import { Input } from "../../../../../@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { db } from "../../../../../utils/dbConfig";
import { useUser } from "@clerk/nextjs";
import { Budgets } from "../../../../../utils/schema";
import { toast } from "sonner";
import { cn } from "../../../../../lib/utils";

function CreateBudget({refreshData}) {

  const [emojiIcon, setEmojiIcon] = useState("😂");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const {user} = useUser();
  const onCreateBudget = async () => {
    const result = await db.insert(Budgets).values({
      name: name,
      amount: amount,
      icon: emojiIcon,
      createdBy: user?.primaryEmailAddress.emailAddress,
    }).returning({insertedId: Budgets.id});

    if(result){
      refreshData();
      toast.success("Budget created successfully", {
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
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-lg items-center flex flex-col border-2 border-dashed cursor-pointer hover:shadow-md transition-shadow duration-300">
            <h2 className="text-4xl mb-2">+</h2>
            <h2 className="text-lg font-medium">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent className={cn(
          "max-w-md w-full mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6",
          "bg-white z-50" // Add background color and z-index
        )}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-6">Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="space-y-6">
                <div className="relative">
                  <Button variant="outline" onClick={() => setOpenEmojiPicker(!openEmojiPicker)} className="text-2xl p-2">
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
                    placeholder="e.g HOME DECOR"
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                    className="rounded-md"
                    value={name}
                  />
                </div>
                <div>
                  <h2 className="text-black font-medium mb-2">Budget Cost</h2>
                  <Input
                    placeholder="e.g ksh.500"
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    className="rounded-md"
                  />
                </div>
                
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button className="w-full rounded-md"
                disabled={!name || !amount}
                onClick={() => onCreateBudget()}
                >Create Budget</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
