import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from "@nextui-org/react";

import Form from "./Form";

const CreateProjectModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				size="md"
				// onClick={addProject}
				className="ml-10 mb-10"
			>
				New Project
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Create a new project
							</ModalHeader>
							<ModalBody>
								<Form />
							</ModalBody>
							<ModalFooter></ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateProjectModal;
