/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
import { CollectionsList } from 'components';
import {
  Collection,
  Create,
  CreateCollection,
  CreateForm,
  EditProfile,
  Explore,
  Following,
  Home,
  NftPage,
  NotFound,
  Profile,
} from 'pages';
import { Nfts } from 'pages/Profile/components';
import Bio from 'pages/Profile/components/Bio';
import React, { ReactElement } from 'react';
import { Route, Routes, useOutletContext } from 'react-router-dom';
import { TGuards } from 'types';

export type TDynamicValues = { [key: string]: string | number };
export type TNestRoute = { [key: string]: TRoutes };

export type TRoutes = {
  path: string;
  render?: boolean;
  content?: string | ReactElement;
  label?: string | ReactElement;
  nest?: TNestRoute;
  guards?: TGuards[];
  outlet?: boolean;
};

const routesConfig = {
  path: '/',
  content: <Home />,
  label: 'Home',
  nest: {
    profile: {
      path: 'profile/:userId',
      content: <Profile />,
      label: 'Profile',
      outlet: true,
      render: false,
      nest: {
        aboutMe: {
          path: 'about-me',
          content: (values) => <Bio {...values} />,
          label: 'About',
        },
        owned: {
          path: 'owned',
          content: (values) => <Nfts {...values} />,
          label: 'Owned',
        },
        forSale: {
          path: 'for-sale',
          content: (values) => <Nfts {...values} />,
          label: 'For sale',
        },
        bided: {
          path: 'bided',
          content: (values) => <Nfts {...values} />,
          label: 'Bided',
        },
        favorites: {
          path: 'favorites',
          content: (values) => <Nfts {...values} />,
          label: 'Favorites',
        },
        collections: {
          path: 'collections',
          content: (values) => <CollectionsList {...values} />,
          label: 'Collections',
        },
        sold: {
          path: 'sold',
          content: (values) => <Nfts {...values} />,
          label: 'Sold',
        },
        edit: {
          path: 'edit',
          content: <EditProfile />,
          label: 'Edit',
          guards: ['is-me'],
          outlet: false,
        },
      },
    },
    followers: {
      path: 'followers/:userId',
      content: <Following />,
      label: 'Followers of {{userId}}',
    },
    following: {
      path: 'following/:userId',
      content: <Following />,
      label: 'Followings of {{userId}}',
    },
    create: {
      path: 'create',
      content: <Create />,
      label: 'Create',
      guards: ['auth'],
      nest: {
        single: {
          path: 'single',
          content: <CreateForm createType="ERC721" />,
          label: 'Single NFT',
        },
        multiple: {
          path: 'multiple',
          content: <CreateForm createType="ERC1155" />,
          label: 'Multiple NFT',
        },
        collection: {
          path: 'collection/:type',
          content: <CreateCollection />,
          label: '{{type | capitalize}} collection',
        },
      },
    },
    explore: {
      path: 'explore/:categoryName',
      content: <Explore />,
      label: 'Explore {{categoryName}}',
    },
    nft: {
      path: 'nft/:id',
      content: <NftPage />,
      label: 'Nft Card',
    },
    collection: {
      path: 'collection/:id',
      content: <Collection />,
      label: 'Collection',
    },
    notFound: {
      path: '*',
      content: <NotFound />,
      label: 'Not found',
    },
  },
};
class RouteWorker<T extends object> {
  routes: T;
  constructor(route: T) {
    const routeWithGetters = { ...route };
    const parentPaths = [];
    const recursiveGetterGenerator = (nest) => {
      for (let i = 0; i < nest.length; i += 1) {
        const currentPathObject = nest[i];
        const currentPath = currentPathObject.path;
        const joinedPath = parentPaths.join('/');
        const fullPath = `${
          joinedPath.endsWith('/*') ? joinedPath.slice(0, -2) : joinedPath
        }/${currentPath}`.replace(new RegExp(/\/+(?=\/)/g), '');
        Object.defineProperty(currentPathObject, 'path', {
          get: () => fullPath,
        });
        if (currentPathObject.nest) {
          parentPaths.push(currentPath);
          recursiveGetterGenerator(Object.entries(currentPathObject.nest).map(([, data]) => data));
          parentPaths.pop();
        }
      }
    };
    recursiveGetterGenerator([routeWithGetters]);
    this.routes = routeWithGetters;
  }
}

const normalizePath = (path: string) =>
  `${path.startsWith('/') ? '' : '/'}${path}${path.endsWith('/') || path.endsWith('*') ? '' : '/'}`;

export const { routes } = new RouteWorker<typeof routesConfig>({ ...routesConfig });

export const createDynamicLink = (path: string, values: TDynamicValues) => {
  let normalPath = path.replaceAll('/*', '');
  if (values) {
    Object.entries(values).forEach(([pathKey, pathValue]) => {
      normalPath = normalPath.replace(`:${pathKey}`, pathValue?.toString());
    });
  }
  return normalPath;
};

const OutletProvider = ({ children }) => {
  const contextProps = useOutletContext();

  return typeof children === 'function' ? children(contextProps) : children;
};

const getOutletRoute = (nest: TRoutes[]) => {
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    if (subPath.nest) {
      return (
        <Route key={subPath.path} path={subPath.path} element={subPath.content}>
          {Object.entries(subPath.nest)
            .map(([, data]) => ({ ...data, path: data.path.replaceAll(subPath.path, '').slice(1) }))
            .map((child) => getOutletRoute([child]))}
        </Route>
      );
    }
    return <Route key={subPath.path} path={subPath.path} element={<OutletProvider>{subPath.content}</OutletProvider>} />;
  }
  return null;
};

const recursiveRoutesCollector = (nest: TRoutes[], parentOutlet?: boolean) => {
  const resultRoute = [];
  let hasOutlets = Boolean(parentOutlet ?? nest[0].outlet);
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    const newPath = subPath.path;
    resultRoute.push(
      ...(
        (subPath.outlet == null ? !hasOutlets : subPath.outlet !== hasOutlets)
          ? [{ ...subPath, path: newPath }]
          : []),
    );
    if (subPath.nest) {
      hasOutlets = subPath.outlet;
      resultRoute.push([
        ...Object.entries(subPath.nest)
          .map(([, data]) => data)
          // eslint-disable-next-line no-loop-func
          .map((s) => recursiveRoutesCollector([s], Boolean(hasOutlets))),
      ]);
    }
  }
  return resultRoute;
};

const flatten = (ary) => ary.reduce((a, b) => [...a, ...(Array.isArray(b) ? flatten(b) : [b])], []);
const flattenRoutes = (nest: TRoutes[]) => flatten(recursiveRoutesCollector(nest));

const getRoute = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenRoutes([routes as any]).map((subPath: TRoutes) => {
    const { path, content, outlet } = subPath;
    if (outlet) {
      return getOutletRoute([{ ...subPath }]);
    }
    return <Route key={path} path={normalizePath(path)} element={content} />;
  });

export const getAllAvailableRoutes = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenRoutes([routes] as any).map((routeObject: TRoutes) => routeObject.path);

export const generateOutletRoutes = () => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Routes>{getOutletRoute([{ ...routesConfig }] as any)}</Routes>
);
export const generateRoutes = () => <Routes>{getRoute()}</Routes>;
