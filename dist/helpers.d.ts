import { IEDirectives } from "./types";
export declare const OBJECT_TO_DIRECTIVES_MAP: {
    [key: string]: string;
};
export declare function build_IE_url(src: string, directives: IEDirectives, debug?: boolean): string;
export declare function build_IE_directives(directives: IEDirectives, debug?: boolean): string;
export declare function build_IE_query_string(directives_string: string, debug?: boolean): string;
export declare function maybe_create_directive(directive: string, value: string | number | boolean, debug?: boolean): string;
