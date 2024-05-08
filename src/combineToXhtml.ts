import { type File } from './types.ts';

function wrapCss(css: string) {
	return `<style type="text/css">${css}</style>`;
}

function wrapJs(js: string) {
	return `<script type="module">
		// <![CDATA[
			${js.replace(/"<!\[CDATA\["/g, `"<![CDA" + "TA["`).replace(/"]]>"/g, `"]" + "]>"`)}
		// ]]>
	</script>`;
}

export type CombineXhtmlOptions = {
	/**
	 * If set, your <body> will contain one <div> with the given ID.
	 */
	inventedElementId?: string;
};

export function combineToXhtml(js: string[], css: string[], options: CombineXhtmlOptions): File {
	return {
		path: 'index.html',
		content: `
			<?xml version="1.0" encoding="utf-8"?>
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
				<head>
					${css.map(wrapCss).join('\n')}
				</head>
				<body>
					${options.inventedElementId && `<div id="${options.inventedElementId}"></div>`}
					${js.map(wrapJs).join('\n')}
				</body>
			</html>
		`.trim(),
	};
}
