import JSX from "../lib/JSX";

export default ({ name }: { name?: string }): JSX.Element => {
  return (
    <div className="flex flex-col items-center overflow-hidden p-2">
      <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
      <span className="truncate max-w-full text-sm">{name}</span>
    </div>
  );
};
