import JSX from "../lib/JSX";

import { Shrughouse } from "../types";

import AddIcon from "./Icons/Add";
import MicrophoneIcon from "./Icons/Microphone";
import MicrophoneMutedIcon from "./Icons/MicrophoneMuted";

export default ({
  muted,
  onAction,
}: {
  muted?: boolean;
  onAction: Shrughouse["action"];
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onAction("add")}
        className="rounded-full bg-gray-200 mr-4 p-2 h-10"
      >
        <AddIcon className="h-6 w-6" />
      </button>

      <button
        onClick={() => onAction("mute")}
        className="rounded-full bg-gray-200 p-2 h-10"
      >
        {!muted ? (
          <MicrophoneIcon className="h-6 w-6" />
        ) : (
          <MicrophoneMutedIcon className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};
