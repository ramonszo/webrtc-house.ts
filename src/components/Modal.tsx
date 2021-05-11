import JSX from "../lib/JSX";
import Header from "./Room/Header";

export default ({ title }: { title?: string }) => {
  return (
    <div className="hidden m-auto w-full fixed bottom-0 pt-12 max-h-screen font-sans flex justify-center">
      <div className="flex flex-col w-full sm:max-w-md bg-white rounded-t-3xl shadow relative overflow-hidden">
        <div className="overflow-auto">
          <Header title={title} />

          <section>
            <div className="grid gap-4 grid-cols-3 py-3 px-6">
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://pbs.twimg.com/profile_images/1382545718385201152/94Vtgqyo_400x400.jpg"
                  />
                  <div className="absolute right-0 bottom-0 -mr-1 -mb-1 p-1 bg-white border border-opacity-50 rounded-full">
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
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                </div>
                <span className="truncate max-w-full text-sm">
                  ✳️ Name Name Name
                </span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200"
                  />
                  <div className="absolute right-0 bottom-0 -mr-1 -mb-1 p-1 bg-white border border-opacity-50 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute transform rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#fff"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="5"
                        d="M20 12H4"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute transform rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="#c00"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      />
                    </svg>
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
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  </div>
                </div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://pbs.twimg.com/profile_images/1345525499230093313/ZQYkaICi_400x400.jpg"
                  />
                </div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://pbs.twimg.com/profile_images/1382545718385201152/94Vtgqyo_400x400.jpg"
                  />
                </div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://pbs.twimg.com/profile_images/1382545718385201152/94Vtgqyo_400x400.jpg"
                  />
                </div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
                  <img
                    className="w-full h-full object-cover rounded-full border border-opacity-50"
                    src="https://pbs.twimg.com/profile_images/1382545718385201152/94Vtgqyo_400x400.jpg"
                  />
                </div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h2 className="flex px-6 pb-0 font-semibold">
              Followed by the speakers
            </h2>
            <div className="grid gap-4 grid-cols-4 py-3 px-6">
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
              <div className="flex flex-col items-center overflow-hidden p-2">
                <div className="rounded-full bg-gray-200 w-16 h-16 mb-2 relative"></div>
                <span className="truncate max-w-full text-sm">Name</span>
              </div>
            </div>
          </section>
        </div>

        <footer className="bottom-0 m-auto px-6 py-3 flex items-center justify-between sm:max-w-md w-full bg-white">
          <div className="flex flex-row-reverse mr-4">
            <img
              className="w-8 h-8 object-cover rounded-full ring-2 ring-white -mr-1"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
            <img
              className="w-8 h-8 object-cover rounded-full ring-2 ring-white -mr-1"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
            <img
              className="w-8 h-8 object-cover rounded-full ring-2 ring-white -mr-1"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
            <img
              className="w-8 h-8 object-cover rounded-full ring-2 ring-white -mr-1"
              alt="User avatar"
              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
            />
          </div>

          <button className="rounded-full bg-gray-200 py-2 px-4 h-10 flex items-center whitespace-nowrap mr-4">
            <span className="mt-0.5">✌️</span>
            <span className="text-red-400 ml-2 text-sm font-semibold">
              Leave quietly
            </span>
          </button>

          <div className="flex items-center">
            <button className="rounded-full bg-gray-200 p-2 h-10 w-10 justify-center mr-4 flex items-center">
              ✌️
            </button>

            <button className="rounded-full bg-gray-200 mr-4 p-2 h-10">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>

            <button className="rounded-full bg-gray-200 mr-4 p-2 h-10">
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
                  d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
                />
              </svg>
            </button>

            <button className="rounded-full bg-gray-200 p-2 h-10">
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
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
