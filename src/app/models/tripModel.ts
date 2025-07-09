export enum StatusTrip{
    planejamento = 'planejamento',
    concluida = 'concluida',
    cancelada = 'cancelada'
}

export interface TripModel{
    _id: string,
    userId: string,
    destination: string,
    totalBudget: number,
    startDate: Date,
    endDate: Date,
    status: StatusTrip
}