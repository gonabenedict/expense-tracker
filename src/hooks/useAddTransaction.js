import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransaction = () => {
    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();
    
    const addTransaction = async ({ description, transactionAmount, transactionType }) => {
        try {
            await addDoc(transactionCollectionRef, {
                userID,
                description,
                transactionAmount: Number(transactionAmount),
                transactionType, 
                createdAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    return { addTransaction };
};


  
