declare namespace JSX {
  type Element = string;
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
