import { IEDirectives } from "./types";

/* MAPPING from `IEDirectives` to actual ImageEngine url directives: */
/* https://support.imageengine.io/hc/en-us/articles/360058880672-directives */

export const OBJECT_TO_DIRECTIVES_MAP: { [key: string]: string } = {
    width: "w",
    height: "h",
    auto_width_fallback: "w_auto",
    scale_to_screen_width: "pc",
    crop: "cr",
    format: "f",
    fit: "m",
    compression: "cmpr",
    sharpness: "s",
    rotate: "r",
    inline: "in",
    keep_meta: "meta",
    no_optimization: "pass"
};



export function build_IE_url(src: string, directives: IEDirectives, debug?: boolean): string {
    let directives_string = build_IE_directives(directives, debug);
    let query_string = build_IE_query_string(directives_string, debug);
    let query_prefix = query_string === "" ?
	"" :
	(src.includes("?") ? "&" : "?");
    
    return `${src}${query_prefix}${query_string}`;
};




export function build_IE_directives(directives: IEDirectives, debug?: boolean): string {
    return Object.entries(directives).reduce((acc, [k, v]) => {
	return acc + maybe_create_directive(k, v, debug)
    }, "");
};



export function build_IE_query_string(directives_string: string, debug?: boolean): string {
    if (directives_string && directives_string !== "") {
	return `imgeng=${directives_string}`;

    } else {
	debug && console.warn(`build_IE_query_string called with an empty directives_string.`);
	return "";
    }
};



export function maybe_create_directive(directive: string, value: string | number | boolean, debug?: boolean): string {
    let translated_directive = OBJECT_TO_DIRECTIVES_MAP[directive];

    if (translated_directive && (value || value === 0)) {
	return `/${translated_directive}_${value}`;

    } else if (translated_directive) {
	debug && console.warn(`Directive '${directive}' has an invalid value ${value}.`);
	return "";

    } else {
	debug && console.warn(`Directive '${directive}' isn't recognized and won't be applied to the image.`);
	return "";
    }
};
