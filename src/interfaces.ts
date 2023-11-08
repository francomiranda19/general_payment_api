export interface RequestBody {
  transferCode: string
  amount: number
}

export interface PaymentInfo {
  ip: string
  amount: number
  email: string
  retries: number
  transferCode: string
}
