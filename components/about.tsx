// components/About.tsx
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="h-screen flex items-center justify-center bg-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h2 className="text-4xl font-semibold">About Me</h2>
        <p className="text-lg mt-4 max-w-xl mx-auto">
          I am a software developer with a passion for creating beautiful and
          functional websites.
        </p>
      </motion.div>
    </section>
  );
}
