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
import { Lock } from "lucide-react";
import { eq, sql } from "drizzle-orm";

function CreateBudget({refreshData}) {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [emojiIcon, setEmojiIcon] = useState("💼");
	const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
	const [Loading, setLoading] = useState(false);
	const { user } = useUser();
	const [budgetCount, setBudgetCount] = useState(0);

	useEffect(() => {
		const fetchBudgetCount = async () => {
			if (user) {
				const result = await db
					.select({ count: sql`count(*)` })
					.from(Budgets)
					.where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress));
				setBudgetCount(result[0].count);
			}
		};
		fetchBudgetCount();
	}, [user]);

	const addNewBudget = async () => {
		if (budgetCount >= 3) {
			toast.error("Free users can only create up to 3 budgets. Please upgrade to create more.");
			return;
		}

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
				<Button className="bg-blue-600 hover:bg-blue-700">Create New Budget</Button>
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
							disabled={!name || !amount || Loading || budgetCount >= 3}
							onClick={addNewBudget}
							>
							{Loading ? "Creating..." : "Create Budget"}
						</Button>
					</DialogClose>
				</DialogFooter>
				{budgetCount >= 3 && (
					<div className="mt-4 text-center text-sm text-red-500 flex items-center justify-center">
						<Lock className="w-4 h-4 mr-2" />
						Free users can only create up to 3 budgets. Please upgrade to create more.
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default CreateBudget;
