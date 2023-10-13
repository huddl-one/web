"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = () => {
    const router = useRouter();

    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    trpc.auth.authCallback.useQuery(undefined, {
        onSuccess: (data) => {
            // The user is synced with the our db
            if (data.success) {
                router.push(origin ? `/${origin}` : "/dashboard");
            }
        },
        onError: (err) => {
            if (err.data?.code === "UNAUTHORIZED") {
                router.push("/");
            }
        },
        retry: 3,
        retryDelay: 500,
    });

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <section className="flex flex-col gap-3 items-center ">
                <Loader2 className="w-10 h-10 animate-spin" />
                <h1 className="text-lg">Verifying your Account....</h1>
                <p className="text-sm">You will be automatically reloaded</p>
            </section>
        </div>
    );
};

export default Page;
