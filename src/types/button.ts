import { ReactNode } from "react";

export type ButtonProps = {
    text?: string;
    url?: string;
    onClick?: () => void;
    icon?: ReactNode;
    className?: string;
};