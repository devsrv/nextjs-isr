import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import getProducts, { PER_PAGE } from '../../../../lib/getProducts'
import { Layout, Page } from '@vercel/examples-ui'
import Head from 'next/head'
import PaginationPage from '../../../../components/PaginatedPage'

type PageProps = {
	organizationId: string
	products: any[]
	currentPage: number
	totalProducts: number
}

function PaginatedPage({ organizationId, products, currentPage, totalProducts }: PageProps) {
	return (
		<Page>
			<Head>
				<title>Page {currentPage} - SSG Pagination Example</title>
				<meta name="description" content={`Statically generated page ${currentPage}`} />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PaginationPage organizationId={organizationId} products={products} currentPage={currentPage} totalProducts={totalProducts} perPage={PER_PAGE} />
		</Page>
	)
}

PaginatedPage.Layout = Layout

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
	const page = Number(params?.page) || 1
	const organizationId = params?.id || 'na'
	const { products, total } = await getProducts({ organization: organizationId as string, page })

	if (!products.length) {
		return {
			notFound: true,
		}
	}

	// Redirect the first page to `/[orgid]/jobs` to avoid duplicated content
	if (page === 1) {
		return {
			redirect: {
				destination: `/organization/${organizationId}/jobs`,
				permanent: false,
			},
		}
	}

	return {
		props: {
			organizationId,
			products,
			totalProducts: total,
			currentPage: page,
		},
		revalidate: 60 * 30, // <--- ISR cache: once every 30 mint
	}
}

export async function getStaticPaths() {
	const organizations = ['org1', 'org2'] // get from DB
	return {
		paths: organizations.map(organization => ({
			params: { id: organization, page: '2' } // pre building upto page 2, page 1 prebuild taken cared by index.tsx
		})),
		fallback: 'blocking', // can be true | false | 'blocking'
	}
}

export default PaginatedPage
