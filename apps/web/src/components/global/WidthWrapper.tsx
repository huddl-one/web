import { ReactNode } from "react";

import { cn } from "@huddl/utils";

const WidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(`mx-auto w-full max-w-[1920px] px-2.5 md:px-20`, className)}
    >
      {children}
    </div>
  );
};

export default WidthWrapper;
