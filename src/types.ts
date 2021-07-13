/* 
   Check helpers.ts to view the mapping into the final values
   used on the query string
*/

/* https://support.imageengine.io/hc/en-us/articles/360058880672-directives */

export type IEFormat =
    "png"  |
    "gif"  |
    "jpg"  |
    "bmp"  |
    "webp" |
    "jp2"  |
    "svg"  |
    "mp4"  |
    "jxr"  |
    "avif" ;


export type IEFit =
    "stretch"   |
    "box"       |
    "letterbox" |
    "cropbox"   ;


export interface IEDirectives {
    width?: number;                // the intrinsic width of the final image 
    height?: number;               // the intrinsic height of the final image
    auto_width_fallback?: number;  // if WURFL device detection should be tried with a
                                   // fallback value in case it fails

    scale_to_screen_width?: number;          // 0-100 float
    crop?: [number, number, number, number]; // [width, height, left, top]

    format?: IEFormat;  // the output format
    fit?: IEFit;        // the image fit in relation to the provided width/height

    compression?: number; // 0-100
    sharpness?: number;   // 0-100
    rotate?: number;      // -360-360

    inline?: true;                 // convert image to dataURL
    keep_meta?: true;              // keep EXIF image data
    no_optimization?: true;        // don't apply IE optimizations
};
