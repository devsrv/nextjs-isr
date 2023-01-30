import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { Layout, Page } from '@vercel/examples-ui'

function JobDetail({ job }: {job: {id: number, title: string}}) {
	return (
		<Page>
			<h1>JOB Detail</h1>
			<p>{job.title}</p>
		</Page>
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		// Prerender these slug pages
		// Other pages will be prerendered at runtime then cached.
		paths: [],
		fallback: 'blocking', // can be true | false | 'blocking'
		// if job detail page doesn't exists in previous static build then do a blocking SSR
		// after SSR this page is also cached
	}
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
	const organizationId = params?.id || 'na'
	const slug = params?.slug || 'na'

	/*
  // If this request throws an uncaught error, Next.js will
  // not invalidate the currently shown page and
  // retry getStaticProps on the next request.
  const res = await getJobDetail({ organizationId, slug })
  const posts = await res.json()

  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${res.status}`)
  }
*/

	const missing = slug === 'error-slug' ? true : false

	if (missing) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			job: { id: 1, title: `job ${slug}` },
		},
		revalidate: 60 * 60 * 24, // <--- ISR cache: once a day
	}
}

JobDetail.Layout = Layout

export default JobDetail
