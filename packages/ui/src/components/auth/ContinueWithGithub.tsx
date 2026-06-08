import { FaGithub } from "react-icons/fa";
import { Button } from "../../ui/Button";

const ContinueWithGithub = () => {
  return (
    <Button className="flex gap-4 items-center justify-center bg-foreground/3 px-4 py-2 border rounded hover:cursor-pointer w-full">
      <div>
        <FaGithub />
      </div>
      <div>Continue with GitHub</div>
    </Button>
  );
};

export default ContinueWithGithub;
