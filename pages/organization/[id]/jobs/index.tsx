import { GetStaticProps } from 'next'
import { Layout, Page } from '@vercel/examples-ui'
import getProducts, { PER_PAGE } from '../../../../lib/getProducts'
import PaginationPage from '../../../../components/PaginatedPage'

function JobBoard({ organizationId, products, totalProducts, currentPage }: any) {
	return (
		<Page>
			<h1>JOB BOARD</h1>

			<PaginationPage organizationId={organizationId} products={products} currentPage={currentPage} totalProducts={totalProducts} perPage={PER_PAGE} />
		</Page>
	)
}

export async function getStaticPaths() {
	const organizations = ['org1', 'org2'] // get from DB
	return {
		paths: organizations.map(organization => ({
			params: { id: organization }
		})),
		fallback: 'blocking', // can be true | false | 'blocking'
		// return 404 if organization doesn't exists
	}
}

export const getStaticProps: GetStaticProps = async (context) => {
	const organizationId = context.params?.id || 'na'
	const { products, total } = await getProducts({ organization: organizationId as string, page: 1 })

	/**
	 * dont be afraid to throw Error if necessary
	 */

	return {
		props: {
			organizationId,
			products,
			totalProducts: total,
			currentPage: 1,
		},
		revalidate: 60 * 30, // <--- ISR cache: once every 30 mint
	}
}

JobBoard.Layout = Layout

export default JobBoard
