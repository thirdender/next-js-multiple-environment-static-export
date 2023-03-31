# Next.js static HTML export with a single build artifact

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). An "export" script has been added to [package.json](/package.json) file, per the [Next.js "Static HTML Export" documentation](https://nextjs.org/docs/advanced-features/static-html-export). Along with the [@beam-australia/react-env](https://github.com/andrewmclagan/react-env) module, it is possible to build dynamic pages that utilize environment variables in static pages and while hydrated. To adhere to the "build once, deploy many" principle of twelve-factor methodology, first generate static output using the production environment variables. The resulting `out/_next` directory can be used as a deploy artifact in any environment.


## Usage

Create environment specific variable files as `.env.ENVIRONMENT_NAME`. Variable names must use the default prefix `REACT_APP_` for each variable, although this can be customized in the call to `react-env`.

```shell
REACT_APP_API_HOST=staging.api.example.com
```


When calling the `yarn run dev` or `yarn run export` commands, you must reference the specific environment being used (e.g. `APP_ENV=staging yarn run export`). `react-env` will generate a `public/__ENV.js` file, and this must be referenced in your [`src/pages/_app.tsx`](/src/pages/_app.tsx) file.

Inside your code, use the `env` function to reference the environment variables:

```js
import env from '@beam-australia/react-env'

export default function Home() {
  return (
    <p>Current API hostname: <code className={styles.code}>{env('API_HOST')}</code></p>
  );
}
```


Finally, to export the static HTML and build artifact, use the following commands:

```shell
# Create the build artifact by exporting as production
APP_ENV=production yarn run export
zip -r build-artifact.zip out/_next

# Subsequent exports generate static HTML per environment, but can re-use the
# build artifact
APP_ENV=staging yarn run export
rm -rf out/_next
unzip build-artifact.zip
npx serve out
```
