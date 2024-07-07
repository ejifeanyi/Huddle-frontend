"use client";

import { Button } from "@nextui-org/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

interface Project {
	id: number;
	name: string;
}

const Sidebar = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [nextProjectId, setNextProjectId] = useState<number>(1);

	const addProject = () => {
		const newProjectName = prompt("Enter project name:");
		if (newProjectName) {
			const newProject: Project = {
				id: nextProjectId,
				name: newProjectName,
			};
			setProjects([...projects, newProject]);
			setNextProjectId(nextProjectId + 1);
		}
	};
	return (
		<div className="pt-8 pb-20 shadow-xl w-[260px] min-h-screen flex flex-col justify-between">
			{/* logo and projects */}
			<div>
				<p className="font-bold ml-10 mb-14">Huddle</p>
				<Button
					color="primary"
					onClick={addProject}
					className="ml-10 mb-10"
				>
					Create New Project
				</Button>
				{projects.map((project) => (
					<p
						key={project.id}
						className="font-medium hover:bg-[#973FCF]/10 text-[#707070] hover:text-black py-[10px] bg-white pl-10 mb-1 cursor-pointer"
					>
						{project.name}
					</p>
				))}
			</div>

			{/* logout button */}
			<p className="flex items-center gap-2 font-medium hover:bg-[#973FCF]/10 text-[#707070] hover:text-black py-[10px] bg-white pl-10 cursor-pointer">
				<span>{<LogOut />}</span>
				Log out
			</p>
		</div>
	);
};

export default Sidebar;
