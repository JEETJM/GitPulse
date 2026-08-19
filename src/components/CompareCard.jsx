export default function CompareCard({ first, second }) {
  if (!first || !second) return null;

  return (
    <div
      className="
      glass
      rounded-3xl
      p-8
      mt-16
      "
    >
      <h2 className="text-3xl font-bold mb-8">Compare Developers</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={first.avatar_url}
            className="
            w-28
            rounded-full
            "
          />

          <h2 className="mt-4 text-2xl">{first.login}</h2>

          <p>Followers :{first.followers}</p>

          <p>Repositories :{first.public_repos}</p>
        </div>

        <div>
          <img
            src={second.avatar_url}
            className="
            w-28
            rounded-full
            "
          />

          <h2 className="mt-4 text-2xl">{second.login}</h2>

          <p>Followers :{second.followers}</p>

          <p>Repositories :{second.public_repos}</p>
        </div>
      </div>
    </div>
  );
}
