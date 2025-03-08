export interface Node {
  id?: string; // uuid
}

export interface Media extends Node {
  name: string;
  alternativeNames?: string[];
  acronym?: string; // BotW, AoT etc
  description?: string;
  imageCoverUrl?: string;
  imageUrls?: string[];
}

export interface Relationship {
  id?: string;
  name: string;
  type: string;
  targetId: string;
  when?: Date;
  since?: Date;
}

export interface Rating {
  rating: string;
}

export interface Franchise extends Media {}

export interface ReleasedOn extends Relationship {
  releaseDateGlobal?: string;
  releaseDateUS?: string;
  releaseDateJapan?: string;
  releaseDateEurope?: string;
}

export interface Company {}

export interface Tag {
  id: string;
  name: string;
}

export interface Genre {
  id: string;
  name: string;
}
