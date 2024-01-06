//Making a Service for Authentication

import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//To make service making a class and inside it we will be making methods for authentication.
export class AuthService {
    client = new Client();  //se docs->Authentication in appwrite for these 
    account;

    constructor() {     //we want the client and account to be set up not directly in class but rather at time of object inititlaisation
        this.client
            .setEndpoint(conf.appwriteURL)                      // Your API Endpoint
            .setProject(conf.appwriteProductId);               // Your project ID

        account = new Account(this.client);
    }

    //Now making different methods for different purpose and underlying we will be using appwrite but later if we want to change appwrite then these methods remains same just their underlying defination changes
    async createAccount({ email, password, name }) {    //{}is used to directly destructutre the parameter passed at time of method calling
        try {   //since acc. creation may fail
            const userAccount = await this.account.create(ID.unique(), email, passwword, name);
            if (userAccount) {
                return this.login({ email, password }); //since if acc. is created we want that it directly logs in
            }
            else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }
    //to see these different functions see docs 
    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;    //in case of any error before try catch
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;    //in case of any error before try catch
    }
}

const authService = new AuthService();  //Making object of class and exporting directly the object rather than exporting class

export default authService;