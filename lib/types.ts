export interface ReportBook {
  id: number
  title: string
  author: string
  isbn: string
  totalLoans: number
}

export interface ReportReader {
  id: number
  name: string
  email: string
  totalLoans: number
}
