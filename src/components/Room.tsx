import JSX from "../lib/JSX";

import Container from "./Container";

import Header from "./Header";
import Footer from "./Footer";

import Speaker from "./Speaker";
import Listener from "./Listener";

import RoomPreview from "./RoomPreview";
import RoomActions from "./RoomActions";

export default ({ title }: { title?: string }): JSX.Element => {
  return (
    <Container>
      <div className="overflow-auto">
        <Header title={title} />

        <section>
          <div className="grid gap-4 grid-cols-3 py-3 px-6">
            <Speaker name="Ramon" moderator />
            <Speaker name="Fantano" />
            <Speaker name="Big long giant name" muted />
          </div>
        </section>

        <section className="mt-6">
          <h2 className="flex px-6 pb-0 font-semibold">Listeners</h2>
          <div className="grid gap-4 grid-cols-4 py-3 px-6">
            {[1, 2, 3, 4].map((id) => (
              <Listener name={`Listener ${id}`} />
            ))}
          </div>
        </section>
      </div>

      <Footer>
        <RoomPreview />

        <button className="rounded-full bg-gray-200 py-2 px-4 h-10 flex items-center whitespace-nowrap mr-4">
          <span className="mt-0.5">✌️</span>
          <span className="text-red-400 ml-2 text-sm font-semibold">
            Leave quietly
          </span>
        </button>

        <RoomActions />
      </Footer>
    </Container>
  );
};
