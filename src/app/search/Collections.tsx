import Link from 'next/link';
import React from 'react'

const Collections = ({selected} : {selected: string | null}) => {
  return (
    <Link className="flex mt-5 bg-black w-fit text-white px-6 py-3 rounded-full items-center gap-3 ml-auto" href='/collections'>
      <span className="font-bold uppercase">{selected || 'SELECT COLLECTION'}</span>
      <span>
        <svg width="27" height="15" viewBox="0 0 27 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.0186 15C13.5323 14.9853 14.002 14.7945 14.3836 14.3836L25.5382 2.96477C25.8611 2.64188 26.0372 2.23092 26.0372 1.74658C26.0372 0.777886 25.274 0 24.3053 0C23.8356 0 23.3806 0.190802 23.0431 0.528376L13.0333 10.817L2.99413 0.528376C2.65656 0.205479 2.21624 0 1.7319 0C0.763209 0 0 0.777886 0 1.74658C0 2.23092 0.176125 2.64188 0.499021 2.96477L11.6683 14.3836C12.0646 14.7945 12.5049 15 13.0186 15Z" fill="white"/>
        </svg>
      </span>
    </Link>
  )
}

export default Collections;