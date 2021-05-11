import JSX from "../lib/JSX";

import MoreIcon from "./Icons/More";

export default ({ title }: { title?: string }): JSX.Element => {
  return (
    <header className="flex px-6 pt-3 pb-0">
      <h1 className="flex-grow font-semibold">{title}</h1>

      <div className="flex-shrink pl-3">
        <button className="p-1">
          <MoreIcon />
        </button>
      </div>
    </header>
  );
};
