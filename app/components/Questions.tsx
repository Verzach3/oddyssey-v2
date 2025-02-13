import React, { useState, Suspense } from "react";
import useSWR from "swr";
import { Button, Group, Stack, Title, Progress } from "@mantine/core";
import { motion, AnimatePresence } from "motion/react";
import type { Question } from "../data/questions";
import { LoadingAnimation } from './LoadingAnimation';

// Función fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface QuestionsProps {
  question: Question;
  progress: number;
  onAnswer: (questionId: number, answer: string) => void;
  onComplete: () => void;
}

function QuestionsInner({ onComplete, onAnswer }: QuestionsProps) {
  // Se llama a la API que retorna un arreglo de preguntas con id, question y options
  const { data: questions } = useSWR<{ id: number; question: string; options: string[] }[]>("/api/generate-questions", fetcher, { suspense: true });
  // Verifica que las preguntas existan
  if (!questions || questions.length === 0) {
    return <div style={{ color: "white", textAlign: "center" }}>No hay preguntas disponibles</div>;
  }
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQuestion = questions[currentQuestionIdx];
  const progress = currentQuestionIdx / questions.length;

  const handleAnswer = (value: string) => {
    onAnswer(currentQuestion.id, value);
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Fin del cuestionario: se notifica al componente padre
      onComplete();
    }
  };

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
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <Stack>
            {/* Se muestra la pregunta usando la clave "question" */}
            <Title ta={"center"} c={"white"} size={"3rem"} style={{ wordWrap: "break-word" }}>
              {currentQuestion.question}
            </Title>
            <Group gap="md" wrap="wrap" justify="center">
              {currentQuestion.options.map((option) => (
                <motion.div
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="xl"
                    radius={"xl"}
                    variant="filled"
                    color="#1a2342"
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
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

export default function Questions({ onComplete, onAnswer, question, progress }: QuestionsProps) {
  return (
    <Suspense fallback={
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <LoadingAnimation 
          text="Preparando las preguntas..." 
          messages={[
            "Preparando el cuestionario...",
            "Cargando las preguntas...",
            "Casi listo para empezar...",
            "Personalizando la experiencia..."
          ]}
        />
      </motion.div>
    }>
      <QuestionsInner onComplete={onComplete} onAnswer={onAnswer} question={question} progress={progress} />
    </Suspense>
  );
}
