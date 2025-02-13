"use client";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Button,
  Group,
  Image,
  Stack,
  Title,
} from "@mantine/core";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Questions from "./components/Questions";
import Chat from "./components/Chat";
import { questions } from "./data/questions";

export default function HomePage() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <AppShell
        header={{
          height: 60,
        }}
      >
        <AppShellHeader
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          <Group justify="space-between" mx={"20rem"}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" radius={"xl"} color={"#08112a"}>
                Inicio
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image src={"/Logo Odyssey.svg"} width={100} height={100} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button size="lg" radius={"xl"} color={"#08112a"}>
                Sobre Nosotros
              </Button>
            </motion.div>
          </Group>
        </AppShellHeader>
        <AppShellMain
          style={{
            height: "100dvh",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                height: "90dvh",
              }}
            >
              <Group
                justify="center"
                align={"center"}
                style={{
                  height: "90dvh",
                  padding: "0 2rem",
                }}
                wrap="nowrap"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ flex: 1, maxWidth: showQuestions ? '800px' : '400px' }}
                >
                  <AnimatePresence mode="wait">
                    {!showQuestions ? (
                      <Stack>
                        <Title size={"3rem"} c={"white"}>
                          Busquemos tu portatil ideal
                        </Title>
                        <motion.div
                          style={{
                            width: "100%",
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Button
                            size="xl"
                            radius={"xl"}
                            color={"#1a2342"}
                            w={"100%"}
                            onClick={() => setShowQuestions(true)}
                          >
                            Empezar
                          </Button>
                        </motion.div>
                      </Stack>
                    ) : isCompleted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        style={{ width: '100%', maxWidth: '800px' }}
                      >
                        <Chat answers={answers} />
                      </motion.div>
                    ) : (
                      <Questions
                        question={questions[currentQuestion]}
                        onAnswer={handleAnswer}
                        progress={(currentQuestion + 1) / questions.length}
                        onComplete={() => setIsCompleted(true)}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ flexShrink: 0 }}
                >
                  <Image
                    src={"/Personaje.png"}
                    height={750}
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              </Group>
            </motion.div>
          </AnimatePresence>
        </AppShellMain>
      </AppShell>
    </div>
  );
}
