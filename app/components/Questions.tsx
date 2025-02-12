import { Button, Group, Stack, Title, Progress } from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import type { Question } from "../data/questions";

interface QuestionsProps {
  question: Question;
  onAnswer: (value: string) => void;
  progress: number;
}

export default function Questions({ question, onAnswer, progress }: QuestionsProps) {
  return (
    <Stack w="100%" maw={800} mx="auto">
      <div style={{ padding: '0 4px' }}>
        <Progress 
          value={progress * 100} 
          size="md" 
          radius="xl"
          color="blue.5"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }}
          styles={{
            section: {
              transition: 'width 0.3s ease-in-out',
              background: 'linear-gradient(90deg, #4263eb 0%, #00d2ff 100%)',
            }
          }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Stack>
            <Title ta={"center"} c={"white"} size={"3rem"} style={{ wordWrap: "break-word" }}>
              {question.title}
            </Title>
            <Group gap="md" wrap="wrap" justify="center">
              {question.answers.map((answer) => (
                <motion.div
                  key={answer.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    radius={"xl"}
                    variant="filled"
                    color="#1a2342"
                    onClick={() => onAnswer(answer.value)}
                  >
                    {answer.label}
                  </Button>
                </motion.div>
              ))}
            </Group>
          </Stack>
        </motion.div>
      </AnimatePresence>
    </Stack>
  );
}
