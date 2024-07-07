"use client";

import * as React from "react";
import { NextUIProvider as Provider } from "@nextui-org/react";

interface NextUiProviderProps {
	children: React.ReactNode;
}

const NextUiProvider: React.FC<NextUiProviderProps> = ({ children }) => {
	return <Provider>{children}</Provider>;
};

export default NextUiProvider;
