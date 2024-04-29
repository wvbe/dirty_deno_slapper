import postcss from 'npm:postcss';
import postcssImport from 'npm:postcss-import';

export async function buildCss(cssModule: URL): Promise<string> {
	const css = await Deno.readTextFile(cssModule);
	const result = await postcss().use(postcssImport()).process(css, {
		from: cssModule.pathname,
	});
	return result.css;
}
