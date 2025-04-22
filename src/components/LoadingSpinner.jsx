import { Loader } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <Loader className="h-12 w-12 animate-spin text-[#AB572D]" />
      </div>
    </div>
  );
};
