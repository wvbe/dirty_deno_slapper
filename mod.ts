import { buildCss } from './buildCss.ts';
import { BuildJavascriptOptions, buildJavascript } from './buildJavascript.ts';
import { combineToXhtml } from './combineToXhtml.ts';

export type BuildOptions = BuildJavascriptOptions;

/**
 * Returns a simple XHTML page with the JavaScript and CSS combined.
 *
 * For example:
 *
 *     const xhtml = await build(
 *       import.meta.resolve('./application.tsx'),
 *       import.meta.resolve('./application.css')
 *     );
 */
export async function build(
	tsModule: string,
	cssModule: string,
	options: BuildOptions,
): Promise<string> {
	const js = await buildJavascript(tsModule, options);
	const css = await buildCss(new URL(cssModule));
	return combineToXhtml([js], [css]);
}
