function highlightText(text, greenSkills, redSkills) {
  const allSkills = [
    ...greenSkills.map((s) => ({ skill: s, color: "green" })),
    ...redSkills.map((s) => ({ skill: s, color: "red" })),
  ];

  const parts = [{ text, type: "text" }];

  for (const { skill, color } of allSkills) {
    const result = [];
    for (const part of parts) {
      if (part.type !== "text") {
        result.push(part);
        continue;
      }
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      const split = part.text.split(regex);
      for (const s of split) {
        if (s.toLowerCase() === skill.toLowerCase()) {
          result.push({ text: s, type: color });
        } else if (s) {
          result.push({ text: s, type: "text" });
        }
      }
    }
    parts.splice(0, parts.length, ...result);
  }

  return parts;
}

export default function DiffView({ jd, cvText, matchedSkills, missingSkills }) {
  const jdParts = highlightText(jd, matchedSkills, missingSkills);
  const cvParts = highlightText(cvText, matchedSkills, missingSkills);

  const renderParts = (parts) =>
    parts.map((part, i) => {
      if (part.type === "green")
        return (
          <mark
            key={i}
            className="bg-emerald-900 text-emerald-300 rounded px-0.5"
          >
            {part.text}
          </mark>
        );
      if (part.type === "red")
        return (
          <mark key={i} className="bg-red-900 text-red-300 rounded px-0.5">
            {part.text}
          </mark>
        );
      return <span key={i}>{part.text}</span>;
    });

  return (
    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
          Job Description
        </p>
        <p className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {renderParts(jdParts)}
        </p>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
          Your CV
        </p>
        <p className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {renderParts(cvParts)}
        </p>
      </div>
    </div>
  );
}
