import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center">
      <LoaderCircleIcon className="animate-spin size-8 text-primary" />
    </div>
  );
};

export default Loading;
