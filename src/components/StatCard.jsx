export default function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <article
      className="rounded-2xl border border-white/[0.28] bg-[rgba(20,10,35,0.28)] p-5 backdrop-blur-[4px]"
      style={{
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 12px 34px rgba(0, 0, 0, 0.18)",
      }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08]"
          style={{ color: accent }}
        >
          <Icon size={18} />
        </div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/56">
          {label}
        </p>
      </div>
      <p className="text-balance break-words text-2xl font-black text-white">
        {value}
      </p>
    </article>
  );
}
