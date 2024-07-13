"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { baseURL } from "@/utils/constant";

interface Project {
	_id: string;
	name: string;
	description: string;
}

const ProjectsList = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		setToken(storedToken);

		const fetchProjects = async () => {
			try {
				if (storedToken) {
					const res = await axios.get(`${baseURL}/projects`, {
						headers: {
							Authorization: `Bearer ${storedToken}`,
						},
					});

					setProjects(res.data);
				}
			} catch (err) {
				setError("Failed to load projects");
				console.error("Error fetching projects:", err);
			} finally {
				setIsLoading(false);
			}
		};

		const interval = setInterval(() => {
			fetchProjects();
		}, 10000);

		fetchProjects();

		return () => clearInterval(interval);
	}, [token]);

	if (isLoading) {
		return <div>Loading projects...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="">
			<ul className="flex flex-col space-y-2">
				{projects.map((project) => (
					<li
						key={project._id}
						className="hover:bg-[#973FCF]/10 text-[#707070] hover:text-black bg-white cursor-pointer py-[10px] text-sm pl-10 font-medium hover:font-semibold"
					>
						{project.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProjectsList;
