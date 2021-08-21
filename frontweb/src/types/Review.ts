import { User } from './User'

export type Review = {
    id: number;
    text: string;
    userId: number,
    movieId: number,
    user: User;
}