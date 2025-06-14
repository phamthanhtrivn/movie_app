// track the searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  // check if a record of that search has already been stored
  // if a document is found increment the searchCount field
  // if no document is found c
  // create a new document in Appwrite database -> 1
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const saveMovie = async (movieDetails: MovieDetails): Promise<boolean> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
      Query.equal("movie_id", movieDetails.id),
    ]);

    if (result.documents.length > 0) {
      return false;
    } else {
      await database.createDocument(DATABASE_ID, SAVED_COLLECTION_ID, ID.unique(), {
        movie_id: movieDetails.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        title: movieDetails.title,
        vote_average: movieDetails.vote_average,
        release_date: movieDetails.release_date,
      });
      return true;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
} 

export const getSavedMovies = async (): Promise<SavedMovies[] | undefined> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID);

    return result.documents as unknown as SavedMovies[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
