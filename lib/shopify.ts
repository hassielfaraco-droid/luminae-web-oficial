// ─── Shopify Storefront API Client ──────────────────────────────────────────
// Lee variables de entorno — ponlas en .env.local (local) y en Vercel (producción)

const DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const TOKEN   = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!
const API_URL = `https://${DOMAIN}/api/2024-01/graphql.json`

// ─── Fetch base ──────────────────────────────────────────────────────────────
async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':                    'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  })
  if (!res.ok) throw new Error(`Shopify fetch error: ${res.status}`)
  const { data, errors } = await res.json()
  if (errors) throw new Error(errors[0]?.message ?? 'Shopify GraphQL error')
  return data as T
}

// ─── Helpers ────────────────────────────────────────────────────────────────
export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount))
}

// ─── Types ───────────────────────────────────────────────────────────────────
export interface ShopifyProduct {
  id:    string
  title: string
  handle: string
  vendor: string
  description: string
  tags: string[]
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
  compareAtPriceRange?: { minVariantPrice: { amount: string; currencyCode: string } }
  featuredImage?: { url: string; altText?: string | null } | null
  images: { edges: Array<{ node: { url: string; altText?: string | null } }> }
  variants: {
    edges: Array<{
      node: {
        id:               string
        title:            string
        availableForSale: boolean
        price:            { amount: string; currencyCode: string }
        compareAtPrice?:  { amount: string; currencyCode: string } | null
        selectedOptions:  Array<{ name: string; value: string }>
      }
    }>
  }
}

export interface CartLine {
  id:       string
  quantity: number
  merchandise: {
    id:    string
    title: string
    price: { amount: string; currencyCode: string }
    selectedOptions: Array<{ name: string; value: string }>
    product: {
      title: string
      handle: string
      featuredImage?: { url: string; altText?: string | null } | null
    }
  }
}

export interface Cart {
  id:          string
  checkoutUrl: string
  lines:       { edges: Array<{ node: CartLine }> }
  cost: {
    subtotalAmount: { amount: string; currencyCode: string }
    totalAmount:    { amount: string; currencyCode: string }
    totalTaxAmount?: { amount: string; currencyCode: string } | null
  }
}

// ─── Fragmento reutilizable del carrito ─────────────────────────────────────
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              selectedOptions { name value }
              product {
                title
                handle
                featuredImage { url altText }
              }
            }
          }
        }
      }
    }
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount    { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
  }
`

// ─── Cart API ────────────────────────────────────────────────────────────────
export async function cartCreate(): Promise<Cart> {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>(`
    mutation cartCreate {
      cartCreate {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `)
  return data.cartCreate.cart
}

export async function cartGet(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: Cart | null }>(`
      query cartGet($id: ID!) {
        cart(id: $id) { ...CartFields }
      }
      ${CART_FRAGMENT}
    `, { id: cartId })
    return data.cart
  } catch {
    return null
  }
}

export async function cartLinesAdd(cartId: string, lines: Array<{ merchandiseId: string; quantity: number }>): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>(`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, { cartId, lines })
  return data.cartLinesAdd.cart
}

export async function cartLinesUpdate(cartId: string, lines: Array<{ id: string; quantity: number }>): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>(`
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, { cartId, lines })
  return data.cartLinesUpdate.cart
}

export async function cartLinesRemove(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>(`
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
      }
    }
    ${CART_FRAGMENT}
  `, { cartId, lineIds })
  return data.cartLinesRemove.cart
}

// ─── Products API ────────────────────────────────────────────────────────────
const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id title handle vendor description tags
    priceRange        { minVariantPrice { amount currencyCode } }
    compareAtPriceRange { minVariantPrice { amount currencyCode } }
    featuredImage { url altText }
    images(first: 8) { edges { node { url altText } } }
    variants(first: 10) {
      edges {
        node {
          id title availableForSale
          price         { amount currencyCode }
          compareAtPrice { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`

export async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: ShopifyProduct | null }>(`
    query getProduct($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
    ${PRODUCT_FRAGMENT}
  `, { handle })
  return data.product
}

export async function getProducts(first = 24): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(`
    query getProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        edges { node { ...ProductFields } }
      }
    }
    ${PRODUCT_FRAGMENT}
  `, { first })
  return data.products.edges.map(e => e.node)
}

export async function getProductsByCollection(handle: string, first = 24): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{
    collection: { products: { edges: Array<{ node: ShopifyProduct }> } } | null
  }>(`
    query getCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        products(first: $first, sortKey: BEST_SELLING) {
          edges { node { ...ProductFields } }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `, { handle, first })
  return data.collection?.products.edges.map(e => e.node) ?? []
}

export async function searchProducts(query: string, first = 20): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(`
    query searchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges { node { ...ProductFields } }
      }
    }
    ${PRODUCT_FRAGMENT}
  `, { query, first })
  return data.products.edges.map(e => e.node)
}
