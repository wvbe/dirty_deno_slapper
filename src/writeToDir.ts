import * as fs from 'https://deno.land/std@0.224.0/fs/mod.ts';

import { type File } from './types.ts';

export type WriteToDirOptions = {
	destination: string;
};
export async function writeToDir(files: File[], options: WriteToDirOptions) {
	await fs.ensureDir(options.destination);
	for (const file of files) {
		// TODO ensure dir if the file path points to a subdirectory
		// TODO write binary files
		await Deno.writeTextFile(`${options.destination}/${file.path}`, file.content);
	}
}
