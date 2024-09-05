import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, BotMessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../../../_components/Logo'
import SearchBar from '../../../_components/SearchBar'

const SideNav = () => {
    const menuList = [
        {
            id: 1,
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard",
        },
        {
            id: 2,
            name: "Budget",
            icon: PiggyBank,
            path: "/dashboard/budgets",
        },
        {
            id: 3,
            name: "Expenses",
            icon: ReceiptText,
            path: "/dashboard/expenses",
        },
        {
            id: 4,
            name: "Chat AI",
            icon: BotMessageSquare,
            path: "/dashboard/chatai",
        }
    ]
    const path = usePathname();
    const router = useRouter();

    const handleSearch = async (searchTerm) => {
        if (searchTerm.trim()) {
            router.push(`/dashboard/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className='hidden md:flex flex-col h-screen p-5 border-r shadow-sm'>
            <div className="mb-6">
                <Logo />
            </div>
            <div className="mb-6">
                <SearchBar onSearch={handleSearch} />
            </div>
            <div className='flex-1'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <div className={`flex gap-2 items-center text-gray-500 mt-4 cursor-pointer hover:text-primary font-medium p-5 rounded-md hover:bg-blue-100 mb-2 ${path === menu.path ? "text-primary bg-blue-100" : ""}`}>
                            <menu.icon/>
                            {menu.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex items-center gap-2 mt-10 cursor-pointer'>
                <UserButton afterSignOutUrl="/"/>
                Profile
            </div>
        </div>
    )
}

export default SideNav