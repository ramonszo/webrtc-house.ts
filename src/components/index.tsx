export const JSX = {
  createElement (name: string, props: { [id: string]: string }, ...content: HTMLElement[]): HTMLElement {
    const currentWindow = window as any;

    if (typeof currentWindow !== 'undefined' && currentWindow.React) {
      return currentWindow.React.createElement.apply(this, arguments);
    }

    props = props || {};

    const propsStr = Object.keys(props)
      .map(key => {
        const value = props[key];
        if (key === 'className') return `class="${value}"`;
        if (key === 'strokeLinecap') return `stroke-linecap="${value}"`;
        if (key === 'strokeLinejoin') return `stroke-linejoin="${value}"`;
        if (key === 'strokeWidth') return `stroke-width="${value}"`;

        else return `${key}="${value}"`;
      })
      .join(' ');

    const elementStr = `<${name} ${propsStr}>${content.map((contentElement) => {
      return contentElement.outerHTML || contentElement;
    }).join('')}</${name}>`;

    const parentElement = document.createElement('div');
    parentElement.innerHTML = elementStr;

    return parentElement.firstElementChild as HTMLElement;
  }
};

export default JSX;
