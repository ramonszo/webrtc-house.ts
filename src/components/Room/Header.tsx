import JSX from "../../lib/jsx";

export default ({ title }: { title?: string }) => {
  return (
    <header className="flex px-6 pt-3 pb-0">
      <h1 className="flex-grow font-semibold">{title}</h1>

      <div className="flex-shrink pl-3">
        <button className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
