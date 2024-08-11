export type ShoeAttributes = {
  color: string, 
  sizes: [{
    size: string, 
    amount: number
  }]
  price: string
}

export type BookAttributes = {
  type: string, 
  amount: number,
  price: string
}

export type CoffeeAttributes = {
  milk: string, 
  sizes: [{
    size: string, 
    amount: number,
    price: string
  }]
}

export type EarringAttributes = {
  color: string, 
  amount: number,
  price: string
}

export type ProductsProps = [{
  _id: string
  name: string
  brand: string
  category: 'shoe' | 'book' | 'earring' | 'coffee'
  description: string
  image: [string]
  attributes: [ShoeAttributes] | [BookAttributes] | [EarringAttributes] | [CoffeeAttributes]
  reviews: [{
    comment: string
    stars: number
  }]
  shippingFree: boolean
  discount: string | false
}]