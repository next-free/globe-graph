declare module 'rollup-plugin-serve' {
    import { Plugin } from 'rollup';
    interface ServeOptions {
      contentBase?: string | string[];
      host?: string;
      port?: number;
      open?: boolean;
      verbose?: boolean;
      historyApiFallback?: boolean | string | object;
      headers?: { [key: string]: string };
    }
    function serve(options?: ServeOptions): Plugin;
    export default serve;
  }  