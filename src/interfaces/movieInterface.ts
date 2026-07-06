export default interface Movie {
  id: string;
  title: string;
  image?: string;
  rating?: number;
  votes?: number;
  year?: number;
  genres: string[];
  plot?: string;
  type: string;
}