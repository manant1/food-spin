import React from "react";

export interface ButtonProps {
    icon?: () => JSX.Element;
    title?: string;
    className?: string;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {
    const Icon = props.icon ?? (() => <></>);

    return <button className={`rounded-[70px] text-white px-6 py-3 bg-primary hover:opacity-50 transition-opacity duration-700 ${props.className}`} onClick={props.onClick}><Icon/>{props.title}</button>
}

export default Button;