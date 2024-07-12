"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { baseURL } from "@/utils/constant";

interface Project {
	id: number;
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
				if (token) {
					const res = await axios.get(`${baseURL}/projects`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});

					// Access projects using array methods
					const projectNames = res.data.map((project: any) => project.name);
					if (projectNames.length > 0) {
						setProjects(projectNames);
					}
				}
			} catch (err) {
				setError("Failed to load projects");
				console.error("Error fetching projects:", err);
			} finally {
				setIsLoading(false);
			}
		};

		if (token) {
			fetchProjects();
		} else {
			setIsLoading(false);
		}
	}, [token]);

	if (isLoading) {
		return <div>Loading projects...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h2>Projects List</h2>
		</div>
	);
};

export default ProjectsList;
