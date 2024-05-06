/*
 * @Author: zipeng 1437966391@qq.com
 * @Date: 2024-05-04 16:41:43
 * @LastEditors: zipeng 1437966391@qq.com
 * @LastEditTime: 2024-05-06 21:02:56
 * @FilePath: \web-track\rollup.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from "fs";
import path from "path";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts"
const packagesDir = path.resolve(__dirname, "packages");
const packageFiles = fs.readdirSync(packagesDir);
function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.cjs.js`,
          format: 'cjs',
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.esm.js`,
          format: 'esm',
          sourcemap: true,
        },
        {
          file: `./packages/${path}/dist/index.js`,
          format: "umd",
          name: "web-track",
          sourcemap: true,
        },
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: "ESNext",
            },
          },
          useTsconfigDeclarationDir: true,
        }),
      ],
    },
    {
      input: `./packages/${path}/src/index.ts`,
      output: [
        { file: `./packages/${path}/dist/index.cjs.d.ts`, format: 'cjs' },
        { file: `./packages/${path}/dist/index.esm.d.ts`, format: 'esm' },
        { file: `./packages/${path}/dist/index.d.ts`, format: 'umd' },
      ],
      plugins: [dts()],
    },
  ];
}

export default [...packageFiles.map((path) => output(path)).flat()];
