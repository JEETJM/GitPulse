import { motion } from "framer-motion";
import {
  MapPin,
  Building2,
  Calendar,
  ExternalLink,
  Users,
  BookOpen,
} from "lucide-react";

export default function ProfileCard({ user }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-3xl p-8"
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-40 h-40 rounded-full border-4 border-purple-500"
        />

        <div className="flex-1">
          <h2 className="text-4xl font-bold">{user.name || user.login}</h2>

          <p className="text-purple-400 text-lg mt-1">@{user.login}</p>

          <p className="text-gray-400 mt-4">{user.bio || "No bio available"}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{user.location || "Unknown"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Building2 size={18} />
              <span>{user.company || "Not specified"}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-8 mt-8">
            <div className="flex items-center gap-2">
              <Users />
              <span>{user.followers} Followers</span>
            </div>

            <div className="flex items-center gap-2">
              <BookOpen />
              <span>{user.public_repos} Repositories</span>
            </div>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              mt-8
              bg-purple-600
              hover:bg-purple-700
              px-6
              py-3
              rounded-xl
              transition
            "
          >
            View GitHub Profile
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
