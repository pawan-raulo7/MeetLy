import {
    useNavigate,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

    const navigate =
        useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate("/");
    };

    return (
        <div className="flex bg-black text-white min-h-screen">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64">

                {/* Top Navbar */}
                <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-black sticky top-0 z-40">

                    {/* Global Search */}
                    <div className="w-96">

                        <input
                            type="text"
                            placeholder="Search meetings, summaries, transcripts..."
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter" &&
                                    e.target.value.trim()
                                ) {

                                    navigate(
                                        `/meetings?search=${encodeURIComponent(
                                            e.target.value
                                        )}`
                                    );
                                }
                            }}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 outline-none focus:border-white transition"
                        />

                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-6">

                        {/* Notification */}
                        <button className="relative">

                            <span className="text-xl">
                                🔔
                            </span>

                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>

                        </button>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-sm hover:bg-white hover:text-black transition"
                        >
                            Logout
                        </button>

                        {/* User */}
                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-semibold">

                                {user?.name?.charAt(0) || "U"}

                            </div>

                            <div>

                                <p className="text-sm font-semibold">

                                    {user?.name || "User"}

                                </p>

                                <p className="text-xs text-gray-400">

                                    {user?.email || "user@email.com"}

                                </p>

                            </div>

                        </div>

                    </div>

                </header>

                {/* Page Content */}
                <div className="p-8">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;