import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { jobsFetcher } from '../services/jobs'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await jobsFetcher()

  return {
    props: {
      jobs: data.jobs
    }
  }
}

const HomePage = ({ jobs }) => {
  dayjs.extend(relativeTime)

  return (
    <>
      <Head>
        <title>Next + GraphQL PoC</title>
        <meta name="description" content="The proof of concept for Next.js and GraphQL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="light" expand="lg">
        <Container fluid="lg">
          <Link href="/" passHref>
            <Navbar.Brand>The Job Listing</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>

      <Container className="pt-5">
        <Row>
        {jobs.map(job => (
          <Col lg={3} className="pb-4" key={job.id}>
            <Card>
              {job.company.logoUrl !== null && job.company.logoUrl !== '' ? <Card.Img variant="top" alt={job.company.name + " logo"} src={job.company.logoUrl} /> : null}
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle>{job.company.name}</Card.Subtitle>
                <div className="pt-3">
                  {job.tags.map(tag => (
                    <span className="badge bg-primary pr-3" key={tag.id} style={{marginRight: 5}}>{tag.name}</span>
                  ))}
                </div>
                <Card.Text className="pt-3">{job.cities.length > 0 ? "Location:" : null} {job.cities.map(city => city.name + ", ")} <i>{job.commitment.title}</i></Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                {dayjs(job.postedAt).fromNow()}
              </Card.Footer>
            </Card>
          </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default HomePage
