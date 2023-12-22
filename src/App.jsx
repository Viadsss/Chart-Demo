import { useState } from "react";
import { BarChartData } from "./models";
import { updateAllowance, updateExpenses } from "./utils/BarUtils";
import BarChart from "./components/BarChart";
import BarChartFull from "./components/BarChartFull";

const App = () => {
  const [barData, setBarData] = useState(BarChartData);
  const [currentDay, setcurrentDay] = useState(1);
  const [allowanceAmount, setAllowanceAmount] = useState("");
  const [expensesAmount, setExpensesAmount] = useState("");
  const [currentFunds, setCurrentFunds] = useState(0);
  const [maxAllowance, setmaxAllowance] = useState(0);
  const [maxExpenses, setMaxExpenses] = useState(0);

  const handleAllowance = () => {
    const amount = parseInt(allowanceAmount);

    if (!Number.isNaN(amount)) {
      setmaxAllowance((cur) => cur + amount);
      const newData = updateAllowance(
        currentDay,
        amount + maxAllowance,
        barData
      );

      setBarData(newData);
      setCurrentFunds((cur) => cur + parseInt(amount));
    }
    setAllowanceAmount("");
  };

  const handleExpenses = () => {
    const amount = parseInt(expensesAmount);

    if (!Number.isNaN(amount)) {
      setMaxExpenses((cur) => cur + amount);
      const newData = updateExpenses(currentDay, amount + maxExpenses, barData);

      setBarData(newData);
      setCurrentFunds((cur) => cur - parseInt(amount));
    }
    setExpensesAmount("");
  };

  const handleNextDay = () => {
    const currentDayData = barData.find((data) => data.day === currentDay);

    if (
      !currentDayData ||
      currentDayData.allowance === null ||
      currentDayData.expenses === null
    ) {
      alert(
        "Add expense and allowance for the current day before moving to the next day\n" +
          "\n Note: Put 0 on inputs that does not update within that day!"
      );
      return;
    }

    currentDay < 30
      ? setcurrentDay((cur) => cur + 1)
      : alert("End of the month reached!");
    setAllowanceAmount("");
    setExpensesAmount("");
  };

  return (
    <div>
      <h1>Day {currentDay}</h1>
      <h2>Funds this month: {currentFunds}</h2>
      <label>
        Allowance:
        <input
          type="text"
          name="allowance"
          value={allowanceAmount}
          onChange={(e) => setAllowanceAmount(e.target.value)}
        />
      </label>
      <label>
        Expenses:
        <input
          type="text"
          name="expenses"
          value={expensesAmount}
          onChange={(e) => setExpensesAmount(e.target.value)}
        />
      </label>
      <div>
        <div>Allowance: {allowanceAmount}</div>
        <div>Expenses: {expensesAmount}</div>
      </div>
      <button onClick={() => handleAllowance()}>Add Allowance</button>
      <button onClick={() => handleExpenses()}>Add Expenses</button>
      <br />
      <button onClick={() => handleNextDay()}>Next Day</button>
      <BarChart chartData={barData} />
      <br />
      <br />
      <br />
      <BarChartFull chartData={barData} />
    </div>
  );
};

export default App;
