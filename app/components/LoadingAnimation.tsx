import { motion, AnimatePresence } from "framer-motion";
import { Stack, Text } from "@mantine/core";
import { useState, useEffect } from "react";

interface LoadingAnimationProps {
  text: string;
  messages?: string[];
}

export function LoadingAnimation({ text, messages = [] }: LoadingAnimationProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const defaultMessages = [
    "Analizando tus preferencias...",
    "Buscando las mejores opciones...",
    "Comparando especificaciones...",
    "Verificando disponibilidad...",
    "Casi listo...",
  ];

  const displayMessages = messages.length > 0 ? messages : defaultMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % displayMessages.length);
    }, 500);
    return () => clearInterval(interval);
  }, [displayMessages.length]);

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  };

  return (
    <Stack align="center" justify="center" gap="xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Text size="xl" fw={700} c="white" ta="center">
            {displayMessages[currentMessage]}
          </Text>
        </motion.div>
      </AnimatePresence>
      <motion.div
        style={{
          display: "flex",
          gap: "0.5rem",
        }}
        variants={containerVariants}
        initial="start"
        animate="end"
      >
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            style={{
              width: "15px",
              height: "15px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "block",
            }}
            variants={dotVariants}
            transition={{
              ...dotTransition,
              delay: index * 0.1,
            }}
          />
        ))}
      </motion.div>
    </Stack>
  );
}
