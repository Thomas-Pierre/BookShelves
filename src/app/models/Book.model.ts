export class BookModel {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: string,
    public editor: string,
    public publishDate: Date,
    public state: number,
    public cover: string | unknown,
    public isbn: string,
    public barcode: number,
    public index: number,
  ) {}
}