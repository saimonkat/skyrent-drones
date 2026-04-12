declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react';
  const component: FC<SVGProps<SVGSVGElement>>;
  export default component;
}
