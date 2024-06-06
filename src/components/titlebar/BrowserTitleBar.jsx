import React from 'react'
import { Helmet } from 'react-helmet'

const BrowserTitleBar = ({ title }) => {
  return (
    <>
      <Helmet>
        <title>Raspi | {title}</title>
      </Helmet>
    </>
  )
}

export default BrowserTitleBar;