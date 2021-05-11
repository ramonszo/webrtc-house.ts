import JSX from "../lib/JSX";

import AddIcon from "./Icons/Add";
import HandIcon from "./Icons/Hand";
import MicrophoneIcon from "./Icons/Microphone";

export default (): JSX.Element => {
  return (
    <div className="flex items-center">
      <button className="rounded-full bg-gray-200 p-2 h-10 w-10 justify-center mr-4 flex items-center">
        ✌️
      </button>

      <button className="rounded-full bg-gray-200 mr-4 p-2 h-10">
        <AddIcon className="h-6 w-6" />
      </button>

      <button className="rounded-full bg-gray-200 mr-4 p-2 h-10">
        <HandIcon className="h-6 w-6" />
      </button>

      <button className="rounded-full bg-gray-200 p-2 h-10">
        <MicrophoneIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
