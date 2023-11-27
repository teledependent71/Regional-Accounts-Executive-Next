import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Regional Accounts Executive</title>
          <meta
            property="og:title"
            content="test-page - Regional Accounts Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_709as) => (
            <>
              <h1>{context_709as?.Name}</h1>
            </>
          )}
          initialData={props.context709asProp}
          persistDataDuringLoading={true}
          key={props?.context709asProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const context709asProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        context709asProp: context709asProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
