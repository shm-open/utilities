# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
