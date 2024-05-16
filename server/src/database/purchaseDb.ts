import fs from 'fs'

export async function userLastPurchaseDB(email: string) {
  const {purchases} = await JSON.parse(fs.readFileSync('./db/purchases.json', 'utf-8'))
  const userPurchases = purchases.filter((purchase: any) => purchase.user === email)

  const purchase = userPurchases[userPurchases.length - 1]

  return purchase
}