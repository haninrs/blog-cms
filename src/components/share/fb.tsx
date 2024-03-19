'use client'

import React from 'react'
import { FacebookShareButton, TwitterIcon } from 'react-share'

export default function FacebookButton({slug, url}: {slug: string, url:string}) {
  return (
    <FacebookShareButton url={`${url}/blog/${slug}`}>
        <TwitterIcon size={32} round/>
    </FacebookShareButton>
  )
}
