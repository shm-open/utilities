# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.13.1](https://github.com/shm-open/utilities/compare/v1.13.0...v1.13.1) (2021-12-01)


### Bug Fixes

* turn on esModuleInterop in ts config ([8c453d5](https://github.com/shm-open/utilities/commit/8c453d5a5034b6cdeee15e97dca6242bf1125e15))

## [1.13.0](https://github.com/shm-open/utilities/compare/v1.12.3...v1.13.0) (2021-11-30)


### Features

* add `useSyncStateEffect`, `useDeepEqualMemo` ([a272d2e](https://github.com/shm-open/utilities/commit/a272d2e315e53f123ddfeb588135b03125661a8e))

### [1.12.3](https://github.com/shm-open/utilities/compare/v1.12.2...v1.12.3) (2021-11-19)


### Bug Fixes

* make ReactiveSyncState update before fire event to default event listener ([2d71ead](https://github.com/shm-open/utilities/commit/2d71eadd08cad2a82bf8bc0beafb8407d2ded174))
* put listener into callback proxy for useSyncStateListener ([4d96f93](https://github.com/shm-open/utilities/commit/4d96f937cd430ae87ffd3f89b7f0fbac81e8a6f6))

### [1.12.2](https://github.com/shm-open/utilities/compare/v1.12.1...v1.12.2) (2021-11-16)


### Bug Fixes

* revert back to useEffect in useSyncStateValue() ([4fb89e6](https://github.com/shm-open/utilities/commit/4fb89e6a610121f387cbebaaaa37b7ebf8650458))

### [1.12.1](https://github.com/shm-open/utilities/compare/v1.12.0...v1.12.1) (2021-11-16)


### Bug Fixes

* useLayoutEffect for useSyncStateValue() to ensure it update to date ([24b1001](https://github.com/shm-open/utilities/commit/24b10012a72430b39ac2c7a4708eee7be2fd3353))

## [1.12.0](https://github.com/shm-open/utilities/compare/v1.11.0...v1.12.0) (2021-11-15)


### Features

* add useSyncStateWrapper() ([e534ddf](https://github.com/shm-open/utilities/commit/e534ddf2c2aec2db080fb6e96b232a9de928a6ed))

## [1.11.0](https://github.com/shm-open/utilities/compare/v1.10.2...v1.11.0) (2021-11-05)


### Features

* add useSyncState hooks for synchronous state management ([824c074](https://github.com/shm-open/utilities/commit/824c0744902d648edde9f75d991e3a19b680a176))

### [1.10.2](https://github.com/shm-open/utilities/compare/v1.10.1...v1.10.2) (2021-10-22)


### Bug Fixes

* **ts:** ListenerHolder type defaults to (...args: unknown[]) ([34c6a99](https://github.com/shm-open/utilities/commit/34c6a998042701b1e72135d99caaabe57ab0a1f7))

### [1.10.1](https://github.com/shm-open/utilities/compare/v1.10.0...v1.10.1) (2021-10-21)


### Bug Fixes

* **types:** use (...args: never[]) => unknown for generic function base type ([875624d](https://github.com/shm-open/utilities/commit/875624d5ab2a4f859a42a774b1ac502414fcef0a))

## [1.10.0](https://github.com/shm-open/utilities/compare/v1.9.0...v1.10.0) (2021-10-09)


### Features

* add useCallbackProxy() ([1e73ac7](https://github.com/shm-open/utilities/commit/1e73ac72eb164336021bfebb46f52f02403674b0))


### Bug Fixes

* add null check for encodeURLParams, mergeURLParams, decodeURLParams ([16f79ad](https://github.com/shm-open/utilities/commit/16f79ad1f47433c2f021c60b7fc84a549126590c))

## [1.9.0](https://github.com/shm-open/utilities/compare/v1.8.1...v1.9.0) (2021-10-08)


### Features

* add removeURLParams() and removeURLHashParams() ([88c60c0](https://github.com/shm-open/utilities/commit/88c60c01ccfa6bf21f6da50b142bbbca1e4594ee))

### [1.8.1](https://github.com/shm-open/utilities/compare/v1.8.0...v1.8.1) (2021-08-06)


### Bug Fixes

* Promisify<boolean> should get Promise<boolean> ([bcea482](https://github.com/shm-open/utilities/commit/bcea48258f2886ef96cd79c15f747bfbdc096c76))

## [1.8.0](https://github.com/shm-open/utilities/compare/v1.7.2...v1.8.0) (2021-07-30)


### Features

* add withClassComponentWrapper ([27e644d](https://github.com/shm-open/utilities/commit/27e644d370fea025f765ee7cec914359da2b0aa7))

### [1.7.2](https://github.com/shm-open/utilities/compare/v1.7.1...v1.7.2) (2021-07-22)


### Bug Fixes

* change the default roundMethod to "round" for formatNumber() ([6d582ac](https://github.com/shm-open/utilities/commit/6d582ac10f665d41749a53f4936dc38bd0b96f87))

### [1.7.1](https://github.com/shm-open/utilities/compare/v1.7.0...v1.7.1) (2021-07-22)


### Bug Fixes

* deal with floating point precision issue for formatNumber() ([3d65c65](https://github.com/shm-open/utilities/commit/3d65c654cb6c6f018424c1918139267d0c33e02a))

## [1.7.0](https://github.com/shm-open/utilities/compare/v1.6.2...v1.7.0) (2021-07-10)


### Features

* add formatNumber() ([8be52d7](https://github.com/shm-open/utilities/commit/8be52d752b66fdcbcf973816033fbebccb1b6da4))

### [1.6.2](https://github.com/shm-open/utilities/compare/v1.6.1...v1.6.2) (2021-05-31)


### Bug Fixes

* use useLayoutEffect() for useRefWrapper, to get the ref value synced in sync way ([47eb44b](https://github.com/shm-open/utilities/commit/47eb44bc2352781debff5061728e18c8c07a65ea))
* **deps:** update jest, ts-jest to v27 ([f7c7b86](https://github.com/shm-open/utilities/commit/f7c7b86e2597c3f2c7a23aaca364a7276659424a))

### [1.6.1](https://github.com/shm-open/utilities/compare/v1.6.0...v1.6.1) (2021-05-23)


### Bug Fixes

* useRefWrapper() sets value in effect ([866e8ae](https://github.com/shm-open/utilities/commit/866e8aeef9b4a2bb91ab438ad96e08fcc1cd31a2))

## [1.6.0](https://github.com/shm-open/utilities/compare/v1.5.0...v1.6.0) (2021-05-11)


### Features

* add useUpdateEffect() hook ([5307a6b](https://github.com/shm-open/utilities/commit/5307a6b97e847e49b58081a2a2dddf840d17b65c))


### Bug Fixes

* add typify() method as shorthand ([be554c8](https://github.com/shm-open/utilities/commit/be554c818737526eeb706b40c641669bf2b53a38))

## [1.5.0](https://github.com/shm-open/utilities/compare/v1.4.1...v1.5.0) (2021-03-23)


### Features

* add getURLParam(), getAllURLParams(), getURLHashParam(), getAllURLHashParams() ([ecd8fdf](https://github.com/shm-open/utilities/commit/ecd8fdfc9592c33f99e0a36d68276af7d000f4be))
* parseURL() support optional base param ([8d2ce05](https://github.com/shm-open/utilities/commit/8d2ce054b31a65359d4c103445f5546b85ee91f7))

### [1.4.1](https://github.com/shm-open/utilities/compare/v1.4.0...v1.4.1) (2021-03-17)


### Bug Fixes

* decodeURLParams() allows empty param to be decoded to empty string ([d28d116](https://github.com/shm-open/utilities/commit/d28d11681dd7e606325d8b5da4152e408288bc2e))

## [1.4.0](https://github.com/shm-open/utilities/compare/v1.3.0...v1.4.0) (2021-03-10)


### Features

* **types:** add ParametersTypes<> and Promisify<> ([9834ff5](https://github.com/shm-open/utilities/commit/9834ff5bdfdd91bf7a170bc5d8dbe116bed9a705))

## [1.3.0](https://github.com/shm-open/utilities/compare/v1.2.2...v1.3.0) (2021-03-05)


### Features

* add isEqualTo() to VersionComparer ([7d1ebcc](https://github.com/shm-open/utilities/commit/7d1ebccdcbed64220e76652264352eb473c893b3))
* add Typify<> to types ([70c67be](https://github.com/shm-open/utilities/commit/70c67be5c117320df7dadf36e75c1b1b0edd302f))


### Bug Fixes

* add eslint config and fix issues ([e9a49ae](https://github.com/shm-open/utilities/commit/e9a49aef4023f31ea1a95eae2d158467625885ab))

### [1.2.2](https://github.com/shm-open/utilities/compare/v1.2.1...v1.2.2) (2021-01-29)


### Bug Fixes

* ComposeProviders should return ReactElement ([446534f](https://github.com/shm-open/utilities/commit/446534f163f7d2e1c6f27cb4e07225bf1d383b77))

### [1.2.1](https://github.com/shm-open/utilities/compare/v1.2.0...v1.2.1) (2021-01-29)


### Bug Fixes

* expose ComposeProviders in react/index ([7a08a45](https://github.com/shm-open/utilities/commit/7a08a454bb654dfd9c6962b6bd3db5c4f91498f8))

## [1.2.0](https://github.com/shm-open/utilities/compare/v1.1.0...v1.2.0) (2021-01-28)


### Features

* add <ComposeProviders> react component for compose multiple context providers in a cleaner way ([76192ea](https://github.com/shm-open/utilities/commit/76192eaff0c4cda66f019c5343664bf4f704ac3b))
* add type utilities PropertyType<> and ArrayItemType<> ([12abe1f](https://github.com/shm-open/utilities/commit/12abe1fff15c98f9c83e8988bcabd0f59c808f84))

## [1.1.0](https://github.com/shm-open/utilities/compare/v1.0.1...v1.1.0) (2021-01-21)


### Features

* add Nullable<T> type ([5a6b649](https://github.com/shm-open/utilities/commit/5a6b64917b83e4313ece1ac7f96c41b9f98e0fc2))
* add usePrevious() hook ([a3f0e84](https://github.com/shm-open/utilities/commit/a3f0e84af73c66e87630b042281b7c9775b310f2))
* add useRefWrapper() hook ([92594c8](https://github.com/shm-open/utilities/commit/92594c8510a77b643ce28947c38ea212c35a94b5))

### [1.0.1](https://github.com/shm-open/utilities/compare/v1.0.0...v1.0.1) (2021-01-19)

## 1.0.0 (2021-01-19)


### Features

* initial commit ([6204afd](https://github.com/shm-open/utilities/commit/6204afd7315a0bd927007810211598f12ab3783c))
