import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            const data = await loginUser(formData);

            // Save token
            localStorage.setItem(
                "token",
                data.token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">

            {/* Left Section */}
            <div className="hidden md:flex w-1/2 bg-black relative overflow-hidden items-center justify-center px-16">

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#222_1px,transparent_1px),linear-gradient(to_right,#222_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Glow */}
                <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-lg">

                    <h1 className="text-6xl font-bold tracking-tight mb-6">
                        AI Meeting Manager
                    </h1>

                    <p className="text-gray-400 text-lg leading-relaxed">
                        AI-powered meeting summaries, task extraction,
                        and workflow management for modern teams.
                    </p>

                    {/* Info Card */}
                    <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                                AI
                            </div>

                            <div>

                                <h3 className="font-semibold text-lg">
                                    Intelligence First
                                </h3>

                                <p className="text-sm text-gray-400">
                                    Real-time AI processing
                                </p>

                            </div>
                        </div>

                        <div className="space-y-4 text-sm text-gray-300">

                            <div className="flex justify-between">
                                <span>Accuracy Rate</span>
                                <span>99.8%</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Task Extraction</span>
                                <span>Instant</span>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex w-full md:w-1/2 items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    <div className="mb-10">

                        <h2 className="text-4xl font-bold mb-3">
                            Welcome Back
                        </h2>

                        <p className="text-gray-400">
                            Login to continue managing meetings and tasks.
                        </p>

                    </div>

                    {/* Form */}
                    <form
                        className="space-y-6"
                        onSubmit={handleSubmit}
                    >

                        {/* Email */}
                        <div>

                            <label className="block mb-2 text-sm text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <div className="flex items-center justify-between mb-2">

                                <label className="text-sm text-gray-300">
                                    Password
                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-gray-400 hover:text-white"
                                >
                                    Forgot Password?
                                </button>

                            </div>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
                            />

                        </div>

                        {/* Remember */}
                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                className="w-4 h-4"
                            />

                            <p className="text-sm text-gray-400">
                                Remember me
                            </p>

                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-500 text-sm">
                                {error}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">

                        <div className="flex-1 h-px bg-zinc-800"></div>

                        <span className="text-sm text-gray-500">
                            OR
                        </span>

                        <div className="flex-1 h-px bg-zinc-800"></div>

                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-4">

                        <button className="bg-zinc-900 border border-zinc-800 rounded-xl py-3 hover:bg-zinc-800 transition">
                            Google
                        </button>

                        <button className="bg-zinc-900 border border-zinc-800 rounded-xl py-3 hover:bg-zinc-800 transition">
                            SSO
                        </button>

                    </div>

                    {/* Register */}
                    <p className="text-center text-gray-400 mt-8">

                        Don't have an account?{" "}

                        <button
                            onClick={() => navigate("/register")}
                            className="text-white font-semibold hover:underline"
                        >
                            Register
                        </button>

                    </p>

                </div>
            </div>
        </div>
    );
}

export default Login;