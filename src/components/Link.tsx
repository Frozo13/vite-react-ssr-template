import React, { AnchorHTMLAttributes, FC } from 'react'
import { usePageContext } from '@/renderer/usePageContext'
import classNames from 'classnames'

const Link: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  children,
  className
}) => {
  const pageContext = usePageContext()
  const style = classNames(
    { 'is-active': pageContext.urlPathname === href },
    className
  )

  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pageContext.urlPathname === href) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <a href={href} onClick={onClick} className={style}>
      {children}
    </a>
  )
}

export default Link
