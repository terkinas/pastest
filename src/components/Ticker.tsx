type TickerProps = {
  word: string;
  color?: "red" | "blue" | "green" | "yellow";
};

export default function Ticker({ word, color = "red" }: TickerProps) {
  const items = Array(20).fill(word);

  const colorClasses = {
    red: "text-red-600 decoration-red-700",
    blue: "text-blue-700 decoration-blue-800",
    green: "text-green-500 decoration-green-700",
    yellow: "text-yellow-500 decoration-yellow-600",
  };

  return (
    <div className="w-full overflow-hidden border-t border-b border-white/10 py-2 bg-black mt-8 mb-2">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 18s linear infinite" }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className={`mx-4 line-through decoration-4 text-2xl md:text-5xl font-poppins font-semibold uppercase italic ${colorClasses[color]}`}
          >
            {t}
            &nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
