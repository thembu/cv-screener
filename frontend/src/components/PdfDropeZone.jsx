import { useRef, useState } from 'react'

export default function PdfDropzone({ onFileSelect }) {
  const inputRef = useRef(null)
  const [fileName, setFileName] = useState(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file || file.type !== 'application/pdf') return
    setFileName(file.name)
    onFileSelect(file)
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        dragging ? 'border-amber-500' : 'border-zinc-700 hover:border-amber-500'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center mx-auto mb-3">
        <svg width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      {fileName ? (
        <p className="text-sm font-semibold text-amber-400">{fileName}</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-zinc-200 mb-1">Drop your PDF here</p>
          <p className="text-xs text-zinc-500">or click to browse — max 5MB</p>
        </>
      )}
    </div>
  )
}