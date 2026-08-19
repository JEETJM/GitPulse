import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#7C3AED",
  "#06B6D4",
  "#10B981",
  "#F97316",
  "#F43F5E",
  "#3B82F6",
  "#A855F7",
];

export default function LanguageChart({ languages }) {
  const data = Object.entries(languages).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) return null;

  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="text-3xl font-bold mb-8">Language Distribution</h2>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((item, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
