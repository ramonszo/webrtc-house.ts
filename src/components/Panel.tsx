import JSX from "../lib/JSX";

export default ({ children }: { children?: JSX.Element }): JSX.Element => {
  return (
    <div className="m-auto w-full fixed bottom-0 pt-12 max-h-screen font-sans flex justify-center">
      {children}
    </div>
  );
};
