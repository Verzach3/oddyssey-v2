import { Button, Paper, ScrollArea, Stack, TextInput, Text } from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface Message {
  content: string;
  isAi: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      content: inputValue,
      isAi: false,
      timestamp: new Date()
    }]);
    
    // Simulated AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: "This is a simulated AI response",
        isAi: true,
        timestamp: new Date()
      }]);
    }, 1000);
    
    setInputValue("");
  };

  return (
    <Stack h="100%" gap="md">
      <ScrollArea h="calc(100vh - 300px)" type="hover">
        <Stack p="md" gap="lg" w="100%">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: message.isAi ? "flex-start" : "flex-end"
                }}
              >
                <Paper
                  p="md"
                  radius="lg"
                  style={{
                    backgroundColor: message.isAi ? "#1a2342" : "#4263eb",
                    maxWidth: "80%",
                    width: "fit-content"
                  }}
                >
                  <Text 
                    c="white" 
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word"
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

      <Stack gap="xs" p="md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} >
        <TextInput
          size="lg"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Escribe tu mensaje..."
          radius="xl"
          rightSection={
            <Button
              onClick={handleSendMessage}
              radius="xl"
              color="#1a2342"
              disabled={!inputValue.trim()}
            >
              Enviar
            </Button>
          }
          styles={{
            input: {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: 'white',
              border: 'none',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.5)'
              }
            }
          }}
        />
      </Stack>
    </Stack>
  );
}
