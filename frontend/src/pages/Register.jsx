import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {

            setLoading(true);

            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex bg-black text-white overflow-hidden">

            {/* LEFT SECTION */}
            <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black flex-col p-16 justify-between border-r border-zinc-900">

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                {/* Top Branding */}
                <div className="relative z-10">

                    <div className="flex items-center gap-3 mb-8">

                        <h1 className="text-4xl font-bold tracking-tight">
                            MeetLy
                        </h1>

                    </div>

                    <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                        AI-powered meeting summaries, smart task extraction,
                        and workflow automation designed for modern teams.
                    </p>

                </div>

                {/* Bottom Card */}
                <div className="relative z-10 flex flex-col gap-8">

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl max-w-md">

                        <div className="flex items-center gap-4 mb-6">

                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                                ✨
                            </div>

                            <div>

                                <h3 className="text-xl font-semibold">
                                    Intelligence First
                                </h3>

                                <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">
                                    Enterprise Protocol
                                </p>

                            </div>
                        </div>

                        <div className="space-y-5">

                            <div className="flex gap-4">

                                <div className="w-[1px] bg-zinc-700"></div>

                                <div>

                                    <p className="text-white">
                                        Auto-Extraction Active
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        AI detected 3 action items from meetings.
                                    </p>

                                </div>
                            </div>

                            <div className="flex gap-4">

                                <div className="w-[1px] bg-zinc-700"></div>

                                <div>

                                    <p className="text-white">
                                        Semantic Search Ready
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Scanning transcript intelligence instantly.
                                    </p>

                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Team Section */}
                    <div className="flex items-center gap-4 text-gray-400">

                        <div className="flex -space-x-3">

                            <div className="w-9 h-9 rounded-full bg-zinc-700 border-2 border-black"></div>

                            <div className="w-9 h-9 rounded-full bg-zinc-600 border-2 border-black"></div>

                            <div className="w-9 h-9 rounded-full bg-zinc-500 border-2 border-black"></div>

                        </div>

                        <span className="text-sm">
                            Trusted by modern engineering teams
                        </span>

                    </div>

                </div>

                {/* Glow */}
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-[100px]"></div>

            </section>

            {/* RIGHT SECTION */}
            <main className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-[#0e0e0e]">

                <div className="w-full max-w-[460px]">

                    {/* Mobile Branding */}
                    <div className="lg:hidden text-center mb-10">

                        <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-xl mx-auto mb-4">
                            AI
                        </div>

                        <h1 className="text-4xl font-bold">
                            AI Meeting Manager
                        </h1>

                        <p className="text-gray-500 mt-3">
                            AI-powered meeting intelligence.
                        </p>

                    </div>

                    {/* Register Card */}
                    <div className="bg-[#131313] border border-zinc-900 p-8 rounded-2xl">

                        <header className="mb-8">

                            <h2 className="text-3xl font-bold mb-2">
                                Create Account
                            </h2>

                            <p className="text-gray-500">
                                Enter your details to start automating workflows.
                            </p>

                        </header>

                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit}
                        >

                            {/* Full Name */}
                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Pawan Raulo"
                                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
                                />

                            </div>

                            {/* Email */}
                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Email Address *
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="pawan@example.com"
                                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-white transition"
                                />

                            </div>

                            {/* Password */}
                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Password *
                                </label>

                                <div className="relative">

                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 pr-12 outline-none focus:border-white transition"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        👁
                                    </button>

                                </div>

                                {/* Strength */}
                                <div className="mt-3">

                                    <div className="flex gap-1.5 h-1">

                                        <div className="flex-1 bg-white rounded-full"></div>

                                        <div className="flex-1 bg-white rounded-full"></div>

                                        <div className="flex-1 bg-white rounded-full"></div>

                                        <div className="flex-1 bg-zinc-800 rounded-full"></div>

                                    </div>

                                    <p className="text-xs text-gray-500 mt-2 text-right">
                                        Strength: Strong
                                    </p>

                                </div>

                            </div>

                            {/* Confirm Password */}
                            <div>

                                <label className="block text-sm text-gray-400 mb-2">
                                    Confirm Password *
                                </label>

                                <div className="relative">

                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 pr-12 outline-none focus:border-white transition"
                                    />

                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        👁
                                    </button>

                                </div>

                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">

                                <input
                                    type="checkbox"
                                    className="mt-1 w-4 h-4"
                                />

                                <p className="text-sm text-gray-500 leading-relaxed">
                                    I agree to the{" "}

                                    <button
                                        type="button"
                                        className="text-white hover:underline"
                                    >
                                        Terms & Conditions
                                    </button>

                                    {" "}and{" "}

                                    <button
                                        type="button"
                                        className="text-white hover:underline"
                                    >
                                        Privacy Policy
                                    </button>

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
                                className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition"
                            >
                                {loading ? "Creating..." : "Create Account"}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="relative my-8">

                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-800"></div>
                            </div>

                            <div className="relative flex justify-center">
                                <span className="bg-[#131313] px-4 text-xs uppercase tracking-widest text-gray-500">
                                    OR
                                </span>
                            </div>

                        </div>

                        {/* Social */}
                        <div className="grid grid-cols-2 gap-4">

                            <button className="bg-black border border-zinc-800 py-3 rounded-xl hover:bg-zinc-900 transition">
                                Google
                            </button>

                            <button className="bg-black border border-zinc-800 py-3 rounded-xl hover:bg-zinc-900 transition">
                                GitHub
                            </button>

                        </div>

                        {/* Footer */}
                        <footer className="mt-8 text-center">

                            <p className="text-gray-500">

                                Already have an account?{" "}

                                <button
                                    onClick={() => navigate("/")}
                                    className="text-white font-semibold hover:underline"
                                >
                                    Sign In
                                </button>

                            </p>

                        </footer>

                    </div>

                    {/* Bottom Links */}
                    <div className="mt-8 flex justify-center gap-6 text-xs text-gray-500">

                        <button className="hover:text-white transition">
                            Support
                        </button>

                        <button className="hover:text-white transition">
                            Status
                        </button>

                        <button className="hover:text-white transition">
                            Legal
                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Register;