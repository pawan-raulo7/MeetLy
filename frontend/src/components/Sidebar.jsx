import { Link, useLocation } from "react-router-dom";

function Sidebar() {

    const location = useLocation();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: "📊",
        },
        {
            name: "Meetings",
            path: "/meetings",
            icon: "🎤",
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: "✅",
        },
    ];

    return (
        <aside className="w-64 bg-black border-r border-zinc-900 fixed h-screen flex flex-col justify-between">

            {/* Top */}
            <div>

                {/* Logo */}
                <div className="px-8 py-8 border-b border-zinc-900">

                    <h1 className="text-2xl font-bold text-white">
                        AI Meeting Manager
                    </h1>

                    <p className="text-gray-500 text-sm mt-2">
                        Productivity Workspace
                    </p>

                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">

                    {navItems.map((item) => (

                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${location.pathname ===
                                    item.path
                                    ? "bg-white text-black"
                                    : "text-gray-400 hover:bg-zinc-900 hover:text-white"
                                }`}
                        >

                            <span>
                                {item.icon}
                            </span>

                            <span className="font-medium">
                                {item.name}
                            </span>

                        </Link>

                    ))}

                </nav>

            </div>

            {/* Bottom User Section */}
            <div className="p-5 border-t border-zinc-900">

                <div className="bg-zinc-900 rounded-2xl p-4">

                    <p className="text-gray-400 text-sm mb-2">
                        Logged in as
                    </p>

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center font-semibold">
                            {user?.name?.charAt(0)}
                        </div>

                        <div>

                            <p className="font-semibold text-white">
                                {user?.name || "User"}
                            </p>

                            <p className="text-xs text-gray-500">
                                {user?.email}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;