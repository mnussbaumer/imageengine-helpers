"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe_create_directive = exports.build_IE_query_string = exports.build_IE_directives = exports.build_IE_url = exports.OBJECT_TO_DIRECTIVES_MAP = void 0;
/* MAPPING from `IEDirectives` to actual ImageEngine url directives: */
/* https://support.imageengine.io/hc/en-us/articles/360058880672-directives */
exports.OBJECT_TO_DIRECTIVES_MAP = {
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
function build_IE_url(src, directives, debug) {
    var directives_string = build_IE_directives(directives, debug);
    var query_string = build_IE_query_string(directives_string, debug);
    var query_prefix = query_string === "" ?
        "" :
        (src.includes("?") ? "&" : "?");
    return "" + src + query_prefix + query_string;
}
exports.build_IE_url = build_IE_url;
;
function build_IE_directives(directives, debug) {
    return Object.entries(directives).reduce(function (acc, _a) {
        var k = _a[0], v = _a[1];
        return acc + maybe_create_directive(k, v, debug);
    }, "");
}
exports.build_IE_directives = build_IE_directives;
;
function build_IE_query_string(directives_string, debug) {
    if (directives_string && directives_string !== "") {
        return "imgeng=" + directives_string;
    }
    else {
        debug && console.warn("build_IE_query_string called with an empty directives_string.");
        return "";
    }
}
exports.build_IE_query_string = build_IE_query_string;
;
function maybe_create_directive(directive, value, debug) {
    var translated_directive = exports.OBJECT_TO_DIRECTIVES_MAP[directive];
    if (translated_directive && (value || value === 0)) {
        return "/" + translated_directive + "_" + value;
    }
    else if (translated_directive) {
        debug && console.warn("Directive '" + directive + "' has an invalid value " + value + ".");
        return "";
    }
    else {
        debug && console.warn("Directive '" + directive + "' isn't recognized and won't be applied to the image.");
        return "";
    }
}
exports.maybe_create_directive = maybe_create_directive;
;
