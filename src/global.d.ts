declare module "*.jpg" {
  export default "" as string;
}
declare module "*.png" {
  export default "" as string;
}
declare module "*.svg" {
  export default "" as string;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}
