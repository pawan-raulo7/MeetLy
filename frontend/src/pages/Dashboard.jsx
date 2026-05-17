import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import { getMeetings } from "../services/meetingService";

import { getTasks } from "../services/taskService";

function Dashboard() {

    const [meetings, setMeetings] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const meetingsData =
                    await getMeetings();

                const tasksData =
                    await getTasks();

                setMeetings(
                    meetingsData.meetings || []
                );

                setTasks(
                    tasksData.tasks || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

        fetchDashboardData();

    }, []);

    const pendingTasks =
        tasks.filter(
            (task) =>
                task.status === "pending"
        );

    const completedTasks =
        tasks.filter(
            (task) =>
                task.status === "completed"
        );

    const upcomingDeadlines =
        tasks.filter(
            (task) => task.dueDate
        );

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading Dashboard...
            </div>
        );
    }

    return (
        <DashboardLayout>

            {/* Page Header */}
            <div className="mb-10">

                <h1 className="text-4xl font-bold text-white">
                    Executive Dashboard
                </h1>

                <p className="text-gray-400 mt-3 text-lg">
                    Precision insights from your last 24 hours of synchronization.
                </p>

            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-12">

                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition">

                    <p className="text-gray-500 uppercase text-xs mb-4">
                        Total Meetings
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {meetings.length}
                    </h2>

                </div>

                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition">

                    <p className="text-gray-500 uppercase text-xs mb-4">
                        Total Tasks
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {tasks.length}
                    </h2>

                </div>

                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition">

                    <p className="text-gray-500 uppercase text-xs mb-4">
                        Pending Tasks
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {pendingTasks.length}
                    </h2>

                </div>

                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition">

                    <p className="text-gray-500 uppercase text-xs mb-4">
                        Completed
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {completedTasks.length}
                    </h2>

                </div>

                <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition">

                    <p className="text-gray-500 uppercase text-xs mb-4">
                        Upcoming Deadlines
                    </p>

                    <h2 className="text-4xl font-bold text-white">
                        {upcomingDeadlines.length}
                    </h2>

                </div>

            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                {/* Tasks Table */}
                <section className="xl:col-span-8">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-semibold text-white">
                            Recent Tasks
                        </h2>

                        <button className="text-sm text-gray-400 hover:text-white">
                            View All Tasks
                        </button>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl overflow-hidden">

                        <table className="w-full">

                            <thead className="border-b border-zinc-900 bg-zinc-950">

                                <tr className="text-left">

                                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                                        Task Name
                                    </th>

                                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                                        Priority
                                    </th>

                                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-xs uppercase text-gray-500">
                                        Due Date
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {tasks.slice(0, 5).map((task) => (

                                    <tr
                                        key={task.id}
                                        className="border-b border-zinc-900 hover:bg-zinc-950 transition"
                                    >

                                        <td className="px-6 py-5">
                                            {task.task}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="px-3 py-1 rounded-full border border-zinc-700 text-xs">
                                                {task.priority}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="text-sm text-gray-300 capitalize">
                                                {task.status}
                                            </span>

                                        </td>

                                        <td className="px-6 py-5 text-gray-400">

                                            {task.dueDate
                                                ? new Date(task.dueDate)
                                                    .toLocaleDateString()
                                                : "No deadline"}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </section>

                {/* Recent Meetings */}
                <section className="xl:col-span-4">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-semibold text-white">
                            Recent Meetings
                        </h2>

                        <button className="text-sm text-gray-400 hover:text-white">
                            History
                        </button>

                    </div>

                    <div className="space-y-5">

                        {meetings.slice(0, 3).map((meeting) => (

                            <div
                                key={meeting.id}
                                className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-5 hover:bg-[#141414] transition"
                            >

                                <div className="flex justify-between items-start mb-4">

                                    <h3 className="font-semibold text-white">
                                        {meeting.title}
                                    </h3>

                                    <span className="text-xs border border-zinc-700 rounded-full px-2 py-1">
                                        AI
                                    </span>

                                </div>

                                <p className="text-gray-400 leading-relaxed text-sm border-l border-zinc-800 pl-4 line-clamp-4">

                                    {meeting.summary}

                                </p>

                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-zinc-900 text-xs text-gray-500">

                                    <span>
                                        {new Date(
                                            meeting.createdAt
                                        ).toLocaleDateString()}
                                    </span>

                                    <button className="text-white hover:underline">
                                        Details
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;