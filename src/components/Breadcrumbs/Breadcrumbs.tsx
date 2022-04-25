import React, { VFC } from 'react';

import cn from 'clsx';

import './styles.scss';
import { NavLink } from 'react-router-dom';
import { ChevronDown, HomeIcon } from 'assets/icons/icons';
import { Text } from 'components/Typography';

export type BreadcrumbsPaths = {
  path: string;
  label: string;
};
export interface BreadcrumbsProps {
  paths: BreadcrumbsPaths[];
  className?: string;
}

export const Breadcrumbs: VFC<BreadcrumbsProps> = ({ paths, className }) => (
  <div className="breadcrumbs__wrapper">
    <nav className={cn('breadcrumbs', className)}>
      {paths.length > 1 && (
        <NavLink to="/" className="breadcrumb-label">
          <HomeIcon className="breadcrumb-home" />
        </NavLink>
      )}
      <ul className="breadcrumbs-container">
        {paths.length > 1 &&
          paths.map(({ label, path }, index) => (
            <li key={path} className="breadcrumb">
              <NavLink
                className={
                  index === paths.length - 1 ? 'breadcrumb-label-last' : 'breadcrumb-label'
                }
                to={path}
              >
                <Text className="breadcrumb-label-text">{label}</Text>
              </NavLink>
              {index < paths.length - 1 && (
                <ChevronDown width="35px" className="breadcrumb-breaker" fill="#8F90A6" />
              )}
            </li>
          ))}
      </ul>
    </nav>
  </div>
);
