"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "@/utils/constant";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";

const Form: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);
		console.log("Retrieved token:", storedToken);
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const payload = {
			name,
			description,
		};

		if (token) {
			axios
				.post(`${baseURL}/projects`, payload, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log("payload", payload);
					console.log("response", res.data);

					setIsLoading(false);
					toast.success(<p>Project created successfully</p>);

					// Clear the form
					setName("");
					setDescription("");
				})
				.catch((err) => {
					setIsLoading(false);
					toast.error(err?.response?.data?.message || "Something went wrong");
					console.log("error", err);
				});
		} else {
			setIsLoading(false);
			toast.error("No token found. Please log in.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4"
		>
			<Input
				type="text"
				label="Name of project"
				placeholder="What would you like to name your project?"
				labelPlacement={"outside"}
				variant="bordered"
				onChange={(e) => setName(e.target.value)}
				value={name}
				disabled={isLoading}
				required
				className={`${isLoading ? "opacity-50 pointer-events-none" : ""}`}
			/>

			<Input
				type="text"
				label="Description"
				placeholder="A little about the project"
				labelPlacement={"outside"}
				variant="bordered"
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				disabled={isLoading}
				required
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
					"Create"
				)}
			</Button>
		</form>
	);
};

export default Form;
