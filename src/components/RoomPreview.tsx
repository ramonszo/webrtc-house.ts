import JSX from "../lib/JSX";

export default ({
  image,
  name = "",
}: {
  image?: string;
  name?: string;
}): JSX.Element => {
  return (
    <div className="flex flex-row-reverse mr-4">
      {image && (
        <img
          className="w-8 h-8 object-cover rounded-full ring-2 ring-white -mr-1"
          alt={name}
          src={image}
        />
      )}
    </div>
  );
};
