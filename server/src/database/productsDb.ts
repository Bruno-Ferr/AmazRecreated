import fs from 'fs'

export function readDB() {
  const data = fs.readFileSync('./db/products.json', 'utf-8')

  return JSON.parse(data)
}

export function findProductDB(productId: number) {
  const {itemList} = JSON.parse(fs.readFileSync('./db/products.json', 'utf-8'))
  const [product] = itemList.filter((product: any) => product.id === productId)

  return product
}