import {
    maybe_create_directive,
    build_IE_directives,
    build_IE_query_string,
    build_IE_url
} from "../src/helpers";

const assert = require("assert");

const base = {
    width: 200,
    height: 500,
    auto_width_fallback: 200,
    scale_to_screen_width: 50,
    crop: [150, 300, 0, 0],
    format: "jpg",
    fit: "box",
    compression: 50,
    sharpness: 20,
    rotate: 0,
    inline: true,
    keep_meta: true,
    no_optimization: true
};

const expected_directives_string = "/w_200/h_500/w_auto_200/pc_50/cr_150,300,0,0/f_jpg/m_box/cmpr_50/s_20/r_0/in_true/meta_true/pass_true";

describe("URL helpers", () => {

    describe("mapping works for all keys", () => {
	Object.entries(base).forEach(([k, v]) => {
	    assert.notEqual("", maybe_create_directive(k, v));
	});
    });

    describe("ie directives as string", () => {
	assert.strictEqual(expected_directives_string, build_IE_directives(base));
    });

    describe("ie directives query string", () => {
	assert.strictEqual(`imgeng=${expected_directives_string}`, build_IE_query_string(build_IE_directives(base)));
    });

    describe("ie url", () => {
	assert.strictEqual(`test?imgeng=${expected_directives_string}`, build_IE_url("test", base));

	assert.strictEqual(`test?param=1&imgeng=${expected_directives_string}`, build_IE_url("test?param=1", base));
    });

    describe("ie url with empty directives", () => {
	let new_base = base;
	new_base.width = null;
	new_base.height = undefined;

	let new_expected_directives = "/w_auto_200/pc_50/cr_150,300,0,0/f_jpg/m_box/cmpr_50/s_20/r_0/in_true/meta_true/pass_true";

	assert.strictEqual(`test?imgeng=${new_expected_directives}`, build_IE_url("test", new_base));
    });

    describe("ie url without any valid directive should not include ? on the generated url", () => {
	assert.strictEqual(`test`, build_IE_url("test", {}));
	assert.strictEqual(`test?param=A`, build_IE_url("test?param=A", {}));
    });
});
