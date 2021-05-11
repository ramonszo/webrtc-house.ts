import JSX from "../lib/JSX";

export default ({ children }: { children?: any }): JSX.Element => {
  return (
    <footer className="bottom-0 m-auto px-6 py-3 flex items-center justify-between sm:max-w-md w-full bg-white">
      {children}
    </footer>
  );
};
