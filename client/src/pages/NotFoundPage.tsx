import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
            <div className="max-w-xl text-center space-y-6">
                <div className="flex justify-center">
                    <AlertTriangle className="h-16 w-16 text-red-500" />
                </div>

                <h1 className="text-7xl font-bold">404</h1>

                <h2 className="text-2xl font-semibold">
                    This endpoint appears to be DOWN.
                </h2>

                <p className="text-zinc-400">
                    The resource you're looking for could not be reached or
                    does not exist.
                </p>

                <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-left">
                    <p>
                        <span className="text-zinc-500">
                            Status:
                        </span>{" "}
                        RESOURCE_NOT_FOUND
                    </p>

                    <p>
                        <span className="text-zinc-500">
                            Error Code:
                        </span>{" "}
                        APIG-404
                    </p>

                    <p>
                        <span className="text-zinc-500">
                            Last Health Check:
                        </span>{" "}
                        Failed
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black"
                    >
                        <Home size={18} />
                        Dashboard
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}