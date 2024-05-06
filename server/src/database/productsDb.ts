import fs from 'fs'

export function readDB() {
  const data = fs.readFileSync('../../db/products.json', 'utf-8')

  return JSON.parse(data)
}