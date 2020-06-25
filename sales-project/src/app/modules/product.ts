export class Product {

	public id;
	public sku: string;
	public name: string;
	public description: string;
	public unitPrice: number;
	public imageUrl: string;
	public active: boolean;
	public unitsInStock: number;
	public createDate: Date;
	public updateDate: Date;
	public categoryId: number;

	constructor() { }
}