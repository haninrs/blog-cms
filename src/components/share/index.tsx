

import React from 'react'
import TwitterButton from './twitter'
import FacebookButton from './fb'
import WaButton from './wa'
import LinkedButton from './linked'
import CopyButton from './copy'

const base_url = process.env.BASE_URL_WEB || ""

export default function ShareButton({slug, className}: {slug: string, className: string}) {
  return (
    <div className={`${className}`}>
        <p className=' text-xs font-bold text-gray-400 py-2'>SHARE</p>
        <div className='flex gap-1'>
            <TwitterButton slug={slug} url={base_url}/>
            <FacebookButton slug={slug} url={base_url} />
            <WaButton slug={slug} url={base_url} />
            <LinkedButton slug={slug} url={base_url} />
            <CopyButton slug={slug} url={base_url} />
        </div>
    </div>

  )

}
