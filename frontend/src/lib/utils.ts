import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currentDate() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
  return formattedDate
}

export function formatDateTime(date: string) {
  const [year, month, day] = date.split('T')[0].split('-')
  return `${day}/${month}/${year}`
}

export function formatCurrency(amount: number) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}