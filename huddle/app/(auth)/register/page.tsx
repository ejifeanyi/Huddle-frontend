"use client";

import { useState } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import { EyeIcon, EyeOffIcon } from "lucide-react";

const page = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div className="flex flex-col items-center justify-center space-y-10 min-h-screen">
			<div className="flex flex-col items-center space-y-2">
				<h1 className="font-semibold text-3xl">Create Your Account</h1>
				<p className="text-xl text-[#707070]">Join Huddle</p>
			</div>
			<form className="flex flex-col gap-4 w-[350px]">
				<Input
					type="name"
					label="Name"
					placeholder="Enter your Firstname"
					labelPlacement={"outside"}
				/>

				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					labelPlacement={"outside"}
				/>

				<Input
					label="Password"
					placeholder="Enter your password"
					labelPlacement={"outside"}
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<EyeIcon className="text-2xl text-default-400 pointer-events-none" />
							) : (
								<EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
							)}
						</button>
					}
					type={isVisible ? "text" : "password"}
				/>
				<Button
					color="primary"
					radius="md"
					type="submit"
				>
					Create Account
				</Button>
			</form>
		</div>
	);
};

export default page;
