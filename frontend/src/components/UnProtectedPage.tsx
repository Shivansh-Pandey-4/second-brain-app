import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UnProtectedPage({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard", { replace: true });
            return;
        }

        setIsLoading(false);

    }, []);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="flex items-center gap-2 text-2xl">
                    Loading...
                    <Loader2 className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <>
            {children}
        </>
    )
}