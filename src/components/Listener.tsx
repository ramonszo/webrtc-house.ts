import JSX from "../lib/JSX";

export type ListenerProps = {
  image?: string;
  name?: string;
};

export default ({ image, name }: ListenerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center overflow-hidden p-2">
      <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative">
        {image && (
          <img
            className="w-full h-full object-cover rounded-full border border-opacity-50"
            src={image}
          />
        )}
      </div>
      <span className="truncate max-w-full text-sm">{name}</span>
    </div>
  );
};
