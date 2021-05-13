import JSX from "../lib/JSX";

import Container from "./Container";

import Header from "./Header";

export default ({
  title,
  placeholderText,
  actionText,
  onSubmit,
}: {
  title: string;
  placeholderText: string;
  actionText: string;
  onSubmit: (event: Event) => void;
}): JSX.Element => {
  return (
    <Container>
      <div className="overflow-hidden">
        <Header title={title} />

        <form
          onSubmit={onSubmit}
          className="h-64 flex items-center align-center px-6"
        >
          <div className="w-full text-center">
            <input
              className="border p-3 w-full rounded-full text-center"
              placeholder={placeholderText}
            />
            <button className="m-6 py-3 px-6 bg-green-600 text-white rounded-full">
              {actionText}
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};
