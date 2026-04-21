export default function CvFixer({ feedback }) {
  if (!feedback) return null

  const scoreColor = feedback.tone_score >= 7
    ? 'text-emerald-400'
    : feedback.tone_score >= 4
    ? 'text-amber-400'
    : 'text-red-400'

  return (
    <div className="sm:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">CV Fixer</p>

      {/* Overall + tone score */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-4">
          <p className="text-xs text-zinc-500 mb-1">Overall Feedback</p>
          <p className="text-sm text-zinc-300">{feedback.overall}</p>
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center min-w-24">
          <p className="text-xs text-zinc-500 mb-1">Tone Score</p>
          <p className={`text-3xl font-black ${scoreColor}`}>{feedback.tone_score}<span className="text-zinc-500 text-sm">/10</span></p>
        </div>
      </div>

      {/* Weak phrases */}
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Weak Phrases</p>
      <div className="space-y-3">
        {feedback.weak_phrases?.map((item, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-red-950 border border-red-900 rounded-xl p-3">
              <p className="text-xs text-red-400 font-semibold mb-1">Original</p>
              <p className="text-xs text-zinc-300">"{item.original}"</p>
            </div>
            <div className="bg-emerald-950 border border-emerald-900 rounded-xl p-3">
              <p className="text-xs text-emerald-400 font-semibold mb-1">Rewrite</p>
              <p className="text-xs text-zinc-300">"{item.rewrite}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}