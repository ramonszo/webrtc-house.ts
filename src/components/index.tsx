export const JSX = {
  createElement (name: string, props: { [id: string]: string }, ...content: string[]): any {
    const currentWindow = window as any;

    if (typeof currentWindow !== 'undefined' && currentWindow.React) {
      return currentWindow.React.createElement.apply(this, arguments);
    }

    props = props || {};

    const propsstr = Object.keys(props)
      .map(key => {
        const value = props[key];
        if (key === 'className') return `class="${value}"`;
        if (key === 'strokeLinecap') return `stroke-linecap="${value}"`;
        if (key === 'strokeLinejoin') return `stroke-linejoin="${value}"`;
        if (key === 'strokeWidth') return `stroke-width="${value}"`;

        else return `${key}="${value}"`;
      })
      .join(' ');

    return `<${name} ${propsstr}> ${content.join('')}</${name}>`;
  }
};

export default JSX;
