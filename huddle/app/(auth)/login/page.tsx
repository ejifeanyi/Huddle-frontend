"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { baseURL } from "@/utils/constant";
import { isLogin, setAuthentication } from "@/utils/auth";

const Page = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true); // New state for auth check

	const toggleVisibility = () => setIsVisible(!isVisible);

	const router = useRouter();

	useEffect(() => {
		const authenticate = async () => {
			try {
				if (await isLogin()) {
					router.push("/dashboard");
				}
			} catch (error) {
				console.error("Error checking login status:", error);
			} finally {
				setIsCheckingAuth(false);
			}
		};

		authenticate();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const payload = {
			email,
			password,
		};

		try {
			const res = await axios.post(`${baseURL}/users/login`, payload);
			setAuthentication(res.data.token);
			toast.success("Login Successful");

			setEmail("");
			setPassword("");

			router.push("/dashboard");
		} catch (error: any) {
			const errorMessage = error?.response?.data?.message || "Login failed";
			toast.error(errorMessage);
			console.log("error", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isCheckingAuth) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spinner
					color="primary"
					size="lg"
				/>
			</div>
		);
	}

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

export default Page;
