export interface Users {
    users: User[]
}

interface User {
    id: number
    lastname: string
    firstname: string
    email: string
    balance: number
    expenses: Expenses[]
}

interface Expenses{
    expenses: Expense[]
}

interface Expense{
    id: number
    amount: number
    date: Date
    category: string
    description: string
}
