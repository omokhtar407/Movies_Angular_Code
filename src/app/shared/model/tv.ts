interface Tv {
  adult: boolean;
  backdrop_path: string;
  genre_ids: genre;
  id: number;
  media_type: string;
  original_language: string;
  origin_country: country;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface genre {
  [index: number]: number;
}
interface country {
  [index: string]: string;
}
interface TvTrailers {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
interface TvCast {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}
export { Tv, TvTrailers, TvCast };
