import { useEffect, useState } from 'react';
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionsTotals, setTransactionsTotals] = useState({balance: 0.0, income: 0.0, expenses: 0.0});
    const { userID } = useGetUserInfo();

    useEffect(() => {
        if (!userID) return;

        let unsubscribe;
        
        const getTransactions = () => {
            try {
                const transactionCollectionRef = collection(db, "transactions");
                const queryTransactions = query(
                    transactionCollectionRef, 
                    where("userID", "==", userID),
                    orderBy("createdAt")
                );

                unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                    let docs = [];
                    let totalIncome = 0.0;
                    let totalExpenses = 0.0;
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        const id = doc.id;
                        docs.push({ ...data, id });
                        if (data.transactionType === "expense") {
                            totalExpenses += Number(data.transactionAmount);
                        } else {
                            totalIncome += Number(data.transactionAmount);
                        }
                    });
                    setTransactions(docs);
                    setTransactionsTotals({
                        balance: totalIncome - totalExpenses,
                        income: totalIncome,
                        expenses: totalExpenses
                    });
                });

            } catch (err) {
                console.error(err);
            }
        };

        getTransactions();

        // Cleanup function
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [userID]);

    return { transactions, transactionsTotals };
};