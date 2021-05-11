import JSX from "../lib/JSX";
import Room from "./Room";

export default ({ title }: { title?: string }): JSX.Element => {
  return (
    <div className="m-auto w-full fixed bottom-0 pt-12 max-h-screen font-sans flex justify-center">
      <Room title={title} />
    </div>
  );
};
