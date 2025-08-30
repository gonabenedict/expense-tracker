import React from "react"
import { useEffect, useState} from 'React'
import {query , collection } from "fiebase/firestore";
import {db} from  "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo";
import { onSnapshot } from "firebase/firestore";

export const useGetTransactions = () => {
    const [transaction, setTransactions] = useState([]);

    const transactionCollectionRef = collection(db, "transactions");
    const { userID } = useGetUserInfo();

    const getTransactions = async () => {
        let unsubscribe;
        try{

            const queryTransactions = query(
                transansactionCollectionRef, 
                where ("userID", "==", userID ),
                ordeBy("createdAt")
            );

             unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];

                snapshot.forEach((doc) =>{
                    const data = doc.data();
                    const id = doc.id

                    docs.push({...data,id});

                })

                setTransactions(docs);
            })



        } catch (err){
            console.error(err)
        }

    }

    useEffect(() => {
        getTransactions()
    }, [])

    return {transaction}
}