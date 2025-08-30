import { useState } from 'react'
import { useAddTransaction } from "../../hooks/useAddTransaction";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();

    const [descripton, setDescripton] = useState("");
    const [transactonAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");

    const onSubmitn= async (e) => {
        e.preventDefault()
        addTransaction({descripton , transactonAmount, transactionType,})

    }

    return (
        <>
        <div className="expense-tracker"> 
            <div className="container">
                <h1>Expense Tracker</h1>
                <div className="balance">
                    <h3> Your Balance</h3>
                    <h2>$0.00</h2>
                </div>
                <div className="summary">
                    <div className="income">
                        <h4>Income</h4>
                        <p>$0.00</p>
                    </div>
                    <div className="expesnses">
                        <h4> Expenses </h4>
                        <p>$ 0.00</p>
                    </div>
                    

                </div>
                <form className="add-transaction" onSubmit={onsubmit} >
                    <input type="text" placeholder="Descripton" required onChange={(e) => setDescripton(e.target.value)}/>
                    <input type="number" placeholder="Amount" required onChange={(e) => setTransactionAmount(e.target.value)}/>
                    <input type="radio" id="expense" value="expense" checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} />
                    <label htmlFor="expense"> Expense</label>
                        <input type="radio" id="income" value="income" checked={transactionType === "income"} onChange={(e) => setTransactionType(e.target.value)}/>
                    <label htmlFor="income"> Income</label>

                    <button type="submit"> Add Transaction</button>
                </form>

            </div>
        </div>

        <div className="transactions">
            <h3> Transactions</h3>

        </div>
        </>
    );
};