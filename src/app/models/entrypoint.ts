import { Redirect } from './redirect';
export interface EntryPoint {
    name: string;
    id: string;
    redirect: Redirect;
}
