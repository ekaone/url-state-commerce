import { FC } from 'react'
import cn from 'classnames'
import { useCart } from '@lib/bigcommerce/cart'
import { Avatar } from '@components/core'
import { Heart, Bag } from '@components/icon'
import { useUI } from '@components/ui/context'
import s from './UserNav.module.css'

interface Props {
  className?: string
}

const countItem = (count: number, item: any) => count + item.quantity

const countItems = (count: number, items: any[]) =>
  items.reduce(countItem, count)

const UserNav: FC<Props> = ({ className }) => {
  const { openSidebar } = useUI()
  const { data } = useCart()
  const itemsCount = Object.values(data?.line_items ?? {}).reduce(countItems, 0)

  return (
    <nav className={cn(s.root, className)}>
      <ul className={s.list}>
        <li className={s.item} onClick={() => openSidebar()}>
          <Bag />
          {itemsCount > 0 && (
            <span className="bg-black h-4 w-4 absolute rounded-full inset-3 text-white flex items-center justify-center font-bold text-xs">
              {itemsCount}
            </span>
          )}
        </li>
        <li className={s.item}>
          <Heart />
        </li>
        <li className={s.item}>
          <Avatar />
        </li>
      </ul>
    </nav>
  )
}

export default UserNav