/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
import React, { ReactElement } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { TGuards } from 'types';

export type TDynamicValues = { [key: string]: string | number };
export type TNestRoute = { [key: string]: TRoutes };

export type TRoutes = {
  path: string;
  content?: string | ReactElement;
  label?: string | ReactElement;
  nest?: TNestRoute;
  guards?: TGuards[];
};

const routesConfig = {
  path: '/',
  content: <div>Home</div>,
  label: 'Home',
  nest: {
    profile: {
      path: 'profile/:id',
      nest: {
        aboutMe: {
          path: 'about-me',
          content: 'About',
          label: 'About {{id}}',
        },
        edit: {
          path: 'edit',
          content: 'Edit',
          label: 'Edit',
          guards: ['is-me'],
        },
      },
    },
    create: {
      path: 'create',
      content: 'create',
      label: 'Create',
      guards: ['auth'],
      nest: {
        single: {
          path: 'single',
          content: 'Create single NFT',
          label: 'Single NFT',
        },
        multiple: {
          path: 'multiple',
          content: 'Create multiple NFT',
          label: 'Multiple NFT',
        },
      },
    },
    explore: {
      path: 'explore',
      content: 'explore',
      label: 'explore',
    },
  },
};

const normalizePath = (path: string) =>
  `${path.startsWith('/') ? '' : '/'}${path}${path.endsWith('/') ? '' : '/'}`;

const parentPaths = [];
const pathHandler = {
  get(route, key) {
    if (typeof route[key] === 'object' && route[key] !== null && key !== 'content') {
      if (key === 'nest') {
        if (!parentPaths.includes(route.path)) parentPaths.push(route.path);
      }
      return new Proxy(route[key], pathHandler);
    }
    if (key === 'path') {
      let accumulatedPath = '';
      while (parentPaths.length) {
        const subPath = parentPaths.shift();
        accumulatedPath += subPath + (subPath.endsWith('/') ? '' : '/');
      }
      return `${accumulatedPath}${route[key]}`;
    }
    parentPaths.length = 0;
    return route[key];
  },
};

export const routes = new Proxy<typeof routesConfig>(routesConfig, pathHandler);

export const createDynamicLink = (path: string, values: TDynamicValues) => {
  let normalPath = path;
  if (values) {
    Object.entries(values).forEach(([pathKey, pathValue]) => {
      normalPath = normalPath.replace(`:${pathKey}`, pathValue.toString());
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
          element={(
            <>
              {subPath.content || ''} <Outlet />
            </>
          )}
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

const flatten = (ary) => ary.reduce((a, b) => [...a, ...(Array.isArray(b) ? flatten(b) : [b])], []);

const recursiveRoutesCollector = (nest: TRoutes[]) => {
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    if (subPath.nest) {
      return [
        ...(subPath.content ? [{ ...subPath, path: subPath.path }] : []),
        ...Object.entries(subPath.nest)
          .map(([, data]) => data)
          .map((s) => recursiveRoutesCollector([s])),
      ];
    }
    return [{ ...subPath, path: subPath.path }];
  }
  return [];
};

const flattenRoutes = (nest: TRoutes[]) => flatten(recursiveRoutesCollector(nest));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getRoute = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenRoutes([routes as any]).map((subPath: TRoutes) => {
    const { path, content } = subPath;
    return <Route key={path} path={normalizePath(path)} element={content} />;
  });

export const getAllAvailableRoutes = () =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  flattenRoutes([{ ...routes }] as any).map((routeObject: TRoutes) => routeObject.path);
export const generateOutletRoutes = () => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <Routes>{getOutletRoute([{ ...routesConfig }] as any)}</Routes>
);
export const generateRoutes = () => <Routes>{getRoute()}</Routes>;
