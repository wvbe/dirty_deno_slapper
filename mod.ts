import { buildCss, type BuildCssOptions } from './src/buildCss.ts';
import { buildJavascript, type BuildJavascriptOptions } from './src/buildJavascript.ts';
import { combineToXhtml, type CombineXhtmlOptions } from './src/combineToXhtml.ts';
import { WriteToDirOptions } from './src/writeToDir.ts';
import { writeToDir } from './src/writeToDir.ts';

export type BuildOptions = BuildJavascriptOptions &
	CombineXhtmlOptions &
	BuildCssOptions &
	WriteToDirOptions;

/**
 * Compiles an XHTML page, CSS and JS embedded into it, and writes it to a location on disk.
 *
 * For example:
 *
 *     await slap(
 *       import.meta.resolve('./application.tsx'),
 *       import.meta.resolve('./application.css')
 *     );
 */
export default async function slap(
	tsModule: string | null,
	cssModule: string | null,
	options?: BuildOptions,
): Promise<void> {
	const start = Date.now();
	const js = tsModule ? [await buildJavascript(tsModule, options || {})] : [];
	const css = cssModule ? [await buildCss(new URL(cssModule), options || {})] : [];
	const files = [combineToXhtml(js, css, options || {})];
	await writeToDir(files, options || { destination: '_site' });
	console.error(`slap: ${Date.now() - start}ms`);
}
