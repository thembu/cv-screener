export default function MatchScore({ score }) {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#27272a" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="55" textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="900">{score}</text>
        <text x="60" y="72" textAnchor="middle" fill="#71717a" fontSize="11">/100</text>
      </svg>
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-3">Match Score</p>
    </div>
  )
}