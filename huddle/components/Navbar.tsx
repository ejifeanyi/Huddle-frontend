"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { baseURL } from "@/utils/constant";

import { Search } from "lucide-react";

import { Avatar } from "@nextui-org/avatar";

interface User {
	_id: string;
	firstname: string;
	email: string;
	role: string;
}

const Navbar = () => {
	const [user, setUser] = useState<User | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const storedToken = localStorage.getItem("token");
				if (storedToken) {
					const res = await axios.get(`${baseURL}/users/user`, {
						headers: {
							Authorization: `Bearer ${storedToken}`,
						},
					});
					setUser(res.data);
				}
			} catch (error) {
				console.error("Error fetching user:", error);
			}
		};

		fetchUser();
	}, []);

	const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Handle search functionality here
		console.log("Search query:", searchQuery);
	};

	return (
		<div className="flex items-center py-5 pr-8">
			<div className="flex items-center gap-40 flex-1">
				<p className="font-semibold text-xl">Hi {user?.firstname}</p>

				{/* Todo: Implement global search for anything (project or tasks) */}
				<form
					className="flex items-center gap-2 px-3 py-2 border border-1-[#707070]/40 rounded-xl"
					onSubmit={handleSearchSubmit}
				>
					<Search className="text-sm text-[#707070]" />
					<input
						type="text"
						placeholder="Search"
						className="focus:outline-none outline-none w-[300px] text-sm text-[#707070] placeholder:text-[#707070]/40"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</form>
			</div>

			<Avatar name={user?.firstname} />
		</div>
	);
};

export default Navbar;
