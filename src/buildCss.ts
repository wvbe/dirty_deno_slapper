import postcss from 'npm:postcss';
import postcssImport from 'npm:postcss-import';
import postcssImageInliner from 'npm:postcss-image-inliner';
import postcssMinify from 'npm:postcss-minify';

export type BuildCssOptions = {
	minify?: boolean;
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

	let config = postcss();
	config = config.use(postcssImport());
	config = config.use(
		postcssImageInliner({
			assetPaths: options.imageAssetPaths || [],
			maxFileSize: options.imageMaxFileSize,
		}),
	);
	if (options.minify) {
		config = config.use(postcssMinify());
	}

	const result = await config.process(css, {
		from: cssModule.pathname,
	});

	return result.css;
}
