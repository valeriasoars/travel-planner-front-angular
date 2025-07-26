export interface ExpenseModel{
    _id: string,
    tripId: string,
    categoryExpenseId: string,
    description: string,
    value: number,
    date: Date
}