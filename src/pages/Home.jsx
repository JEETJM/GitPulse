import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  Users,
  BookOpen,
  Star,
  GitFork,
  MapPin,
  Link as LinkIcon,
  Building2,
  ExternalLink,
  Loader2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  CalendarDays,
  Globe,
  ArrowUpRight,
  SlidersHorizontal,
  Code2,
  Trophy,
} from "lucide-react";

import { getUser, getRepos } from "../api/github";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [repoSearch, setRepoSearch] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  const [copied, setCopied] = useState(false);

  /* ================= SEARCH PROFILE ================= */

  const searchProfile = async () => {
    const value = username.trim();

    if (!value) {
      setError("Please enter a GitHub username.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const [userResponse, repoResponse] = await Promise.all([
        getUser(value),
        getRepos(value),
      ]);

      setUser(userResponse.data);
      setRepos(repoResponse.data);
      setRepoSearch("");
    } catch (err) {
      console.error(err);

      setUser(null);
      setRepos([]);

      setError("GitHub profile not found. Please check the username.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= COPY USERNAME ================= */

  const copyUsername = async () => {
    if (!user) return;

    try {
      await navigator.clipboard.writeText(`@${user.login}`);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.log("Copy failed");
    }
  };

  /* ================= STATS ================= */

  const totalStars = useMemo(() => {
    return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
  }, [repos]);

  const totalForks = useMemo(() => {
    return repos.reduce((total, repo) => total + repo.forks_count, 0);
  }, [repos]);

  /* ================= LANGUAGES ================= */

  const languageStats = useMemo(() => {
    const languages = {};

    repos.forEach((repo) => {
      if (!repo.language) return;

      languages[repo.language] = (languages[repo.language] || 0) + 1;
    });

    return Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [repos]);

  /* ================= FILTER + SORT ================= */

  const filteredRepos = useMemo(() => {
    let result = [...repos];

    if (repoSearch.trim()) {
      const search = repoSearch.toLowerCase().trim();

      result = result.filter((repo) =>
        `${repo.name} ${repo.description || ""}`.toLowerCase().includes(search),
      );
    }

    if (sortBy === "stars") {
      result.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    if (sortBy === "forks") {
      result.sort((a, b) => b.forks_count - a.forks_count);
    }

    if (sortBy === "updated") {
      result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }

    return result;
  }, [repos, repoSearch, sortBy]);

  /* ================= DATE ================= */

  const joinedDate =
    user ?
      new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <main className="min-h-screen overflow-hidden">
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-180px] left-[-150px] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="absolute top-[35%] right-[-180px] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[30%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-400/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.25 3.32.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-bold">
                Git<span className="text-violet-400">Pulse</span>
              </h1>

              <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Developer Intelligence
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            API Online
          </div>
        </div>
      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-400/20 bg-violet-500/10 text-violet-300 text-sm mb-7">
            <Sparkles size={15} />
            Explore the open-source world
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight">
            Understand
            <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              any developer.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-slate-400 text-base sm:text-lg leading-8">
            Search a GitHub username and instantly explore their profile,
            repositories, open-source impact and developer stats.
          </p>
        </motion.div>

        {/* SEARCH */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="p-2 rounded-2xl bg-white/[0.04] border border-white/10 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-slate-900 items-center justify-center">
                <Search size={21} className="text-slate-400" />
              </div>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchProfile();
                  }
                }}
                placeholder="Search GitHub username..."
                className="flex-1 min-w-0 bg-transparent outline-none text-white placeholder:text-slate-500 px-3 py-4"
              />

              <button
                onClick={searchProfile}
                disabled={loading}
                className="px-6 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 transition-all font-semibold flex items-center gap-2 shadow-lg shadow-violet-600/20"
              >
                {loading ?
                  <Loader2 size={20} className="animate-spin" />
                : <Search size={20} />}

                <span className="hidden sm:block">
                  {loading ? "Searching" : "Search"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ERROR */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              className="max-w-2xl mx-auto mt-5 px-5 py-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 flex items-center gap-3"
            >
              <AlertCircle size={19} />

              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================================================= */}
        {/* PROFILE */}
        {/* ================================================= */}

        <AnimatePresence mode="wait">
          {user && (
            <motion.div
              key={user.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mt-20"
            >
              {/* PROFILE HERO */}

              <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-purple-400 to-cyan-400" />

                <div className="p-7 sm:p-10">
                  <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                    {/* AVATAR */}

                    <div className="relative shrink-0">
                      <div className="absolute inset-[-6px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 blur-sm opacity-70" />

                      <img
                        src={user.avatar_url}
                        alt={user.login}
                        className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-slate-950"
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="flex-1 text-center lg:text-left">
                      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3">
                        <span className="text-violet-400 font-medium">
                          @{user.login}
                        </span>

                        <button
                          onClick={copyUsername}
                          className="text-slate-500 hover:text-white transition"
                          title="Copy username"
                        >
                          {copied ?
                            <Check size={16} className="text-emerald-400" />
                          : <Copy size={16} />}
                        </button>
                      </div>

                      <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                        {user.name || user.login}
                      </h2>

                      <p className="text-slate-400 mt-4 max-w-2xl leading-7">
                        {user.bio || "This developer hasn't added a bio yet."}
                      </p>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mt-6 text-sm text-slate-400">
                        {user.location && (
                          <span className="flex items-center gap-2">
                            <MapPin size={16} />
                            {user.location}
                          </span>
                        )}

                        {user.company && (
                          <span className="flex items-center gap-2">
                            <Building2 size={16} />
                            {user.company}
                          </span>
                        )}

                        <span className="flex items-center gap-2">
                          <CalendarDays size={16} />
                          Joined {joinedDate}
                        </span>

                        {user.blog && (
                          <a
                            href={
                              user.blog.startsWith("http") ?
                                user.blog
                              : `https://${user.blog}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 hover:text-white transition"
                          >
                            <Globe size={16} />
                            Website
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-7">
                        <a
                          href={user.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 transition font-semibold"
                        >
                          View GitHub Profile
                          <ExternalLink size={17} />
                        </a>

                        {user.blog && (
                          <a
                            href={
                              user.blog.startsWith("http") ?
                                user.blog
                              : `https://${user.blog}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition font-semibold"
                          >
                            <Globe size={17} />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================================================= */}
              {/* STAT CARDS */}
              {/* ================================================= */}

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
                <Stat
                  icon={<Users size={20} />}
                  label="Followers"
                  value={user.followers}
                />

                <Stat
                  icon={<Users size={20} />}
                  label="Following"
                  value={user.following}
                />

                <Stat
                  icon={<BookOpen size={20} />}
                  label="Repositories"
                  value={user.public_repos}
                />

                <Stat
                  icon={<Star size={20} />}
                  label="Total Stars"
                  value={totalStars}
                />

                <Stat
                  icon={<GitFork size={20} />}
                  label="Total Forks"
                  value={totalForks}
                />
              </div>

              {/* ================================================= */}
              {/* LANGUAGE ANALYTICS */}
              {/* ================================================= */}

              {languageStats.length > 0 && (
                <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <Code2 size={20} className="text-cyan-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">Language Stack</h3>

                      <p className="text-sm text-slate-500">
                        Most used technologies
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {languageStats.map(([language, count]) => (
                      <div
                        key={language}
                        className="px-4 py-3 rounded-xl border border-white/10 bg-slate-950/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />

                          <span className="font-medium">{language}</span>

                          <span className="text-xs text-slate-500">
                            {count} repos
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ================================================= */}
              {/* REPOSITORIES */}
              {/* ================================================= */}

              <div className="mt-20">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
                  <div>
                    <p className="text-violet-400 text-sm font-semibold uppercase tracking-wider">
                      Open Source
                    </p>

                    <h2 className="text-3xl font-bold mt-2">Repositories</h2>

                    <p className="text-slate-500 mt-2">
                      Explore {repos.length} public repositories
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Trophy size={17} className="text-yellow-400" />
                    {totalStars.toLocaleString()} total stars
                  </div>
                </div>

                {/* FILTER BAR */}

                <div className="flex flex-col md:flex-row gap-3 mb-7">
                  <div className="flex-1 relative">
                    <Search
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      value={repoSearch}
                      onChange={(e) => setRepoSearch(e.target.value)}
                      placeholder="Search repositories..."
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:border-violet-500/50 transition text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-slate-500" />

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3.5 outline-none text-slate-300"
                    >
                      <option value="stars">Most Stars</option>

                      <option value="forks">Most Forks</option>

                      <option value="updated">Recently Updated</option>
                    </select>
                  </div>
                </div>

                {/* REPO GRID */}

                {filteredRepos.length > 0 ?
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredRepos.map((repo, index) => (
                      <RepositoryCard key={repo.id} repo={repo} index={index} />
                    ))}
                  </div>
                : <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                    <Search size={35} className="mx-auto text-slate-600" />

                    <p className="text-slate-500 mt-4">
                      No repositories found.
                    </p>
                  </div>
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="relative z-10 border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <div className="text-lg font-bold">
            Git<span className="text-violet-400">Pulse</span>
          </div>

          <p className="text-sm text-slate-600 mt-2">
            Explore. Analyze. Discover developers.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ================================================= */
/* STAT COMPONENT */
/* ================================================= */

function Stat({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.055] p-5 transition"
    >
      <div className="flex items-center gap-3 text-violet-400">
        {icon}

        <span className="text-sm text-slate-400">{label}</span>
      </div>

      <p className="text-2xl font-bold mt-4">{value?.toLocaleString() || 0}</p>
    </motion.div>
  );
}

/* ================================================= */
/* REPOSITORY CARD */
/* ================================================= */

function RepositoryCard({ repo, index }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      whileHover={{
        y: -7,
      }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.065] p-6 transition-all overflow-hidden"
    >
      {/* Hover glow */}

      <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-violet-600/10 blur-3xl group-hover:bg-violet-600/20 transition" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-500/10 border border-violet-500/10 flex items-center justify-center">
              <BookOpen size={18} className="text-violet-400" />
            </div>

            <h3 className="font-semibold text-lg truncate group-hover:text-violet-300 transition">
              {repo.name}
            </h3>
          </div>

          <ArrowUpRight
            size={18}
            className="text-slate-600 group-hover:text-violet-400 shrink-0 transition"
          />
        </div>

        <p className="text-sm text-slate-500 mt-5 line-clamp-2 min-h-[42px] leading-6">
          {repo.description || "No description provided for this repository."}
        </p>

        <div className="flex items-center gap-5 mt-7 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <Star size={16} />
            {repo.stargazers_count}
          </span>

          <span className="flex items-center gap-1.5">
            <GitFork size={16} />
            {repo.forks_count}
          </span>

          {repo.language && (
            <span className="flex items-center gap-2 ml-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />

              {repo.language}
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
