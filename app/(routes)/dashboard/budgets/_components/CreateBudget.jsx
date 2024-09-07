"use client";
import React, { useState, useEffect } from "react";
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
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [emojiIcon, setEmojiIcon] = useState("💼");
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
	const [Loading, setLoading] = useState(false);
	const { user } = useUser();

	const addNewBudget = async () => {
		setLoading(true);
		try {
			await db.insert(Budgets).values({
				name: name,
				amount: amount,
				icon: emojiIcon,
				createdBy: user.primaryEmailAddress?.emailAddress,
			});
			toast.success("Budget created successfully");
			refreshData();
			setName("");
			setAmount("");
			setEmojiIcon("💼");
		} catch (error) {
			console.error(error);
			toast.error("An error occurred while creating the budget");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full h-[175px] bg-slate-700 hover:bg-blue-900 text-white text-xl font-semibold rounded-lg shadow-md transition-colors duration-200">
					<span className="flex flex-col items-center justify-center">
						<span className="text-4xl mb-2">+</span>
						Create New Budget
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className={cn(
				"max-w-md w-full mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6",
				"bg-white z-50"
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
							disabled={!name || !amount || Loading}
							onClick={addNewBudget}
							>
							{Loading ? "Creating..." : "Create Budget"}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default CreateBudget;
