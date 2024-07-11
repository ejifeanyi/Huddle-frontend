"use client";

import { logOut } from "@/utils/auth";
import { LogOut } from "lucide-react";

import CreateProjectModal from "./CreateProjectModal";
import ProjectsList from "./ProjectsList";

const Sidebar = () => {
	const handleLogout = () => {
		logOut(); // Call the logout function to remove the authentication token
		window.location.href = "/login"; // Redirect to the login screen
	};

	return (
		<div className="pt-8 pb-20 border-l-gray-400 border shadow-sm  w-[260px] min-h-screen flex flex-col justify-between">
			{/* logo and projects */}
			<div>
				<p className="font-bold ml-10 mb-14">Huddle</p>

				<CreateProjectModal />

				<ProjectsList />
			</div>

			{/* logout button */}
			<p
				onClick={handleLogout}
				className="flex items-center gap-2 font-medium hover:bg-[#973FCF]/10 text-[#707070] hover:text-black py-[10px] bg-white pl-10 cursor-pointer"
			>
				<span>{<LogOut />}</span>
				Log out
			</p>
		</div>
	);
};

export default Sidebar;
