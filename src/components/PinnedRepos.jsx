import { Star, GitFork, Code2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function PinnedRepos({ repos }) {
  if (!repos || repos.length === 0) return null;

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-8">⭐ Pinned Repositories</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
        {topRepos.map((repo) => (
          <motion.div
            key={repo.id}
            whileHover={{
              scale: 1.03,
              y: -6,
            }}
            className="
            glass
            rounded-2xl
            p-6
            "
          >
            <div className="flex justify-between">
              <h3 className="text-xl font-bold">{repo.name}</h3>

              <a href={repo.html_url} target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
              </a>
            </div>

            <p className="text-gray-400 mt-4 min-h-[70px]">
              {repo.description || "No description available"}
            </p>

            <div className="flex gap-5 mt-6">
              <span className="flex items-center gap-2">
                <Star size={18} />

                {repo.stargazers_count}
              </span>

              <span className="flex items-center gap-2">
                <GitFork size={18} />

                {repo.forks_count}
              </span>

              <span className="flex items-center gap-2">
                <Code2 size={18} />

                {repo.language || "Unknown"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
