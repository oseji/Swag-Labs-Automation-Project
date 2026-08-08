export const PRODUCTS = [
    "sauce labs backpack",
    "sauce labs bike light",
    "sauce labs bolt t-shirt",
    "sauce labs fleece jacket",
    "sauce labs onesie",
    "test all the things t-shirt red",
] as const;

export type ProductName = (typeof PRODUCTS)[number];
