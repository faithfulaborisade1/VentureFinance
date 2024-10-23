import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"; // Firestore functions
import { db } from "../firebase"; // Adjusted path to point to the firebase.jsx file
import Navbar from "../NavbarPage/Navbar";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "./Dashboard.scss";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0); // Starting balance
  const [filter, setFilter] = useState("lastMonth"); // Default filter

  // Fetch the currently authenticated user and transactions
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("Logged-in User UID:", currentUser.uid); // Logs the UID in the console
      setUser(currentUser);
      fetchTransactions(currentUser.uid, filter); // Fetch transactions using the correct UID
    }
  }, [auth, filter]);
  

  // Function to fetch transactions from Firestore
  const fetchTransactions = async (userId, filter) => {
    let transactionsQuery;
    const transactionsRef = collection(db, "transactions");

    const now = new Date();
    let startDate;
    if (filter === "lastMonth") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    } else if (filter === "lastSixMonths") {
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    } else {
      startDate = new Date(0); // Default: Fetch all
    }

    transactionsQuery = query(transactionsRef, where("userId", "==", userId), where("date", ">=", startDate), orderBy("date", "desc"));
    const querySnapshot = await getDocs(transactionsQuery);

    const transactionList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Fetched Transactions:", transactionList);

    setTransactions(transactionList);

    // Calculate balance from transactions
    const totalBalance = transactionList.reduce((acc, transaction) => acc + transaction.amount, 0);
    setBalance(totalBalance);
  };

  // Chart data based on fetched transactions
  const spendingData = {
    labels: transactions.map((transaction) => new Date(transaction.date.seconds * 1000).toLocaleDateString()),
    datasets: [
      {
        label: "Spending",
        data: transactions.map((transaction) => transaction.amount),
        borderColor: "#2F8F9D",
        backgroundColor: "rgba(47, 143, 157, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-content">
        <h1>Welcome to your Dashboard</h1>
        {user ? (
          <p>Hello, {user.displayName || user.email}! Welcome back.</p>
        ) : (
          <p>Loading user information...</p>
        )}

        <div className="overview-section">
          <h2>Total Balance: ${balance.toFixed(2)}</h2>

          {/* Filter Buttons */}
          <div className="filter-buttons">
            <button onClick={() => setFilter("lastMonth")}>Last Month</button>
            <button onClick={() => setFilter("lastSixMonths")}>Last 6 Months</button>
            <button onClick={() => setFilter("all")}>All Time</button>
          </div>

          {/* Recent Transactions */}
          <div className="transaction-section">
            <h3>Recent Transactions</h3>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span>{new Date(transaction.date.seconds * 1000).toLocaleDateString()}</span> - 
                  <span>{transaction.description}</span> - 
                  <span className={transaction.amount < 0 ? "negative" : "positive"}>
                    {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spending Trend Chart */}
          <div className="chart-section">
            <h3>Spending Trend</h3>
            <Line data={spendingData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
