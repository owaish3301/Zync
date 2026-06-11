const Divider = () => {
  return (
    <div className="my-6 flex items-center justify-center gap-4">
      <div className="h-px grow bg-linear-to-r from-transparent to-white/8" />
      <div className="text-[11px] font-medium text-meta">or use email</div>
      <div className="h-px grow bg-linear-to-l from-transparent to-white/8" />
    </div>
  );
};

export default Divider;
