// SectionDivider.jsx — Glowing horizontal separator
export default function SectionDivider({ flip = false }) {
  return (
    <div className={`relative flex items-center justify-center py-4 ${flip ? 'scale-x-[-1]' : ''}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      <div className="mx-4 w-1.5 h-1.5 rounded-full bg-cyan-400/40" />
      <div className="w-2 h-2 rounded-full bg-cyan-400/60 mx-1" />
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 mx-1" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />
    </div>
  )
}
