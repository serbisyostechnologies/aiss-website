import { motion } from "framer-motion";

const particles = Array.from({ length: 18 });

const FloatingParticles = () => {
  return (
    <div className="particles">
      {particles.map((_, index) => (
        <motion.span
          key={index}
          className={`particle particle-${index + 1}`}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.4, 1],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;