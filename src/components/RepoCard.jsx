import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Code2 } from "lucide-react";

export default function RepoCard({ repo }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="
      glass
      rounded-2xl
      p-6
      flex
      flex-col
      justify-between
      "
    >
      <div>
        <h2 className="text-2xl font-bold">{repo.name}</h2>

        <p className="text-gray-400 mt-3 min-h-[70px]">
          {repo.description || "No description available"}
        </p>
      </div>

      <div className="mt-6">
        <div className="flex gap-6">
          <span className="flex items-center gap-2">
            <Star size={18} />
            {repo.stargazers_count}
          </span>

          <span className="flex items-center gap-2">
            <GitFork size={18} />
            {repo.forks_count}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Code2 size={18} />

          <span>{repo.language || "Unknown"}</span>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="
          mt-6
          inline-flex
          items-center
          gap-2
          text-purple-400
          hover:text-purple-300
          "
        >
          View Repository
          <ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
}
