import {
    LoginLink,
    RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import WidthWrapper from "./WidthWrapper";

const Navbar = () => {

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-white/75 dark:bg-background backdrop-blur-lg transition-all">
            <WidthWrapper>
                <div className="flex h-14 items-center justify-between border-b">
                    <Link href="/" className="flex z-40 font-semibold px-4">
                        <span className="text-xl px-3">huddl.</span>
                    </Link>
                    <div className="hidden items-center space-x-4 sm:flex">
                        {/* <ModeToggle /> */}
                        <>
                                {/* <Link
                                    href="/pricing"
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Pricing
                                </Link> */}
                                <LoginLink
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Sign in
                                </LoginLink>
                                <RegisterLink
                                    className={buttonVariants({
                                        size: "sm",
                                    })}
                                >
                                    Get started{" "}
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </RegisterLink>
                            </>
                    </div>
                </div>
            </WidthWrapper>
        </nav>
    );
};

export default Navbar;
