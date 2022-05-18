/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import React, { VFC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'clsx';
import { nullAvatar } from 'assets/img';

import './styles.scss';
import { FallbackImage } from 'containers/FallbackImage/FallbackImage';
import { createDynamicLink, routes } from 'appConstants';

export interface AvatarProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  size?: number | string;
  className?: string;
  withAnim?: boolean;
  withShadow?: boolean;
}

/**
 * @param {(number | string)} id - the id of the user, which will be used to redirect on the profile page
 * @param {string} avatar - the source link of the avatar
 * @param {boolean} [isCollection=false] - the flag which set styles and link of the **collection** styles
 * `initial = false`
 * @param {(number | string)} [size] - the size of the avatar. If passes number, size will be in pixels, if string set string value
 * `initial = 24`
 * @param {boolean} [withAnim] - flag which add move up animation
 * `initial = true`
 * @param {boolean} [withShadow] - flag which add shadow under the avatar
 * `initial = true`
 */
export const Avatar: VFC<AvatarProps> = ({
  avatar,
  id,
  isCollection = false,
  size = 24,
  withAnim = false,
  withShadow = false,
  className,
}) => {
  return (
    <div className={cn('avatar-wrapper', className)}>
      {id ? (
        <Link
          to={
            isCollection
              ? createDynamicLink(routes.nest.collection.path, { id })
              : createDynamicLink(routes.nest.profile.nest.aboutMe.path, { userId: id })
          }
          className={cn('avatar', {
            withAnim,
            withShadow,
          })}
        >
          <FallbackImage
            src={avatar}
            className="avatarImg"
            errorSrc={nullAvatar}
            width={size}
            height={size}
          />
        </Link>
      ) : (
        <div
          className={cn('avatar', {
            withAnim,
            withShadow,
          })}
        >
          <FallbackImage
            src={avatar}
            className="avatarImg"
            errorSrc={nullAvatar}
            width={size}
            height={size}
          />
        </div>
      )}
    </div>
  );
};
