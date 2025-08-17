export class ResultPagination<T> {
    public totalPages: number;

    constructor(
        public data: Array<T>,
        public currentPage: number,
        public perPage: number,
        public totalItems: number,
    ) {
        this.calculateTotalPages();
    }

    private calculateTotalPages(): void{
        this.totalPages = Math.ceil(this.totalItems / this.perPage)
    }
}