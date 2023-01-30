import products from '../mocks/products.json'
export const PER_PAGE = 10
/**
 * Paginates the list of products by page, this is one of the ways of doing pagination
 * when you know the total of products and jumping to X page is fast in your DB.
 */
export default async function getProducts({
  organization,
  page,
}: {
  organization: string
  page: number
}) {
  // Usually pagination is done by your DB, and the total is also known by the
  // DB, in this case we're using a demo json so things are simpler.
  const paginatedProducts = products.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  return { products: paginatedProducts, total: products.length }
}
