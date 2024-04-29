import { buildCss } from './src/buildCss.ts';
import { BuildJavascriptOptions, buildJavascript } from './src/buildJavascript.ts';
import { combineToXhtml } from './src/combineToXhtml.ts';

export type BuildOptions = BuildJavascriptOptions;

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
	const css = cssModule ? [await buildCss(new URL(cssModule))] : [];
	return combineToXhtml(js, css);
}
