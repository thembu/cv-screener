import { useState, useEffect } from 'react'
import axios from 'axios'

const JOBS_API = 'http://13.244.59.225:3001/api'

export default function JobSearchModal({ onSelect, onClose }) {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${JOBS_API}/jobs?limit=200`)
      .then(res => setJobs(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = jobs.filter(j =>
    j.title?.toLowerCase().includes(search.toLowerCase()) ||
    j.company?.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = async (job) => {
    try {
      const res = await axios.get(`${JOBS_API}/jobs/${job.id}`)
      onSelect(res.data.data.description)
    } catch {
      onSelect(job.description || '')
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <p className="font-bold text-white">Load from Job Board</p>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-sm">✕</button>
        </div>

        <div className="p-4 border-b border-zinc-800">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            autoFocus
          />
        </div>

        <div className="overflow-y-auto max-h-80">
          {loading ? (
            <div className="p-5 text-zinc-500 text-sm text-center">Loading jobs...</div>
          ) : filtered.length === 0 ? (
            <div className="p-5 text-zinc-500 text-sm text-center">No jobs found</div>
          ) : (
            filtered.map(job => (
              <button
                key={job.id}
                onClick={() => handleSelect(job)}
                className="w-full text-left px-5 py-3 border-b border-zinc-800 hover:bg-zinc-800 transition-colors"
              >
                <p className="text-sm font-semibold text-white">{job.title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{job.company} · {job.location}</p>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}