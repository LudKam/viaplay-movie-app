export interface Category {
    id: string,
    name: string,
    url: string,
}

export class Movie {
    path: string;
    duration: string;
    images: Images;
    directors: Array<string>;
    actors: Array<string>;
    country: string;
    year: number;
    imdb: Imdb;
    genres: Array<string>;
    synopsis: string;
    title: string;
}
export class Images {
    boxart: string;
    packshot: string;
    landscape: string;
}
export class Imdb {
    rating: string;
    votes: string;
}

export const CATEGORY_NAV: Array<Category> = [
    { id: "samtliga", name: "Alla filmer", url: "/samtliga?blockId=816e1cf29ccf880e978edf22ad1fba6d&partial=1&pageNumber="},
    { id: "action", name: "Action", url: "/action?blockId=bf70f75105b2c2df4e3239188c5e78d3&partial=1&pageNumber="},
    { id: "komedi", name: "Komedi", url: "/komedi?blockId=39551023b2567942b88d3779d0ba06b7&partial=1&pageNumber="},
    { id: "drama", name: "Drama", url: "/drama?blockId=07afc3b727900b3521f05aa5097eefd8&partial=1&pageNumber="},
    { id: "romantik", name: "Romantik", url: "/romantik?blockId=c8fc3dba35ca4b1043e57746c1fab985&partial=1&pageNumber="},
    { id: "dokumentar", name: "Dokumentär", url: "/dokumentar?blockId=40eba92d29f55e88f124425a82f23b1c&partial=1&pageNumber="}
];