import Dexie, { Table } from 'dexie'

export interface Artwork {
  id?: number
  title: string
  year: number
  imageUrl: string
  description: string
  popularity: number
  type: string
}

export class ArtworkDatabase extends Dexie {
  artworks!: Table<Artwork>

  constructor() {
    super('ArtworkDatabase')
    this.version(1).stores({
      artworks: '++id, title, year'
    })
  }
}

export const db = new ArtworkDatabase()
