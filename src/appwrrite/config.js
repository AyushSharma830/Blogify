//Making service for Database and Storage/Bucket

import conf from "../conf/conf";
import { Client, ID, Databases, Storage } from "appwrite";  //same as auth.js

export class Service {
    client = new Client();  //creating client
    databases;
    bucket;

    constructor() {     //setting up client at, database, storage at time of object initialisation
        this.client
            .setEndpoint(conf.appwriteURL)                      // Your API Endpoint
            .setProject(conf.appwriteProductId);               // Your project ID

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    //Database Service

    //to create a new post
    async createPost({ title, slug, content, featuredImage, status, userID }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,    //databse ID
                conf.appwriteCollectionId,  //Collection ID
                slug,   // Document/Object ID: unique string can also use ID.unique()
                {   //data as JSON object
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                });
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    //to update an existing post
    //since in update post we need the document/obj. id which is to be updated so we take slug seperately and userID is not needed 
    //as we will allow only the owner to update the post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,    //databse ID
                conf.appwriteCollectionId,  //Collection ID
                slug,   // Document/Object ID
                {   //data as JSON object
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                });
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    //to delete a post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,    //databse ID
                conf.appwriteCollectionId,  //Collection ID
                slug   // Document/Object ID
            );
            return true;    //to know at frontend that deletion is success
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;   //to know at frontend that deletion is failure
        }
    }

    //to retrieve a particular post using obj. id
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,    //databse ID
                conf.appwriteCollectionId,  //Collection ID
                slug   // Document/Object ID
            );
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    //to retreive all posts with status="active"
    async getPosts() {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,    //databse ID
                conf.appwriteCollectionId,  //Collection ID
                [   //query can be made only on those attributes which are made indexes or keys in appwrite
                    Query.equal("status", "active")   //query used to retrieve only those posts whose status=Active
                ]
            );
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    //Storage Service

    //to upload a file
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(    //return object id which we will send in featuredImage parameter at createPost time
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    //to delete a file
    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            );
            return true;
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    //to get the preview of a file
    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        );
    }
}

const service = new Service();
export default service;