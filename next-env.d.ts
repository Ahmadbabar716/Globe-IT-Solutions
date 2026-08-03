/// <reference types="next" />
/// <reference types="next/image-types/global" />

// CSS module type declarations
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// NOTE: This file should not be edited, see https://nextjs.org/docs/app/building-your-application/configuring/typescript#typescript-plugin-options for more information.
