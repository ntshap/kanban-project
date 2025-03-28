'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { BarChart } from './components/bar-chart';
import { SummaryCard } from './components/summary-card';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('year');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockTransactions: Transaction[] = [
      { id: 1, date: '2025-03-25', description: 'Event ticket sales', amount: 1500, type: 'income' },
      { id: 2, date: '2025-03-24', description: 'Venue rental', amount: 800, type: 'expense' },
      { id: 3, date: '2025-02-15', description: 'Workshop registration', amount: 1200, type: 'income' },
      { id: 4, date: '2025-02-10', description: 'Marketing expenses', amount: 500, type: 'expense' },
      { id: 5, date: '2025-01-20', description: 'Sponsorship', amount: 2000, type: 'income' },
      { id: 6, date: '2025-01-15', description: 'Equipment rental', amount: 700, type: 'expense' },
    ];

    setTransactions(mockTransactions);
    generateMonthlyData(mockTransactions);
  }, []);

  const generateMonthlyData = (trans: Transaction[]) => {
    const monthlyMap = new Map<string, { income: number; expense: number }>();
    
    trans.forEach(t => {
      const month = t.date.substring(0, 7); // YYYY-MM
      const current = monthlyMap.get(month) || { income: 0, expense: 0 };
      
      if (t.type === 'income') {
        current.income += t.amount;
      } else {
        current.expense += t.amount;
      }
      
      monthlyMap.set(month, current);
    });

    const sortedData = Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleString('default', { month: 'long' }),
        ...data
      }))
      .sort((a, b) => new Date(b.month).getTime() - new Date(a.month).getTime());

    setMonthlyData(sortedData);
  };

  const calculateTotals = () => {
    const totals = transactions.reduce(
      (acc, t) => {
        if (t.type === 'income') {
          acc.totalIncome += t.amount;
        } else {
          acc.totalExpense += t.amount;
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );

    return {
      ...totals,
      netIncome: totals.totalIncome - totals.totalExpense,
      profitMargin: ((totals.totalIncome - totals.totalExpense) / totals.totalIncome * 100) || 0
    };
  };

  const totals = calculateTotals();

  const incomeByMonth = monthlyData.map(d => ({
    label: d.month,
    value: d.income,
    color: 'bg-green-500'
  }));

  const expenseByMonth = monthlyData.map(d => ({
    label: d.month,
    value: d.expense,
    color: 'bg-red-500'
  }));

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard
          title="Total Income"
          value={`$${totals.totalIncome.toFixed(2)}`}
          trend={{ value: 12.5, isPositive: true }}
        />
        <SummaryCard
          title="Total Expenses"
          value={`$${totals.totalExpense.toFixed(2)}`}
          trend={{ value: 8.2, isPositive: false }}
        />
        <SummaryCard
          title="Net Income"
          value={`$${totals.netIncome.toFixed(2)}`}
          trend={{ value: 4.3, isPositive: true }}
        />
        <SummaryCard
          title="Profit Margin"
          value={`${totals.profitMargin.toFixed(1)}%`}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarChart
          title="Monthly Income"
          data={incomeByMonth}
        />
        <BarChart
          title="Monthly Expenses"
          data={expenseByMonth}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((month, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div className="font-medium">{month.month}</div>
                <div className="space-x-4">
                  <span className="text-green-600">Income: ${month.income.toFixed(2)}</span>
                  <span className="text-red-600">Expenses: ${month.expense.toFixed(2)}</span>
                  <span className={month.income - month.expense >= 0 ? 'text-green-600' : 'text-red-600'}>
                    Net: ${(month.income - month.expense).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
