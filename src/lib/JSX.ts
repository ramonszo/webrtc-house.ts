/*
  This file translate the JSX component into an vanilla component.
  Using this we can have the components available in multiple frameworks without duplicating them.

  Part of it come from: https://fettblog.eu/jsx-syntactic-sugar/
*/

type DOMProps = { [id: string]: unknown };
type JSXFunction = (properties: DOMProps) => HTMLElement | string;

// probably there's more tags/attributes on this list but the script only use those.
const svgElements = ["svg", "path", "g", "d"];
const camelCaseAttrs = {
  className: "class",
  strokeLinecap: "stroke-linecap",
  strokeLinejoin: "stroke-linejoin",
  strokeWidth: "stroke-width",
};

function DOMparseChildren(children: HTMLElement[]): HTMLElement[] {
  return children.map((child: HTMLElement | string) => {
    if (typeof child === "string") {
      return document.createTextNode(child) as unknown;
    }

    return child;
  }) as HTMLElement[];
}

function nonNull(val: DOMProps): DOMProps {
  return val || {};
}

function DOMcreateElement(element: string): unknown {
  if (svgElements.includes(element)) {
    return document.createElementNS(
      "http://www.w3.org/2000/svg",
      element
    ) as unknown;
  } else {
    return document.createElement(element) as unknown;
  }
}

function DOMparseNode(
  element: string,
  properties: DOMProps,
  children: HTMLElement[]
) {
  const el = DOMcreateElement(element) as HTMLElement;

  Object.keys(nonNull(properties)).forEach((key: string) => {
    if (Object.keys(camelCaseAttrs).includes(key)) {
      el.setAttribute(
        camelCaseAttrs[key as keyof typeof camelCaseAttrs],
        properties[key] as string
      );
    } else if (typeof properties[key] !== "string") {
      if (key.indexOf("on") === 0) {
        const eventKey = key.toLowerCase().replace("on", "");

        el.addEventListener(eventKey, properties[key] as EventListener);
      } else {
        Object.defineProperty(el, key, properties[key] as string);
      }
    } else {
      el.setAttribute(key, properties[key] as string);
    }
  });

  const parseChild = (childrenArray: HTMLElement | HTMLElement[]) => {
    if (Array.isArray(childrenArray)) {
      DOMparseChildren(childrenArray).forEach((child: HTMLElement) => {
        parseChild(child);
      });
    } else if (childrenArray) {
      el.appendChild(childrenArray);
    }
  };

  parseChild(children);

  return el;
}

export const JSX = {
  createElement(
    element: unknown,
    properties: DOMProps,
    ...children: HTMLElement[]
  ): HTMLElement | undefined {
    const currentWindow = window as any;

    // use React if available
    if (typeof currentWindow !== "undefined" && currentWindow.React) {
      return currentWindow.React.createElement.apply(this, arguments);
    } else {
      if (typeof element === "function") {
        return element({
          ...nonNull(properties),
          children,
        });
      } else if (typeof element === "string") {
        return DOMparseNode(element, properties, children);
      } else {
        return undefined;
      }
    }
  },
};

export default JSX;
