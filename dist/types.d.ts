export declare type IEFormat = "png" | "gif" | "jpg" | "bmp" | "webp" | "jp2" | "svg" | "mp4" | "jxr" | "avif";
export declare type IEFit = "stretch" | "box" | "letterbox" | "cropbox";
export interface IEDirectives {
    width?: number;
    height?: number;
    auto_width_fallback?: number;
    scale_to_screen_width?: number;
    crop?: [number, number, number, number];
    format?: IEFormat;
    fit?: IEFit;
    compression?: number;
    sharpness?: number;
    rotate?: number;
    inline?: true;
    keep_meta?: true;
    no_optimization?: true;
}
