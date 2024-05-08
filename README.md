A real quick-and-dirty build system for a simple XHTML/TS/CSS page, because I hate to write it twice.

> No guarantees to a stable API whatsoever

In your `slap.ts`:

```sh
await slap(
	import.meta.resolve('./src/game/Game.ts'),
	import.meta.resolve('./src/style.css'),
	{
		sourcemap: true,
	},
);
console.log(xhtml);
```

Then in your `deno.json`:

```json
{
	…
	"tasks": {
		"slap": "deno run -A slap.ts > slap.html",
		"watch": "npx chokidar-cli \"src/**/*\" --command \"deno task slap\"",
		"dev": "deno task slap && deno task watch"
	}
}

```
