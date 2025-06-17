import { Logo } from "../ui/Logo";

export const Summary = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div className="flex justify-center items-center">
        <Logo />
        <h2 className="mt-5 font-bold -translate-x-3 text-gray-500">
          say something
        </h2>
      </div>
    </div>
  );
};
