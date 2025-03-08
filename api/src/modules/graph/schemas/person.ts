import { Media, Relationship } from './common';

export interface Person extends Media {
  dateOfBirth?: Date;
  zodiacSign?: string;
}

export interface ActsFor extends Relationship {}
export interface Directs extends Relationship {}
export interface ComposesFor extends Relationship {}
export interface IsCreatorOf extends Relationship {}
export interface IsWriterOf extends Relationship {}
export interface Interprets extends Relationship {} // for characters
