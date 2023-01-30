import Image from 'next/image'
import {
  Layout,
  Text,
  Page,
  Button,
  Link,
  List,
  Code,
} from '@vercel/examples-ui'
function Home() {
  return (
    <Page>
      <section>
        <Text variant="h1" className="mb-6">
          Pagination with SSG
        </Text>
        <Text className="mb-4">
          This example shows how to implement page based pagination with{' '}
          <Link href="https://nextjs.org/docs/basic-features/data-fetching/get-static-props">
            SSG
          </Link>{' '}
          in Next.js.
        </Text>
      </section>

      <hr className="border-t border-accents-2 my-6" />

      <section className="flex justify-between items-center gap-3">
        <Link href="/organization/org1/jobs">
          <Button>Organization 1</Button>
        </Link>
        <Link href="/organization/org2/jobs">
          <Button>Organization 2</Button>
        </Link>
      </section>
    </Page>
  )
}

Home.Layout = Layout

export default Home
