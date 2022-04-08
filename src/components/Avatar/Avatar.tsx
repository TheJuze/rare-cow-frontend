import { VFC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'clsx';
import { nullAvatar } from 'assets/img';

import './styles.scss';
import { FallbackImage } from 'containers/FallbackImage/FallbackImage';

export interface AvatarProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  size?: number | string;
  className?: string;
  withAnim?: boolean;
  withShadow?: boolean;
}

export const Avatar: VFC<AvatarProps> = ({
  avatar,
  id,
  isCollection = false,
  size = 24,
  withAnim = true,
  withShadow = true,
  className,
}) => {
  console.log(isCollection, id, avatar, size);
  return (
    <div className={cn('wrapper', className)}>
      <Link
        to="/"
        // to={
        //   isCollection
        //     ? routes.collection.link(id || '')
        //     : routes.profile.link(id || '', 'about-me')
        // }
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
    </div>
  );
};
