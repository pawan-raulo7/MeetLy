import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import {
    getMeetings,
    createMeeting,
    uploadTranscript,
    searchMeetings,
} from "../services/meetingService";

function Meetings() {

    const navigate =
        useNavigate();

    const [searchParams] =
        useSearchParams();

    const [meetings, setMeetings] =
        useState([]);

    const [transcript, setTranscript] =
        useState("");

    const [title, setTitle] =
        useState("");

    const [selectedFile, setSelectedFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [pageLoading, setPageLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [searchQuery, setSearchQuery] =
        useState("");

    const fetchMeetings =
        async () => {

            try {

                setPageLoading(true);

                const data =
                    await getMeetings();

                setMeetings(
                    data.meetings || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setPageLoading(false);

            }
        };

    const handleSearch =
        async (query) => {

            try {

                setPageLoading(true);

                setSearchQuery(query);

                if (!query.trim()) {

                    await fetchMeetings();

                    return;
                }

                const data =
                    await searchMeetings(
                        query
                    );

                setMeetings(
                    data.meetings || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setPageLoading(false);

            }
        };

    useEffect(() => {

        const search =
            searchParams.get(
                "search"
            );

        if (search) {

            handleSearch(search);

        } else {

            fetchMeetings();
        }

    }, [searchParams]);

    const handleGenerateSummary =
        async () => {

            if (!title || !transcript) {

                return setError(
                    "Please enter title and transcript"
                );
            }

            try {

                setLoading(true);

                setError("");

                await createMeeting({
                    title,
                    transcript,
                });

                setTitle("");

                setTranscript("");

                fetchMeetings();

            } catch (error) {

                setError(
                    error.response?.data
                        ?.message ||
                    "Failed to generate summary"
                );

            } finally {

                setLoading(false);

            }
        };

    const handleFileUpload =
        async () => {

            if (!selectedFile) {

                return setError(
                    "Please select a file"
                );
            }

            try {

                setLoading(true);

                setError("");

                const formData =
                    new FormData();

                formData.append(
                    "transcript",
                    selectedFile
                );

                await uploadTranscript(
                    formData
                );

                setSelectedFile(null);

                fetchMeetings();

            } catch (error) {

                setError(
                    error.response?.data
                        ?.message ||
                    "Upload failed"
                );

            } finally {

                setLoading(false);

            }
        };

    const totalTasks = meetings.reduce(
        (acc, meeting) => {

            const taskCount =
                meeting.summary?.match(
                    /Task:/g
                )?.length || 0;

            return acc + taskCount;

        },
        0
    );

    if (pageLoading) {

        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading Meetings...
            </div>
        );
    }

    return (
        <DashboardLayout>

            <div className="space-y-12">

                {/* Header */}
                <section>

                    <h1 className="text-4xl font-bold text-white mb-3">
                        Meetings Workspace
                    </h1>

                    <p className="text-gray-400 text-lg max-w-3xl">
                        Upload transcripts or paste meeting conversations to generate AI-powered summaries and action items.
                    </p>

                </section>

                {/* Analytics */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-3">
                            Total Meetings
                        </p>

                        <h2 className="text-4xl font-bold">
                            {meetings.length}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-3">
                            Tasks Extracted
                        </p>

                        <h2 className="text-4xl font-bold">
                            {totalTasks}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-3">
                            AI Summaries
                        </p>

                        <h2 className="text-4xl font-bold">
                            {meetings.length}
                        </h2>

                    </div>

                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6">

                        <p className="text-xs uppercase text-gray-500 mb-3">
                            Uploaded Files
                        </p>

                        <h2 className="text-4xl font-bold">
                            {meetings.length}
                        </h2>

                    </div>

                </section>

                {/* Error */}
                {error && (

                    <div className="bg-red-500/10 border border-red-500 text-red-400 px-5 py-4 rounded-2xl">
                        {error}
                    </div>

                )}

                {/* Input Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Paste Transcript */}
                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 flex flex-col">

                        <h2 className="text-2xl font-semibold mb-6">
                            Paste Meeting Transcript
                        </h2>

                        <input
                            type="text"
                            placeholder="Meeting title..."
                            value={title}
                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }
                            className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 mb-5 outline-none focus:border-white"
                        />

                        <textarea
                            placeholder="Paste meeting transcript..."
                            value={transcript}
                            onChange={(e) =>
                                setTranscript(
                                    e.target.value
                                )
                            }
                            className="w-full min-h-[260px] bg-black border border-zinc-800 rounded-xl p-4 outline-none focus:border-white resize-none"
                        />

                        <button
                            onClick={
                                handleGenerateSummary
                            }
                            disabled={loading}
                            className="mt-6 bg-white text-black py-4 rounded-xl font-semibold hover:scale-[1.01] transition"
                        >

                            {loading
                                ? "Generating..."
                                : "Generate AI Summary"}

                        </button>

                    </div>

                    {/* Upload Transcript */}
                    <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 flex flex-col">

                        <h2 className="text-2xl font-semibold mb-6">
                            Upload Transcript
                        </h2>

                        <label className="flex-1 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-center p-10 hover:border-white transition cursor-pointer">

                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center mb-5 text-3xl">
                                📄
                            </div>

                            <p className="text-lg font-medium mb-2">
                                Drag and drop transcript
                            </p>

                            <p className="text-sm text-gray-500 mb-4">
                                Supports .txt files
                            </p>

                            <input
                                type="file"
                                accept=".txt"
                                hidden
                                onChange={(e) =>
                                    setSelectedFile(
                                        e.target.files[0]
                                    )
                                }
                            />

                            {selectedFile && (

                                <p className="text-sm text-white mt-2">
                                    {selectedFile.name}
                                </p>

                            )}

                        </label>

                        <button
                            onClick={
                                handleFileUpload
                            }
                            disabled={loading}
                            className="mt-6 bg-zinc-900 border border-zinc-800 text-white py-4 rounded-xl font-semibold hover:bg-zinc-800 transition"
                        >

                            {loading
                                ? "Uploading..."
                                : "Upload Transcript"}

                        </button>

                    </div>

                </section>

                {/* Meeting History */}
                <section>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

                        <h2 className="text-3xl font-semibold">
                            Meeting History
                        </h2>

                        <input
                            type="text"
                            placeholder="Search meetings..."
                            value={searchQuery}
                            onChange={(e) =>
                                handleSearch(
                                    e.target.value
                                )
                            }
                            className="bg-black border border-zinc-800 rounded-xl px-5 py-3 outline-none focus:border-white w-full lg:w-96"
                        />

                    </div>

                    {meetings.length === 0 ? (

                        <div className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl py-24 text-center">

                            <div className="text-6xl mb-6">
                                🤖
                            </div>

                            <h3 className="text-2xl font-semibold mb-3">
                                No meetings found
                            </h3>

                            <p className="text-gray-500">
                                Try another search keyword.
                            </p>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                            {meetings.map(
                                (meeting) => (

                                    <div
                                        key={meeting.id}
                                        className="bg-[#0a0a0a] border border-zinc-900 rounded-2xl p-6 hover:bg-[#141414] transition"
                                    >

                                        <div className="flex items-start justify-between mb-5">

                                            <div>

                                                <h3 className="text-2xl font-semibold mb-2">
                                                    {meeting.title}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {new Date(
                                                        meeting.createdAt
                                                    ).toLocaleString()}
                                                </p>

                                            </div>

                                            <span className="text-xs border border-zinc-700 rounded-full px-3 py-1">
                                                AI
                                            </span>

                                        </div>

                                        <div className="border-l border-zinc-800 pl-4 mb-6">

                                            <p className="text-gray-400 leading-relaxed line-clamp-6 whitespace-pre-line">
                                                {meeting.summary}
                                            </p>

                                        </div>

                                        <div className="flex items-center justify-between pt-5 border-t border-zinc-900">

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/meetings/${meeting.id}`
                                                    )
                                                }
                                                className="text-white hover:underline"
                                            >
                                                View Details
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/meetings/${meeting.id}`
                                                    )
                                                }
                                                className="text-gray-400 hover:text-white"
                                            >
                                                Open →
                                            </button>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </section>

            </div>

        </DashboardLayout>
    );
}

export default Meetings;