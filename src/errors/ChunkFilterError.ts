export class ChunkFilterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Chunk Filter Error';
  }
}
