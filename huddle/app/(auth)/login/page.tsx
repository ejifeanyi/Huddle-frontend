"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { baseURL } from "@/utils/constant";
import { setAuthentication } from "@/utils/auth";

const page = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const router = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();
		setIsLoading(true);

		const payload = {
			email,
			password,
		};
		console.log(payload);

		axios
			.post(`${baseURL}/users/login`, payload)
			.then((res) => {
				console.log("payload", payload);
				console.log(res.data);
				setAuthentication(res.data.token); // Setting authentication token in local storage
				toast.success("Login Successful"); // Showing success toast notification

				// Clear the form
				setEmail("");
				setPassword("");

				router.push("/dashboard"); // Redirecting to homepage after successful login
			})
			.catch((err) => {
				setIsLoading(false);
				toast.error(err?.response?.data?.message); // Showing error toast notification if login fails
				console.log("error", err);
			});
	};

	return (
		<div className="flex flex-col items-center justify-center space-y-10 min-h-screen">
			<div className="flex flex-col items-center space-y-2">
				<h1 className="font-semibold text-3xl">Welcome back 😁</h1>
				<p className="text-xl text-[#707070]">We're excited to see you again</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[350px]"
			>
				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					labelPlacement={"outside"}
					value={email}
					disabled={isLoading}
					required
					onChange={(e) => setEmail(e.target.value)}
					className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
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
					value={password}
					disabled={isLoading}
					required
					onChange={(e) => setPassword(e.target.value)}
					className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
				/>
				<Button
					color="primary"
					radius="md"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? (
						<Spinner
							color="white"
							size="sm"
						/>
					) : (
						"Login"
					)}
				</Button>
			</form>

			<p className="text-lg text-[#707070] mt-8">
				Don't have an account?{" "}
				<Link
					href="/register"
					className="text-blue-500"
				>
					Sign up
				</Link>
			</p>
		</div>
	);
};

export default page;
