export default function AISummary({ user, repos }) {
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );

  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const topRepo =
    repos.length > 0 ?
      [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
    : null;

  return (
    <div
      className="
      glass
      rounded-3xl
      p-8
      "
    >
      <h2 className="text-3xl font-bold mb-6">🤖 GitPulse AI Analysis</h2>

      <div className="space-y-4 text-gray-300">
        <p>
          👤 <b>{user.name || user.login}</b> has <b>{user.public_repos}</b>{" "}
          public repositories.
        </p>

        <p>
          ⭐ Total Stars: <b>{totalStars}</b>
        </p>

        <p>
          🍴 Total Forks: <b>{totalForks}</b>
        </p>

        <p>
          👥 Followers: <b>{user.followers}</b>
        </p>

        {topRepo && (
          <p>
            🚀 Most Popular Repository:
            <br />
            <b>{topRepo.name}</b>
            <br />⭐ {topRepo.stargazers_count}
          </p>
        )}

        <p>
          GitPulse AI estimates this developer actively contributes to
          open-source projects and maintains a consistent GitHub presence based
          on repository activity and profile statistics.
        </p>
      </div>
    </div>
  );
}
