import postcss from 'npm:postcss';
import postcssImport from 'npm:postcss-import';
import postcssImageInliner from 'npm:postcss-image-inliner';

export type BuildCssOptions = {
	/**
	 * These folders are available to reference images from.
	 */
	imageAssetPaths?: string[];
	/**
	 * Images up to this file size (in bytes) may be inlined as base64 data URLs.
	 */
	imageMaxFileSize?: number;
};

export async function buildCss(cssModule: URL, options: BuildCssOptions): Promise<string> {
	const css = await Deno.readTextFile(cssModule);
	const result = await postcss()
		.use(postcssImport())
		.use(
			postcssImageInliner({
				assetPaths: options.imageAssetPaths || [],
				maxFileSize: options.imageMaxFileSize,
			}),
		)
		.process(css, {
			from: cssModule.pathname,
		});
	return result.css;
}
