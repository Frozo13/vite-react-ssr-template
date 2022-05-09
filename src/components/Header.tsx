import React, { FC, LinkHTMLAttributes } from 'react'
import { usePageContext } from '@/renderer/usePageContext'
import classNames from 'classnames'
import Link from '@/components/Link'

const links = [
  {
    url: '/',
    text: 'Index page'
  },
  {
    url: '/about',
    text: 'About page'
  }
]

const Header: FC = () => {
  return (
    <header className="bg-gradient-to-r border-b from-purple-200 to-pink-200 text-center p-2 ">
      <h1 className="font-bold text-lg mb-2">
        VITE + REACT18 + MOBX + WINDICSS SSR TEMPLATE
      </h1>

      <ul className="flex justify-center">
        {links.map((link, index) => (
          <li key={index} className="not-last:mr-5">
            <HeaderLink href={link.url}>{link.text}</HeaderLink>
          </li>
        ))}
      </ul>
    </header>
  )
}

const HeaderLink: FC<LinkHTMLAttributes<HTMLLinkElement>> = ({
  href,
  children
}) => {
  const pageContext = usePageContext()

  const linkStyle = classNames({
    'text-blue-600': pageContext.urlPathname === href
  })

  return (
    <Link href={href} className={linkStyle}>
      {children}
    </Link>
  )
}

export default Header
