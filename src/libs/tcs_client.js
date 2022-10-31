import axios from "axios";
import { TCS_URL } from "./constants";

export default class TCS{
    constructor(pSpaceID = "UAT"){
        this.SpaceID = pSpaceID;
    }
    
    async makeInstance(){
        await this.getConfig();
        this.createSession();
    }

    async getConfig() {
        const config = await axios({
            method: "GET",
            baseURL: TCS_URL,
            url: '/v1/config',
            params: {
                SpaceID: this.SpaceID,
            }
        }).then(res => res.data)

        this.EnvID = config.ID;
        this.Money = config.InitialMoney;
        this.Currency = config.Currency;
    }

    createSession() {
        this.Session = axios.create({
            baseURL: TCS_URL,
            headers: {
                //Authorization: ,
                X_EnvID: this.EnvID,
                X_SpaceID: this.SpaceID,
            }
        })
    }

    async getProducts() {
        return await this.Session({
            method: "GET",
            url: "/v1/products",
        }).then(res => res.data)
    }

    async getProduct(pID){
        return await this.Session({
            method: "GET",
            url: `/v1/products/${pID}`,
        }).then(res => res.data)
    }

}

