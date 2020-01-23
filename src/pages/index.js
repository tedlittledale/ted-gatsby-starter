import React from "react"
import { Link } from "gatsby"
import { compose } from "ramda"
import { observer } from "mobx-react-lite"
import { withPaths } from "../utils/store"
import withLocation from "../utils/withLocation"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ testModel, search }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Ted Gatsby Starter</h1>
    <pre>{JSON.stringify({ testModel })}</pre>
    <pre>{JSON.stringify({ search })}</pre>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default compose(
  withPaths(["testModel"]),
  observer,
  withLocation
)(IndexPage)
