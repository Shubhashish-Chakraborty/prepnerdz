import { HomeLanding } from "@/components/pages/Landing";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <HomeLanding />
            <div style={{ marginTop: 24 }}>
                <Link href="/todo">
                    <button style={{ padding: "12px 24px", background: "#0070f3", color: "#fff", borderRadius: 6, border: "none" }}>
                        📋 Go to To-Do List
                    </button>
                </Link>
            </div>
        </>
    );
}