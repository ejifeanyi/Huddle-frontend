import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DndContext = ({ children, onDragEnd }: any) => {
	return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DndContext;
