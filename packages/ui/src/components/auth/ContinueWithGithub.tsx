import { FaGithub } from "react-icons/fa";
import { Button } from "../../ui/Button";

const ContinueWithGithub = () => {
  return (
    <Button
      type="button"
      className="group flex min-h-11 w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-foreground-secondary shadow-[inset_0_1px_0_rgba(255,255,255,0.055),0_1px_2px_rgba(0,0,0,0.18)] hover:border-white/16 hover:bg-white/6 hover:text-foreground hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.075),0_2px_5px_rgba(0,0,0,0.22)] disabled:pointer-events-none disabled:opacity-50"
    >
      <FaGithub
        size={17}
        aria-hidden="true"
        className="shrink-0 text-foreground"
      />
      <span>Continue with GitHub</span>
    </Button>
  );
};

export default ContinueWithGithub;
