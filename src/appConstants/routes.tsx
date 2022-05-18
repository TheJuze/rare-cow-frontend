/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
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
import React, { ReactElement } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
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
  inMainTree?: boolean;
};

const routesConfig = {
  path: '/',
  content: <Home />,
  label: 'Home',
  nest: {
    profile: {
      path: 'profile/:userId/*',
      content: <Profile />,
      label: 'Profile',
      nest: {
        aboutMe: {
          path: 'about-me',
          content: <Profile />,
          label: 'About',
          inMainTree: false,
        },
        owned: {
          path: 'owned',
          content: <Profile />,
          label: 'Owned',
          inMainTree: false,
        },
        forSale: {
          path: 'for-sale',
          content: <Profile />,
          label: 'For sale',
          inMainTree: false,
        },
        bided: {
          path: 'bided',
          content: <Profile />,
          label: 'Bided',
          inMainTree: false,
        },
        favorites: {
          path: 'favorites',
          content: <Profile />,
          label: 'Favorites',
          inMainTree: false,
        },
        collections: {
          path: 'collections',
          content: <Profile />,
          label: 'Collections',
          inMainTree: false,
        },
        sold: {
          path: 'sold',
          content: <Profile />,
          label: 'Sold',
          inMainTree: false,
        },
        edit: {
          path: 'edit',
          content: <EditProfile />,
          label: 'Edit',
          guards: ['is-me'],
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

const getOutletRoute = (nest: TRoutes[]) => {
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    if (subPath.nest) {
      return (
        <Route
          key={subPath.path}
          path={subPath.path}
          element={
            <>
              {subPath.content} <Outlet />
            </>
          }
        >
          {Object.entries(subPath.nest)
            .map(([, data]) => data)
            .map((child) => getOutletRoute([child]))}
        </Route>
      );
    }
    return <Route key={subPath.path} path={subPath.path} element={subPath.content} />;
  }
  return null;
};

const recursiveRoutesCollector = (nest: TRoutes[]) => {
  const resultRoute = [];
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    const newPath = subPath.path;
    resultRoute.push(
      ...(subPath.render !== false && subPath.inMainTree !== false
        ? [{ ...subPath, path: newPath }]
        : []),
    );
    if (subPath.nest) {
      resultRoute.push([
        ...Object.entries(subPath.nest)
          .map(([, data]) => data)
          .map((s) => recursiveRoutesCollector([s])),
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
    const { path, content } = subPath;
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
