import { ExtractInnerKeys } from '@/helpers/types';
import { apiRoutes, apiRoutesNested } from "./routes";


export type HttpMethods = "POST" | "GET" | " UPDATE" | "DELETE" | "PATCH" | "PUT";

export type DefaultResponse<T> = {
  success: boolean;
  message?: any;
  data: T;
  [key: string]: any;
};

export type ApiRouter = {
  listenHeaders?: string[];
  method: HttpMethods;
  uri: string;
};


export type NestedRoutes = {
  [key: string]: ApiRouterObject;
};

export type ApiRoutesNestedType = typeof apiRoutesNested;


export type RouterGroupName = keyof ApiRoutesNestedType;
export type RouteName = ExtractInnerKeys<ApiRoutesNestedType>;
export type ApiRouterObject = Record<RouteName, ApiRouter>;

export type PaginationData<T> = {
  currentPage: number;
  perPage: number;
  totalPages: number;
  total: number;
  items: T[];
  content?: T[];
};

export type Params = Record<string, string | string[] | number | number[]>;
