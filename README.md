A tiny set of helpers and TS types for building [ImageEngine](https://imageengine.io) query URLs for your distribution.

These set of utilities only make sense if you want to use an object to declare your [directives](https://support.imageengine.io/hc/en-us/articles/360058880672-directives) for when retrieving assets from an ImageEngine distribution.

Install it with:

`npm install imageengine-helpers`

View on [npm](https://www.npmjs.com/package/imageengine-helpers)

For instance:

```js
import { build_IE_url, build_IE_directives, build_IE_query_string } from "imageengine-helpers";

let directives: IEDirectives = {
    width: 400,
    height: 200,
    fit: "cropbox",
    compression: 10,
    inline: true,
    format: "png"
};

let source_url: string = "https://my_ie_distribution.imgeng.io/path/to_asset1.jpg";

let final_url: string = build_IE_url(source_url, directives);

/*
"https://my_ie_distribution.imgeng.io/path/to_asset1.jpg?imgeng=/w_400/h_200/m_cropbox/cmpr_10/in_true/f_png"
*/

let directives_string: string = build_IE_directives(directives);

/*
"/w_400/h_200/m_cropbox/cmpr_10/in_true/f_png"
*/

let query_string: string = build_IE_query_string(directives);

/*
"?imgeng=/w_400/h_200/m_cropbox/cmpr_10/in_true/f_png"
*/
```
