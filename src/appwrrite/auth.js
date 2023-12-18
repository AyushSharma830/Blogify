import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();  //se docs->Authentication in appwrite for these 
    account;

    constructor() {     //we w
        this.client
            .setEndpoint('conf.appwriteURL')                      // Your API Endpoint
            .setProject('conf.appwriteProductId');               // Your project ID

        account = new Account(client);
    }
}

const authService = new AuthService();

export default authService;