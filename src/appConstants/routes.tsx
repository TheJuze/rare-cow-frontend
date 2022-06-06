/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
import { CollectionsList } from 'components';
import { isMainnet } from 'config/constants';
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
import React, { Children, FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate, Route, Routes, useOutletContext,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { State, TGuards, TGuardsAction } from 'types';

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
          guards: ['auth'],
        },
        multiple: {
          path: 'multiple',
          content: <CreateForm createType="ERC1155" />,
          label: 'Multiple NFT',
          guards: ['auth'],
        },
        collection: {
          path: 'collection/:type',
          content: <CreateCollection />,
          label: '{{type | capitalize}} collection',
          guards: ['auth'],
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

const guardsActions: TGuardsAction = {
  auth: {
    check: (value) => Boolean(value.user.address),
    errorMsg: 'You should be authorize',
  },
  'is-me': {
    check: (value) => value.user.id === value.profile.id,
    errorMsg: "You don't have permission for this",
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

type TGuardRoute = {
  guards: TGuards[];
};

// @ts-ignore
const GuardRoute: FC<TGuardRoute> = ({ children, guards }) => {
  const store = useSelector<State, State>((state) => state);
  const failedGuards = guards.filter((guard) => !guardsActions[guard].check(store));
  if(failedGuards.length === 0) {
    return children;
  }
  toast.error(failedGuards.map((v) => guardsActions[v].errorMsg || '').join(', '));
  if(!isMainnet) console.warn(`guarded ${Children.toArray(children)[0]?.valueOf()}`);
  return <Navigate to="/" />;
};

const getOutletRoute = (nest: TRoutes[]) => {
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    let component = (
      <OutletProvider>{subPath.content}</OutletProvider>
    );
    if(subPath.guards) {
      component = (
        <GuardRoute guards={subPath.guards}>
          {component}
        </GuardRoute>
      );
    }
    if (subPath.nest) {
      return (
        <Route key={subPath.path} path={subPath.path} element={subPath.guards ? <GuardRoute guards={subPath.guards}>{subPath.content}</GuardRoute> : subPath.content}>
          {Object.entries(subPath.nest)
            .map(([, data]) => ({ ...data, path: data.path.replaceAll(subPath.path, '').slice(1) }))
            .map((child) => getOutletRoute([child]))}
        </Route>
      );
    }
    return <Route
      key={subPath.path}
      path={subPath.path}
      element={component}
    />;
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
      ...((subPath.outlet == null ? !hasOutlets : subPath.outlet !== hasOutlets)
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
    const {
      path, content, outlet, guards,
    } = subPath;
    if (outlet) {
      return getOutletRoute([{ ...subPath }]);
    }
    let component = content;
    if(guards) {
      component = (
        <GuardRoute guards={guards}>
          {component}
        </GuardRoute>);
    }
    return <Route key={path} path={normalizePath(path)} element={component} />;
  });

export const getAllAvailableRoutes = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenRoutes([routes] as any).map((routeObject: TRoutes) => routeObject.path);

export const generateOutletRoutes = () => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Routes>{getOutletRoute([{ ...routesConfig }] as any)}</Routes>
);
export const generateRoutes = () => <Routes>{getRoute()}</Routes>;
