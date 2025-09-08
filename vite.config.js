import { defineConfig } from 'vite';
import reactJsx from 'vite-react-jsx';
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/',
  build: {
    outDir: 'build',
  },
  plugins: [
    reactJsx(),
    {
      ...obfuscator({
        fileOptions: {
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.2,
          identifierNamesGenerator: 'hexadecimal',
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 1,
        },
        include: ['**/*.js', '**/*.jsx'],
      }),
      apply: 'build',
      enforce: 'post',
    },
  ],
}));
