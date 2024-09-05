import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, MessageSquare, LogOut } from 'lucide-react'
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
            icon: MessageSquare,
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
        <div className='hidden md:flex flex-col h-screen bg-gray-900 text-white p-6 w-64 overflow-hidden'>
            <div className="mb-8">
                <Logo />
            </div>
            <div className="mb-8">
                <SearchBar onSearch={handleSearch} />
            </div>
            <nav className='flex-1 overflow-y-auto'>
                {menuList.map((menu) => (
                    <Link href={menu.path} key={menu.id}>
                        <div className={`flex items-center space-x-3 text-gray-300 py-3 px-4 rounded-lg transition-colors duration-200 ${
                            path === menu.path 
                                ? "bg-blue-600 text-white" 
                                : "hover:bg-gray-800"
                        }`}>
                            <menu.icon className="w-5 h-5" />
                            <span className="font-medium">{menu.name}</span>
                        </div>
                    </Link>
                ))}
            </nav>
            <div className='mt-auto'>
                <div className='flex items-center space-x-4 mb-4 p-4 bg-gray-800 rounded-lg'>
                    <UserButton afterSignOutUrl="/" />
                    <div>
                        <p className="text-sm font-medium">Your Profile</p>
                        <p className="text-xs text-gray-400">Manage your account</p>
                    </div>
                </div>
                <button 
                    onClick={() => router.push('/')} 
                    className='flex items-center space-x-3 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 w-full'
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>
            </div>
        </div>
    )
}

export default SideNav