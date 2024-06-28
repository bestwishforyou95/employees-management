import { params } from './common';
import { PositionResource } from './positionResource';

export type paramsEmployee = params & {
  search?: string;
};

export interface Employee {
  id?: number;
  name: string;
  positions: PositionResource[];
  [key: string]: any;
}
