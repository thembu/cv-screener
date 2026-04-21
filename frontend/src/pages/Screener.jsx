import { useState } from "react";
import axios from "axios";
import PdfDropzone from "../components/PdfDropeZone";
import MatchScore from "../components/MatchScore";
import DiffView from "../components/DiffView";
import CvFixer from "../components/CvFixer";

const API = import.meta.env.VITE_API_URL;

export default function Screener() {
  const [cvFile, setCvFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cvText, setCvText] = useState("");

  const handleAnalyse = async () => {
    if (!cvFile || !jd.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("cv", cvFile);
      formData.append("jd", jd);
      const res = await axios.post(`${API}/screener/analyse`, formData);
      setResult(res.data);
      setCvText(res.data.cvText);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center">
            <span className="text-black font-black text-xs">SA</span>
          </div>
          <span className="font-bold text-white tracking-tight">
            CV Screener
          </span>
        </div>
        <span className="text-xs text-zinc-500 border border-zinc-800 bg-zinc-900 px-3 py-1 rounded-full">
          Part of DevPulse ZA
        </span>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto px-6 pt-12 pb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2">
          CV Screener, <span className="text-amber-400">powered by Dev Pulse</span>
        </h1>
        <p className="text-zinc-400 text-sm mt-3">
          Upload your CV and paste a job description. Get a skill-gap report in
          seconds.
        </p>
      </div>

      {/* Inputs */}
      <div className="max-w-3xl mx-auto px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CV upload */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            Your CV
          </p>
          <PdfDropzone onFileSelect={setCvFile} />
        </div>

        {/* JD textarea */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
            Job Description
          </p>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-40 bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-none"
          />
        </div>

        {/* Analyse button */}
        <div className="sm:col-span-2 flex flex-col items-center gap-3">
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            onClick={handleAnalyse}
            disabled={!cvFile || !jd.trim() || loading}
            className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold px-10 py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? "Analysing..." : "Analyse my CV →"}
          </button>
        </div>

        {/* Raw result (Week 7 — just confirm extraction works) */}
        {result && (
          <div className="sm:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Match Score
            </p>
            <MatchScore score={result.match_score} />

            <div className="mt-5">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                Matched Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {result.matched_skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-emerald-900 text-emerald-400 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                Missing Skills
              </p>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-red-900 text-red-400 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                Recommendations
              </p>
              <ul className="space-y-2">
                {result.recommendations?.map((rec, i) => (
                  <li key={i} className="text-sm text-zinc-300">
                    → {rec}
                  </li>
                ))}
              </ul>
            </div>

            <CvFixer feedback={result.cv_feedback} />


            <DiffView
              jd={jd}
              cvText={cvText}
              matchedSkills={result.matched_skills}
              missingSkills={result.missing_skills}
            />
          </div>


        )}
      </div>
    </div>
  );
}
