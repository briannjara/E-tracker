import { UserButton } from '@clerk/nextjs'
import { LayoutGrid, PiggyBank, ReceiptText, MessageSquare, LogOut, ShieldPlus, Lock } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Logo from '../../../_components/Logo'
import SearchBar from '../../../_components/SearchBar'

const SideNav = () => {
    const pathname = usePathname()
    const router = useRouter()

    const menuList = [
        { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { name: "Budget", icon: PiggyBank, path: "/dashboard/budgets" },
        { name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
        { name: "Chat AI", icon: MessageSquare, path: "/dashboard/chatai" },
        { name: "Upgrade", icon: ShieldPlus, path: "/dashboard/upgrade" }
    ]

    const handleSearch = async (searchTerm) => {
        if (searchTerm.trim()) {
            router.push(`/dashboard/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className='hidden md:flex flex-col h-screen bg-gray-900 text-white w-64 p-5'>
            <div className='flex items-center gap-2 mb-10'>
                <Logo />
                {/* Removed the redundant FinanSmart text */}
            </div>
            <div className='mb-10'>
                <SearchBar onSearch={handleSearch} />
            </div>
            <nav className='flex-grow'>
                <ul className='space-y-2'>
                    {menuList.map((item, index) => (
                        <li key={index}>
                            <Link 
                                href={item.path}
                                className={`flex items-center gap-4 p-2 rounded-lg ${pathname === item.path ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='mt-auto flex items-center gap-4 text-gray-300 hover:text-white cursor-pointer'>
                <LogOut size={20} />
                <span>Logout</span>
            </div>
            <div className='mt-4'>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}

export default SideNav