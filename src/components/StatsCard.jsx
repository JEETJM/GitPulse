import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="
      glass
      rounded-2xl
      p-8
      text-center
      "
    >
      <div className="text-5xl mb-4">{icon}</div>

      <h3 className="text-gray-400">{title}</h3>

      <h2 className="text-4xl font-bold mt-3">{value}</h2>
    </motion.div>
  );
}
