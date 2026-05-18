export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.065] p-4 backdrop-blur-xl">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/20"
          style={{ color: accent }}
        >
          <Icon size={18} />
        </div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/42">
          {label}
        </p>
      </div>
      <p className="text-balance break-words text-2xl font-black text-white">
        {value}
      </p>
    </article>
  );
}
