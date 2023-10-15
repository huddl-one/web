import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import UserAccountNav from "./UserAccountNav";
import WidthWrapper from "./WidthWrapper";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
    const { getUser } = getKindeServerSession();
    const user = getUser();

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b bg-white/75 dark:bg-background backdrop-blur-lg transition-all">
            <WidthWrapper>
                <div className="flex h-14 items-center justify-between border-b">
                    <Link href="/" className="flex flex-col items-center z-40 font-semibold px-4">
                    <p className="text-xl">huddl. </p>
                    <p className="text-[10px] text-primary">[ admin portal ]</p>
                    </Link>
                    <div className="hidden items-center space-x-4 sm:flex">
                        {/* <ModeToggle /> */}
                        {!user ? (
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
                        ) : (
                            <>
                                {/* For testing */}
                                {/* <UserAccountNav
                                    name={"pendi"}
                                    email={"pendi@wroks"}
                                    imageUrl={""}
                                /> */}
                                <UserAccountNav
                                    name={
                                        !user.given_name || !user.family_name
                                            ? "Your Account"
                                            : `${user.given_name} ${user.family_name}`
                                    }
                                    email={user.email ?? ""}
                                    imageUrl={user.picture ?? ""}
                                />
                            </>
                        )}
                    </div>
                </div>
            </WidthWrapper>
        </nav>
    );
};

export default Navbar;
