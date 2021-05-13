import JSX from "../lib/JSX";

import MicrophoneMutedIcon from "./Icons/MicrophoneMuted";
import MicrophoneIcon from "./Icons/Microphone";

export type SpeakerProps = {
  image?: string;
  name?: string;
  muted?: boolean;
  moderator?: boolean;
};

export default ({
  image,
  name,
  muted,
  moderator,
}: SpeakerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center overflow-hidden p-2">
      <div className="rounded-full bg-gray-200 w-20 h-20 mb-2 relative">
        {image && (
          <img
            className="w-full h-full object-cover rounded-full border border-opacity-50"
            src={image}
          />
        )}

        <div className="absolute right-0 bottom-0 -mr-1 -mb-1 p-1 bg-white border border-opacity-50 rounded-full">
          {muted ? (
            <MicrophoneMutedIcon className="h-6 w-6" />
          ) : (
            <MicrophoneIcon className="h-6 w-6" />
          )}
        </div>
      </div>
      <span className="truncate max-w-full text-sm">
        {moderator && "✳️"} {name}
      </span>
    </div>
  );
};
