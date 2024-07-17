"use client";

import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@nextui-org/button";
import { Plus } from "lucide-react";
import axios from "axios";

interface Task {
	_id: string;
	name: string;
}

interface Column {
	_id: string;
	name: string;
	tasks: Task[];
}

interface ProjectResponse {
	columns: Column[];
}

const SortableItem = ({
	id,
	children,
}: {
	id: string;
	children: React.ReactNode;
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	);
};

const ProjectBody = ({ projectId }: { projectId: string }) => {
	const [columns, setColumns] = useState<Column[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Fetch initial columns and tasks
		const fetchColumns = async () => {
			try {
				const response = await axios.get<ProjectResponse>(
					`/api/projects/${projectId}`
				);
				setColumns(response.data.columns);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching columns:", error);
			}
		};

		fetchColumns();
	}, [projectId]);

	const handleAddColumn = async () => {
		const columnName = prompt("Enter column name:");
		if (!columnName) return;

		try {
			const response = await axios.post<ProjectResponse>(
				`/api/projects/${projectId}/columns`,
				{ columnName }
			);
			setColumns(response.data.columns);
		} catch (error) {
			console.error("Error adding column:", error);
		}
	};

	const handleAddTask = async (columnId: string) => {
		const taskName = prompt("Enter task name:");
		if (!taskName) return;

		try {
			const response = await axios.post<ProjectResponse>(
				`/api/projects/${projectId}/columns/${columnId}/tasks`,
				{ taskName }
			);
			setColumns(response.data.columns);
		} catch (error) {
			console.error("Error adding task:", error);
		}
	};

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = columns.findIndex((column) => column._id === active.id);
			const newIndex = columns.findIndex((column) => column._id === over.id);

			setColumns((columns) => arrayMove(columns, oldIndex, newIndex));
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<div className="flex items-center justify-between">
				<h2 className="font-medium text-[30px]">Project Name</h2>
				<Button
					color="primary"
					size="md"
					onClick={handleAddColumn}
				>
					<Plus /> Add column
				</Button>
			</div>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={columns}
					strategy={verticalListSortingStrategy}
				>
					<div className="grid grid-cols-4 gap-4">
						{columns.map((column) => (
							<SortableItem
								key={column._id}
								id={column._id}
							>
								<div className="border p-4">
									<h3>{column.name}</h3>
									<Button onClick={() => handleAddTask(column._id)}>
										Add Task
									</Button>
									{/* Render tasks here */}
								</div>
							</SortableItem>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default ProjectBody;
