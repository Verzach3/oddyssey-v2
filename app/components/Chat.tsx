import {
	Paper,
	ScrollArea,
	Stack,
	TextInput,
	Text,
} from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import { useChat } from "@ai-sdk/react";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<Stack h="100%" gap="md">
			<ScrollArea 
				h="calc(100vh - 300px)" 
				type="hover"
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.2)',
					borderRadius: '12px',
				}}
			>
				<Stack p="md" gap="lg" w="100%">
					<AnimatePresence>
						{messages.map((message) => (
							<motion.div
								key={message.id || crypto.randomUUID()}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								style={{
									width: "100%",
									display: "flex",
									justifyContent:
										message.role === "assistant" ? "flex-start" : "flex-end",
								}}
							>
								<Paper
									p="md"
									radius="lg"
									style={{
										backgroundColor:
											message.role === "assistant" 
												? "rgba(26, 35, 66, 0.9)" 
												: "rgba(66, 99, 235, 0.9)",
										maxWidth: "80%",
										width: "fit-content",
										boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
										border: "1px solid rgba(255,255,255,0.1)",
									}}
								>
									<Text
										c="white"
										style={{
											wordBreak: "break-word",
											whiteSpace: "pre-wrap",
											overflowWrap: "break-word",
											lineHeight: "1.5",
										}}
									>
										{message.content}
									</Text>
								</Paper>
							</motion.div>
						))}
					</AnimatePresence>
				</Stack>
			</ScrollArea>

			<Stack
				gap="xs"
				p="md"
				style={{ 
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					borderRadius: '12px',
					border: "1px solid rgba(255,255,255,0.1)"
				}}
			>
				<form onSubmit={handleSubmit}>
					<TextInput
						size="lg"
						value={input}
						onChange={handleInputChange}
						placeholder="Escribe tu mensaje..."
						radius="xl"
						styles={{
							input: {
								backgroundColor: "rgba(255, 255, 255, 0.1)",
								color: "white",
								border: "1px solid rgba(255,255,255,0.1)",
								"&::placeholder": {
									color: "rgba(255, 255, 255, 0.5)",
								},
								"&:focus": {
									borderColor: "rgba(66, 99, 235, 0.5)",
								}
							},
						}}
					/>
				</form>
			</Stack>
		</Stack>
	);
}
