# Utilities ![Node.js CI](https://github.com/shm-open/utilities/workflows/Node.js%20CI/badge.svg)

lightweight common utilities lib in es6 module

## Install

`npm install --save @shm-open/utilities`

## common utilities

`import { * } from '@inno/utilities'`

-   [function: nullFunction](src/function.ts)
-   [listener: utitiles for creating a event listener subject (which supports to add/remove listener)](src/listener.ts)
-   [number: format number for display](src/number.ts)
-   [sampling: smooth samling tool for calculate average values](src/sampling.ts)
-   [tree: utilities for tree data structure](src/tree.ts)
-   [types: utilities for deal with TypeScript types](src/types.ts)
-   [url: utilities for handle url parse and compose](src/url.ts)
-   [version: handle version compare for version strings](src/version.ts)

## react hooks/utilities

`import { * } from '@inno/utilities/lib/react'`

-   [ComposeProviders](src/react/ComposeProviders.ts)
-   [useIsMountedRef](src/react/useIsMountedRef.ts)
-   [usePrevious](src/react/usePrevious.ts)
-   [useRefWrapper](src/react/useRefWrapper.ts)
-   [useUpdateEffect](src/react/useUpdateEffect.ts)
-   [withClassComponentWrapper](src/react/withClassComponentWrapper.ts)
