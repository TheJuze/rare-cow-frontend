import React, { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import cn from 'clsx';

import './styles.scss';
import { TBarOption } from 'types';

export interface TabBarProps {
  rootPath?: string;
  align?: 'vertical' | 'horizontal';
  className?: string;
  options: TBarOption[];
  tabClassName?: string;
  activeTab?: string;
  onChange?: (value: string) => void;
}

/**
 * @param {string} rootPath - the root path of the bar
 * @param {TBarOptions[]} options - the list of the tabs
 * @param {string} [className] - the wrapper class name
 * @param {string} [tabClassName] - single tab class name
 */
export const TabBar: VFC<TabBarProps> = ({
  align = 'horizontal',
  className,
  options,
  tabClassName,
  rootPath,
  activeTab,
  onChange,
}) => (
  <section className={cn('tab-bar__wrapper', className, align)}>
    <nav className={cn('tab-bar__wrapper__body')}>
      {options.map((opt) => (opt.redirect ? (
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
      ) : (
        <div
          key={opt.value}
          className={cn('tab-bar__wrapper__body-tab', tabClassName, {
            'active-tab': activeTab === opt.value,
          })}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon && <div className="tab-bar__wrapper__body-tab-icon__wrapper">{opt.icon}</div>}
          {opt.name || opt.value}
        </div>
      )))}
    </nav>
  </section>
);
