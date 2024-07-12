"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Checkbox } from "@nextui-org/react";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import { baseURL } from "@/utils/constant";
import { isLogin, setAuthentication } from "@/utils/auth";

const RegisterPage = () => {
	const [firstname, setFirstname] = useState<string>("");
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
				} else {
					setIsCheckingAuth(false);
				}
			} catch (error) {
				console.error("Error checking login status:", error);
				setIsCheckingAuth(false);
			}
		};

		authenticate();
	}, [router]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const payload = {
			firstname,
			email,
			password,
		};

		try {
			const res = await axios.post(`${baseURL}/users/register`, payload);
			setAuthentication(res.data.token);
			setIsLoading(false);
			toast.success(
				<div>
					Account Created Successfully <br /> Please Login in
				</div>
			);
			// Clear the form
			setFirstname("");
			setEmail("");
			setPassword("");

			// push to login after registration
			router.push("/login");
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || "Registration failed";
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
				<h1 className="font-semibold text-3xl">Create Your Account</h1>
				<p className="text-lg text-[#707070]">
					We're thrilled to have you here at huddle
				</p>
			</div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 w-[350px]"
			>
				<Input
					type="name"
					label="Name"
					placeholder="Enter your Firstname"
					labelPlacement={"outside"}
					variant="bordered"
					onChange={(e) => setFirstname(e.target.value)}
					value={firstname}
					disabled={isLoading}
					required
					className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
				/>

				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					labelPlacement={"outside"}
					variant="bordered"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					disabled={isLoading}
					required
					className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
				/>

				<Input
					label="Password"
					placeholder="Enter your password"
					labelPlacement={"outside"}
					variant="bordered"
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
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					disabled={isLoading}
					required
					className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
				/>

				<div className="flex py-2 px-1 justify-between">
					<Checkbox
						classNames={{
							label: "text-small",
						}}
					>
						Remember me
					</Checkbox>
					<Link
						color="primary"
						href="#"
					>
						Forgot password?
					</Link>
				</div>

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
						"Create Account"
					)}
				</Button>
			</form>

			<p className="text-lg text-[#707070] mt-8">
				Already have an account?{" "}
				<Link
					href="/login"
					className="text-blue-500"
				>
					Login
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
