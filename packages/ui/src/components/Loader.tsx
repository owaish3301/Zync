interface LoaderProps {
  className?: string;
  label?: string;
  size?: number;
}

const Loader = ({
  className = "",
  label = "Loading",
  size = 16,
}: LoaderProps) => {
  return (
    <span
      aria-label={label}
      role="status"
      className={`inline-block shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default Loader;
