import { buildCss, type BuildCssOptions } from './src/buildCss.ts';
import { buildJavascript, type BuildJavascriptOptions } from './src/buildJavascript.ts';
import { combineToXhtml, type CombineXhtmlOptions } from './src/combineToXhtml.ts';

export type BuildOptions = BuildJavascriptOptions & CombineXhtmlOptions & BuildCssOptions;

/**
 * Returns a simple XHTML page with the JavaScript and CSS combined.
 *
 * For example:
 *
 *     const xhtml = await slap(
 *       import.meta.resolve('./application.tsx'),
 *       import.meta.resolve('./application.css')
 *     );
 */
export default async function slap(
	tsModule: string | null,
	cssModule: string | null,
	options?: BuildOptions,
): Promise<string> {
	const js = tsModule ? [await buildJavascript(tsModule, options || {})] : [];
	const css = cssModule ? [await buildCss(new URL(cssModule), options || {})] : [];
	return combineToXhtml(js, css, options || {});
}
