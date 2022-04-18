/* eslint-disable max-len */
import { routes as appRoutes, TRoutes } from 'appConstants';
import { BreadcrumbsPaths } from 'components/Breadcrumbs';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

type TPathDataObject = {
  searchLink: string;
  regLink: string;
  link: string;
  dynamicValues: { [key: string]: string }[];
  label?: string;
};

const findPath = (path: string, search: string | RegExp) => {
  const regexp = new RegExp(search);
  const match = path.match(regexp);
  if (match) {
    return match;
  }
  return false;
};

const checkInclusive = (path: string, fullPath: string) => {
  let searchPath = path;
  let dynamicField = [];
  const withDynamicValue = path.match(/(^|:+[^/]+)/g);
  if (withDynamicValue) {
    withDynamicValue.forEach((s) => {
      if (s.length) {
        searchPath = searchPath.replace(s, '([^/]+)');
      }
    });
    dynamicField = withDynamicValue.filter((v) => v.length);
  }
  const isInPath = findPath(fullPath, searchPath);
  if (isInPath) {
    const dynamicValues = new Array(dynamicField.length)
      .fill(null)
      .map((_, key) => ({ [dynamicField[key].slice(1)]: isInPath[key + 1] }));
    let link = path;
    dynamicValues.forEach(
      (val) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        Object.entries(val).forEach(([field, fieldValue]) => {
          link = link.replace(`:${field}`, fieldValue);
        }),
      // eslint-disable-next-line function-paren-newline
    );
    return {
      regLink: searchPath,
      searchLink: path,
      link,
      dynamicValues,
    };
  }
  return null;
};

const recursiveChecker = (nest: TRoutes[], fullPath: string, pathData: TPathDataObject[]) => {
  for (let i = 0; i < nest.length; i += 1) {
    const subPath = nest[i];
    const isInPath = checkInclusive(subPath.path, fullPath);
    if (isInPath) {
      if (subPath.nest && !fullPath.match(new RegExp(`(^|/)${isInPath.regLink}($)`))) {
        return [
          ...(subPath.content ? [{ ...isInPath, label: subPath.label }] : []),
          ...recursiveChecker(
            Object.entries(subPath.nest).map(([, data]) => data),
            fullPath,
            pathData,
          ),
        ];
      }
      return [{ ...isInPath, label: subPath.label }];
    }
  }
  return [...pathData];
};

const modifyLabels = (label: string, values: { [key: string]: string }) => {
  let modifyLabel = label;
  if (values) {
    Object.entries(values).forEach(([field, fieldValue]) => {
      modifyLabel = modifyLabel.replace(`{{${field}}}`, fieldValue);
    });
  }
  return modifyLabel;
};

export const useBreadcrumbs = () => {
  const { pathname } = useLocation();
  const [dynamicValues, setDynamicValues] = useState([]);
  const breadcrumbs = useMemo<BreadcrumbsPaths[]>(() => {
    const crumbsPaths: TPathDataObject[] = [];
    const result: TPathDataObject[] = recursiveChecker(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [appRoutes] as any,
      pathname,
      crumbsPaths,
    );
    if (result.length) {
      const latestDynamicValues = result[result.length - 1]?.dynamicValues;
      if (latestDynamicValues) {
        setDynamicValues(latestDynamicValues);
      }
      return result.map<BreadcrumbsPaths>((c) => ({
        label: modifyLabels(c.label, latestDynamicValues[0]),
        path: c.link,
      }));
    }
    return [];
  }, [pathname]);
  return { breadcrumbs, dynamicValues };
};
