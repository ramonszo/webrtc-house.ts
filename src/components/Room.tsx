import JSX from "../lib/JSX";
import { RTChouse } from "../types";

import Container from "./Container";

import Header from "./Header";
import Footer from "./Footer";

import Speaker, { SpeakerProps } from "./Speaker";
import Listener, { ListenerProps } from "./Listener";

import RoomActions from "./RoomActions";

export default ({
  title,
  speakers,
  listeners,
  muted,
  onDisconnect,
  onAction,
}: {
  title: string;
  speakers?: SpeakerProps[];
  listeners?: ListenerProps[];
  muted?: boolean;
  onDisconnect: RTChouse["disconnect"];
  onAction: RTChouse["action"];
}): JSX.Element => {
  return (
    <Container>
      <div className="overflow-auto">
        <Header title={title} />

        {speakers && speakers.length > 0 && (
          <section>
            <div className="grid gap-4 grid-cols-3 py-3 px-6">
              {speakers.map((member) => (
                <Speaker {...member} />
              ))}
            </div>
          </section>
        )}

        {listeners && listeners.length > 0 && (
          <section className="mt-6">
            <h2 className="flex px-6 pb-0 font-semibold">Listeners</h2>
            <div className="grid gap-4 grid-cols-4 py-3 px-6">
              {[1, 2, 3, 4].map((id) => (
                <Listener name={`Listener ${id}`} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer>
        <button
          className="rounded-full bg-gray-200 py-2 px-4 h-10 flex items-center whitespace-nowrap mr-4"
          onClick={onDisconnect}
        >
          <span className="mt-0.5">✌️</span>
          <span className="text-red-400 ml-2 text-sm font-semibold">
            Leave quietly
          </span>
        </button>

        <RoomActions onAction={onAction} muted={muted} />
      </Footer>
    </Container>
  );
};
