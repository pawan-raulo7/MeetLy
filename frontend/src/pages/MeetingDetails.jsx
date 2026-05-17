import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getMeetingById,
} from "../services/meetingService";

import {
    updateTask,
} from "../services/taskService";

function MeetingDetails() {

    const { id } = useParams();

    const navigate =
        useNavigate();

    const [meeting, setMeeting] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const fetchMeeting =
        async () => {

            try {

                const data =
                    await getMeetingById(
                        id
                    );

                setMeeting(
                    data.meeting
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }
        };

    useEffect(() => {
        fetchMeeting();
    }, [id]);

    const handleTaskProgress =
        async (
            taskId,
            progress
        ) => {

            try {

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

                fetchMeeting();

            } catch (error) {

                console.log(error);

            }
        };

    if (loading) {

        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading Meeting...
            </div>
        );
    }

    if (!meeting) {

        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Meeting not found
            </div>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-10">

                {/* Header */}
                <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">

                    <div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center gap-4 mb-6">

                            <button
                                onClick={() =>
                                    navigate(
                                        "/dashboard"
                                    )
                                }
                                className="text-gray-400 hover:text-white transition border border-zinc-800 px-4 py-2 rounded-xl hover:bg-zinc-900"
                            >
                                ← Dashboard
                            </button>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/meetings"
                                    )
                                }
                                className="text-gray-400 hover:text-white transition border border-zinc-800 px-4 py-2 rounded-xl hover:bg-zinc-900"
                            >
                                Meetings
                            </button>

                        </div>

                        <div className="flex items-center gap-4 mb-4">

                            <h1 className="text-5xl font-bold">
                                {meeting.title}
                            </h1>

                            <span className="border border-zinc-700 rounded-full px-4 py-1 text-sm">
                                AI Generated
                            </span>

                        </div>

                        <p className="text-gray-500 text-lg">
                            {new Date(
                                meeting.createdAt
                            ).toLocaleString()}
                        </p>

                    </div>

                    <div className="flex gap-4">

                        <button className="border border-zinc-800 px-5 py-3 rounded-xl hover:bg-zinc-900 transition">
                            Share
                        </button>

                        <button className="border border-zinc-800 px-5 py-3 rounded-xl hover:bg-zinc-900 transition">
                            Export
                        </button>

                    </div>

                </div>

                {/* Main Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

                    {/* Main Column */}
                    <div className="xl:col-span-8 space-y-8">

                        {/* Executive Summary */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-8">

                            <div className="flex items-center justify-between mb-8">

                                <div>

                                    <p className="text-xs uppercase text-gray-500 mb-3">
                                        Executive Summary
                                    </p>

                                    <h2 className="text-3xl font-semibold">
                                        AI Meeting Intelligence
                                    </h2>

                                </div>

                                <div className="text-right">

                                    <p className="text-xs uppercase text-gray-500 mb-2">
                                        Sentiment
                                    </p>

                                    <h3 className="text-2xl font-semibold">
                                        High Efficiency
                                    </h3>

                                </div>

                            </div>

                            <div className="border-l border-zinc-800 pl-6">

                                <p className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
                                    {meeting.summary}
                                </p>

                            </div>

                        </section>

                        {/* Action Items */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl overflow-hidden">

                            <div className="p-8 border-b border-zinc-900 flex justify-between items-center">

                                <div>

                                    <p className="text-xs uppercase text-gray-500 mb-2">
                                        Tasks
                                    </p>

                                    <h2 className="text-3xl font-semibold">
                                        Extracted Action Items
                                    </h2>

                                </div>

                                <p className="text-gray-500">
                                    {meeting.Tasks?.length || 0}
                                    {" "}
                                    Tasks
                                </p>

                            </div>

                            <div className="overflow-x-auto">

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
                                                Progress
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {meeting.Tasks?.map(
                                            (
                                                task
                                            ) => (

                                                <tr
                                                    key={
                                                        task.id
                                                    }
                                                    className="border-b border-zinc-900 hover:bg-zinc-950 transition"
                                                >

                                                    <td className="px-6 py-6">

                                                        <p className="font-medium">
                                                            {
                                                                task.task
                                                            }
                                                        </p>

                                                    </td>

                                                    <td className="px-6 py-6 text-gray-400">

                                                        {
                                                            task.owner
                                                        }

                                                    </td>

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

                                                    <td className="px-6 py-6">

                                                        <div className="w-56">

                                                            <div className="flex justify-between mb-2">

                                                                <span className="text-sm text-gray-400">
                                                                    {
                                                                        task.progress
                                                                    }
                                                                    %
                                                                </span>

                                                                <span className="text-sm text-gray-500">
                                                                    {
                                                                        task.status
                                                                    }
                                                                </span>

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
                                                                    handleTaskProgress(
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

                        </section>

                        {/* Transcript */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl overflow-hidden">

                            <div className="p-8 border-b border-zinc-900">

                                <p className="text-xs uppercase text-gray-500 mb-2">
                                    Transcript
                                </p>

                                <h2 className="text-3xl font-semibold">
                                    Smart Transcript Viewer
                                </h2>

                            </div>

                            <div className="p-8 max-h-[600px] overflow-y-auto">

                                <div className="border-l border-zinc-800 pl-6">

                                    <p className="text-gray-300 whitespace-pre-line leading-relaxed text-lg">
                                        {
                                            meeting.transcript
                                        }
                                    </p>

                                </div>

                            </div>

                        </section>

                    </div>

                    {/* Sidebar */}
                    <div className="xl:col-span-4 space-y-8">

                        {/* Productivity */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-8">

                            <p className="text-xs uppercase text-gray-500 mb-3">
                                Productivity Score
                            </p>

                            <h2 className="text-7xl font-bold mb-4">
                                94%
                            </h2>

                            <p className="text-gray-400">
                                AI detected high meeting efficiency and strong execution alignment.
                            </p>

                        </section>

                        {/* AI Insights */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-8">

                            <p className="text-xs uppercase text-gray-500 mb-5">
                                AI Insights
                            </p>

                            <div className="space-y-6">

                                <div className="border-l border-zinc-800 pl-4">

                                    <h3 className="font-semibold mb-2">
                                        Execution Risk
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        Backend optimization tasks still require attention before deployment.
                                    </p>

                                </div>

                                <div className="border-l border-zinc-800 pl-4">

                                    <h3 className="font-semibold mb-2">
                                        Team Alignment
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        Team collaboration and ownership distribution appear balanced.
                                    </p>

                                </div>

                                <div className="border-l border-zinc-800 pl-4">

                                    <h3 className="font-semibold mb-2">
                                        Recommended Next Step
                                    </h3>

                                    <p className="text-gray-400 leading-relaxed">
                                        Begin integration testing after pending API optimization completes.
                                    </p>

                                </div>

                            </div>

                        </section>

                        {/* Timeline */}
                        <section className="bg-[#0a0a0a] border border-zinc-900 rounded-3xl p-8">

                            <p className="text-xs uppercase text-gray-500 mb-5">
                                Timeline Extraction
                            </p>

                            <div className="space-y-5">

                                {meeting.Tasks?.map(
                                    (
                                        task
                                    ) => (

                                        <div
                                            key={
                                                task.id
                                            }
                                            className="flex items-center justify-between border-b border-zinc-900 pb-4"
                                        >

                                            <div>

                                                <h3 className="font-medium mb-1">
                                                    {
                                                        task.task
                                                    }
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {task.dueDate
                                                        ? new Date(
                                                            task.dueDate
                                                        ).toLocaleDateString()
                                                        : "No deadline"}
                                                </p>

                                            </div>

                                            <div className="w-3 h-3 rounded-full bg-white"></div>

                                        </div>

                                    )
                                )}

                            </div>

                        </section>

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default MeetingDetails;