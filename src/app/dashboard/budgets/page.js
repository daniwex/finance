"use client";
import ModalBudget from "@/components/ModalBudget";
import Piechart from "@/components/Piechart";
import Summary from "@/components/Summary";
import { aggregateTable } from "@/utility/utils";
import { useState, useEffect, useRef } from "react";

export default function page() {
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState("entertainment");
  const [spend, setSpend] = useState("");
  const [theme, setTheme] = useState("green");
  const [message, setMessage] = useState("");
  const [budgets, setBudgets] = useState();
  const [transactions, setTransactions] = useState();
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState()

  async function submit(e) {
    e.preventDefault();
    if (category == "" || spend == "" || theme == "") {
      return;
    }
    const data = {
      category,
      spend,
      theme,
    };
    try {
      const req = await fetch("/api/budget", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (req.ok) {
        const res = await req.json();
        setMessage(res.message);
        setOpenModal(false);
        setTheme("green");
        setSpend("");
        setCategory("entertainment");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getData() {
      try {
        const req = await fetch("/api/budget");
        if (req.ok) {
          const res = await req.json();
          setBudgets(res.budgets);
          setTransactions(res.transaction);
          const d = [res.transaction.map(el => [el.transactionCategory,el.transactionAmount])]
          const data = {
            budget: res.budgets.map((el,index) => [el.category, el.theme, el.spend]),
            spending: d
          };
          const m = aggregateTable(data)
          setChartData(data);
          setSummary(m)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  return (
    <div className="h-screen overflow-y-scroll p-5">
      <div className="flex justify-between">
        <h2 className="text-xl">Budgets</h2>
        <button
          className="text-xs h-fit w-fit px-2 py-2 bg-grey_500 text-white"
          onClick={() => setOpenModal(true)}
        >
          Add New Budget
        </button>
      </div>
      <div className="block sm:flex sm:justify-between mt-10">
        <div className="h-fit py-10 px-5 bg-white sm:w-2/5 grid grid-col-1">
          <div className="flex justify-center w-full">
            <Piechart data={chartData} />
          </div>
          <div className="text-left mt-14">
            <h2 className="font-bold text-lg">Spending Summary</h2>
            <Summary data={summary} />
          </div>
        </div>
        <div></div>
      </div>
      {openModal ? (
        <ModalBudget
          closeBtn={() => setOpenModal(false)}
          onchangeCategory={(e) => setCategory(e.target.value)}
          onchangeSpend={(e) => setSpend(e.target.value)}
          onchangeTheme={(e) => setTheme(e.target.value)}
          onsubmit={(e) => submit(e)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
