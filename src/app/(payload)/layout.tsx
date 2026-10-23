import config from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClientArgs } from 'payload'
import React from 'react'

import { importMap } from './admin/importMap'
import './custom.css'

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: ServerFunctionClientArgs) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
