export default class Coin {
    /**
     * Properties of each coin
     */
    id: number;
    name: string;
    symbol: string;
    price: number;
    percentChange: number;

    /**
     * 
     * @param {*} id the Identifer of the coin
     * @param {*} name the name of the coin
     * @param {*} symbol much like the ticker symbol of the coin
     * @param {*} price the price of the coin
     * @param {*} percentChange how much the coinprice has changed in the last 24 hours
     */


    constructor(
        id: number,
        name: string,
        symbol: string,
        price: number,
        percentChange: number
    ) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.price = price;
        this.percentChange = percentChange;
    }
}