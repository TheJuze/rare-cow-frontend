/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { Fragment, VFC } from 'react';

import cn from 'clsx';

import './styles.scss';

export interface HighlightedTextProps {
  text: string;
  filter?: string;
  className?: string;
  allMatches?: boolean;
}

/**
 * @param {string} text - the main value which be used as base of searching
 * @param {string} [filter=''] - the search value
 * @param {string} [className] - the wrapper class name
 * @param {boolean} [allMatches] - the flag that allows to highlight all matches of filter in the text
 */
export const HighlightedText: VFC<HighlightedTextProps> = ({
  className,
  text,
  filter = '',
  allMatches = false,
}): JSX.Element => {
  if (!filter) {
    return <span className={cn('highlighted-text-common', className)}>{text}</span>;
  }

  const regexp = new RegExp(filter, 'ig');
  const matchValue = text.match(regexp);

  if (matchValue) {
    const res = text.split(regexp).map((s, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue[index];
        if ((!allMatches && index === 0) || allMatches) {
          return (
            <Fragment key={index}>
              {s}
              <span className={cn('highlighted-text highlighted-text-highlight')}>{c}</span>
            </Fragment>
          );
        }
        return (
          <span key={index}>
            {s}
            {c}
          </span>
        );
      }
      return <span key={index}>{s}</span>;
    });

    return <span className={cn('highlighted-text-common', className)}>{res}</span>;
  }

  return <span className={cn('highlighted-text-common', className)}>{text}</span>;
};
