import { Genre } from "./Genre"

export type Movie = {
    id: number;
    title: string;
    subTitle: string;
    year: number;
    imgUrl: string;
    synopsis: string;
    genreId: number;
    genre: Genre;
    reviews: Review[];
}

export type Review = {
    id: number;
    text: string;
    movieId: number;
    userId: number;
    user: User;
  };

export type User = {
    id: number;
    name: string;
  };