import * as fs from 'https://deno.land/std@0.224.0/fs/mod.ts';

export type CopyStaticsOptions = {
	assetsDestination?: string;
	assetsSource?: string;
};

export async function copyAssets(options: CopyStaticsOptions): Promise<void> {
	if (!options.assetsDestination || !options.assetsSource) {
		return;
	}
	await fs.ensureDir(options.assetsDestination);
	await fs.copy(options.assetsSource, options.assetsDestination, { overwrite: true });
}
