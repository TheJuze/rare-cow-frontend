import { generateRoutes } from 'appConstants/routes';
import { FC } from 'react';

console.log(generateRoutes());
export const RouteManager: FC = () => generateRoutes();
