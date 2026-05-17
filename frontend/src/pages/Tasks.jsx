import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getTasks,
    updateTask,
} from "../services/taskService";

function Tasks() {

    const [tasks, setTasks] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [updatingTaskId,
        setUpdatingTaskId] =
        useState(null);

    const fetchTasks = async () => {

        try {

            const data =
                await getTasks();

            setTasks(
                data.tasks || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleStatusChange =
        async (
            taskId,
            newStatus
        ) => {

            try {

                setUpdatingTaskId(
                    taskId
                );

                const progress =
                    newStatus ===
                        "completed"
                        ? 100
                        : newStatus ===
                            "in-progress"
                            ? 50
                            : 0;

                await updateTask(
                    taskId,
                    {
                        status:
                            newStatus,
                        progress,
                    }
                );

                fetchTasks();

            } catch (error) {

                console.log(error);

            } finally {

                setUpdatingTaskId(
                    null
                );

            }
        };

    const handleProgressChange =
        async (
            taskId,
            progress
        ) => {

            try {

                setUpdatingTaskId(
                    taskId
                );

                const status =
                    progress === 100
                        ? "completed"
                        : progress > 0
                            ? "in-progress"
                            : "pending";

                await updateTask(
                    taskId,
                    {
                        progress,
                        status,
                    }
                );

                fetchTasks();

            } catch (error) {

                console.log(error);

            } finally {

                setUpdatingTaskId(
                    null
                );

            }
        };

    const completedTasks =
        tasks.filter(
            (task) =>
                task.status ===
                "completed"
        );

    const inProgressTasks =
        tasks.filter(
            (task) =>
                task.status ===
                "in-progress"
        );

    const pendingTasks =
        tasks.filter(
            (task) =>
                task.status ===
                "pending"
        );

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading Tasks...
            </div>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

                    <div>

                        <h1 className="text-4xl font-bold text-white">
                            Tasks Management
                        </h1>

                        <p className="text-gray-400 mt-3 max-w-2xl text-lg">
                            Track AI-generated action items, progress updates, and workflow execution.
                        </p>

                    </div>

                    <button className="bg-white text-black px-5 py-3 rounded-xl font-semibold hover:scale-[1.02] transition">
                        + Create Manual Task
                    </button>

                </div>

                {/* Analytics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-4">
                            Total Tasks
                        </p>

                        <h2 className="text-4xl font-bold">
                            {tasks.length}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-4">
                            Completed
                        </p>

                        <h2 className="text-4xl font-bold">
                            {completedTasks.length}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-4">
                            In Progress
                        </p>

                        <h2 className="text-4xl font-bold">
                            {inProgressTasks.length}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-4">
                            Pending
                        </p>

                        <h2 className="text-4xl font-bold">
                            {pendingTasks.length}
                        </h2>

                    </div>

                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* Tasks Table */}
                    <div className="xl:col-span-8">

                        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl overflow-hidden">

                            <table className="w-full">

                                <thead className="bg-zinc-950 border-b border-zinc-900">

                                    <tr className="text-left">

                                        <th className="px-6 py-5 text-xs uppercase text-gray-500">
                                            Task
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase text-gray-500">
                                            Owner
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase text-gray-500">
                                            Priority
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-5 text-xs uppercase text-gray-500">
                                            Progress
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {tasks.map(
                                        (task) => (

                                            <tr
                                                key={
                                                    task.id
                                                }
                                                className="border-b border-zinc-900 hover:bg-zinc-950 transition"
                                            >

                                                {/* Task */}
                                                <td className="px-6 py-6">

                                                    <div>

                                                        <p className="font-semibold text-white">
                                                            {
                                                                task.task
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Meeting ID:
                                                            {" "}
                                                            {
                                                                task.meetingId
                                                            }
                                                        </p>

                                                    </div>

                                                </td>

                                                {/* Owner */}
                                                <td className="px-6 py-6">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm">
                                                            {task.owner?.charAt(
                                                                0
                                                            )}
                                                        </div>

                                                        <span className="text-gray-300">
                                                            {
                                                                task.owner
                                                            }
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* Priority */}
                                                <td className="px-6 py-6">

                                                    <span className={`px-3 py-1 rounded-full text-xs border
                                                        ${task.priority ===
                                                            "High"
                                                            ? "border-red-500 text-red-400"
                                                            : task.priority ===
                                                                "Medium"
                                                                ? "border-yellow-500 text-yellow-400"
                                                                : "border-green-500 text-green-400"
                                                        }
                                                    `}>

                                                        {
                                                            task.priority
                                                        }

                                                    </span>

                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-6">

                                                    <select
                                                        value={
                                                            task.status
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleStatusChange(
                                                                task.id,
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        className="bg-black border border-zinc-800 rounded-lg px-3 py-2 outline-none"
                                                    >

                                                        <option value="pending">
                                                            Pending
                                                        </option>

                                                        <option value="in-progress">
                                                            In Progress
                                                        </option>

                                                        <option value="completed">
                                                            Completed
                                                        </option>

                                                    </select>

                                                </td>

                                                {/* Progress */}
                                                <td className="px-6 py-6">

                                                    <div className="w-52">

                                                        <div className="flex justify-between mb-2 text-sm">

                                                            <span className="text-gray-400">
                                                                {
                                                                    task.progress
                                                                }
                                                                %
                                                            </span>

                                                            {updatingTaskId ===
                                                                task.id && (

                                                                    <span className="text-gray-500">
                                                                        Updating...
                                                                    </span>

                                                                )}

                                                        </div>

                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={
                                                                task.progress
                                                            }
                                                            onChange={(
                                                                e
                                                            ) =>
                                                                handleProgressChange(
                                                                    task.id,
                                                                    Number(
                                                                        e
                                                                            .target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                            className="w-full"
                                                        />

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* AI Insights Sidebar */}
                    <div className="xl:col-span-4 space-y-6">

                        {/* AI Insights */}
                        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                            <h3 className="text-xl font-semibold mb-6">
                                AI Insights
                            </h3>

                            <div className="space-y-5 border-l border-zinc-800 pl-5">

                                <div>

                                    <p className="text-white leading-relaxed">
                                        Task completion velocity improved this week.
                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        AI recommendation: prioritize pending high-priority tasks.
                                    </p>

                                </div>

                                <div>

                                    <p className="text-white leading-relaxed">
                                        {pendingTasks.length}
                                        {" "}
                                        tasks still require execution.
                                    </p>

                                    <p className="text-sm text-gray-500 mt-2">
                                        Workflow bottlenecks detected in backend-related tasks.
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Recent Activity */}
                        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                            <h3 className="text-xl font-semibold mb-6">
                                Recent Activity
                            </h3>

                            <div className="space-y-6">

                                {tasks
                                    .slice(0, 5)
                                    .map((task) => (

                                        <div
                                            key={
                                                task.id
                                            }
                                            className="border-l border-zinc-800 pl-4"
                                        >

                                            <p className="text-white leading-relaxed">
                                                {
                                                    task.owner
                                                }
                                                {" "}
                                                updated
                                                {" "}
                                                <span className="font-semibold">
                                                    {
                                                        task.task
                                                    }
                                                </span>
                                            </p>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Status:
                                                {" "}
                                                {
                                                    task.status
                                                }
                                            </p>

                                        </div>

                                    ))}

                            </div>

                        </div>

                    </div>

                </div>

                {/* Empty State */}
                {tasks.length === 0 && (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            No tasks available yet
                        </h2>

                        <p className="text-gray-500">
                            Generate tasks from meeting summaries.
                        </p>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

export default Tasks;