import { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import cn from 'clsx';

import './styles.scss';
import { TBarOption } from 'types';

export interface TabBarProps {
  rootPath: string;
  align?: 'vertical' | 'horizontal';
  className?: string;
  options: TBarOption[];
  tabClassName?: string;
}

export const TabBar: VFC<TabBarProps> = ({
  align = 'horizontal',
  className,
  options,
  tabClassName,
  rootPath,
}) => {
  return (
    <section className={cn('tab-bar__wrapper', className)}>
      <nav className={cn('tab-bar__wrapper__body', align)}>
        {options.map((opt) => (
          <NavLink
            key={opt.value}
            className={({ isActive }) => cn('tab-bar__wrapper__body-tab', tabClassName, {
              'active-tab': isActive,
            })}
            to={`${rootPath}${opt.value}`}
          >
            {opt.icon && <div className="tab-bar__wrapper__body-tab-icon__wrapper">{opt.icon}</div>}
            {opt.name || opt.value}
          </NavLink>
        ))}
      </nav>
    </section>
  );
};
