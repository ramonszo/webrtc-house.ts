import JSX from "../lib/JSX";

export default ({ children }: { children?: any }): JSX.Element => {
  return (
    <div className="flex flex-col w-full sm:max-w-md bg-white rounded-t-3xl shadow relative overflow-hidden">
      {children}
    </div>
  );
};
