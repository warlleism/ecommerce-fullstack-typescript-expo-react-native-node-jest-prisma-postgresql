export default interface IProduct {
    description: string;
    enterprise?: string;
    id: number;
    img: string | any;
    logo?: string | any;
    title: string;
    price: number | string;
    qtd?: number;
}