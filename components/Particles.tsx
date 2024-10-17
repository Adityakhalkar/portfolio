import { motion } from 'framer-motion';

const Particles = () => {
  const particles = Array(10).fill(0);

  return (
    <div className="absolute right-10">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            x: Math.random() * 100 - 50,  // Random spread
            y: Math.random() * 100 - 50,  // Random spread
            opacity: [1, 0],
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export default Particles;