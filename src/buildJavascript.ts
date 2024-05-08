import * as esbuild from 'https://deno.land/x/esbuild@v0.17.18/mod.js';
import { denoPlugins } from 'https://deno.land/x/esbuild_deno_loader@0.7.0/mod.ts';

export type BuildJavascriptOptions = {
	/**
	 * Use an import map?
	 *
	 * For example:
	 *
	 *     import.meta.resolve('../import_map.json')
	 */
	importMap?: string;
	configPath?: string;
	/**
	 * Include an inline source map in the output?
	 *
	 * Defaults to `true`
	 */
	sourcemap?: boolean;
};

export async function buildJavascript(
	tsModule: string,
	options: BuildJavascriptOptions,
): Promise<string> {
	const result = await esbuild.build({
		plugins: [
			...denoPlugins({
				loader: 'portable',
				configPath: options.configPath,
				importMapURL: options.importMap,
			}),
		],
		entryPoints: [tsModule],
		bundle: true,
		sourcemap: options.sourcemap || options.sourcemap === undefined ? 'inline' : false,
		format: 'esm',
		write: false,
		outdir: 'out',
		logLevel: 'silent',
	});

	esbuild.stop();

	return result.outputFiles[0].text;
}
