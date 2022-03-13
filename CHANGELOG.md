## [1.1.1](https://github.com/Greenstand/treetracker-regions-api/compare/v1.1.0...v1.1.1) (2022-03-13)


### Bug Fixes

* schema in deployment ([8bced12](https://github.com/Greenstand/treetracker-regions-api/commit/8bced12b988f9e610146278b3c95106b9c9e66f4))
* setup ([09db3b1](https://github.com/Greenstand/treetracker-regions-api/commit/09db3b1fcbb8cd6297e112bc15ab7c7f7f785e0b))

# [1.1.0](https://github.com/Greenstand/treetracker-regions-api/compare/v1.0.3...v1.1.0) (2022-03-13)


### Bug Fixes

* add id to updateRegion ([a50d3b6](https://github.com/Greenstand/treetracker-regions-api/commit/a50d3b68be76472881e5d73be2eb84b07ed54282))
* include public schema in search path ([ca836ca](https://github.com/Greenstand/treetracker-regions-api/commit/ca836cad128cf369809ba8e8f2422abcc889b8fd))
* linting ([1a91003](https://github.com/Greenstand/treetracker-regions-api/commit/1a910033d5662331724961ff64cc486649fc254a))
* make whereBuilder available to child classes ([976350f](https://github.com/Greenstand/treetracker-regions-api/commit/976350f5f9d5a2bfbd40f319b6c6b145d4579599))
* refactor api ([e43fa46](https://github.com/Greenstand/treetracker-regions-api/commit/e43fa4680a7a07d415bfbf117c7c531815d8af54))
* use snake case for parameters ([b15e2b8](https://github.com/Greenstand/treetracker-regions-api/commit/b15e2b8b23f6da0be1f842f9e83b39d9f94bce8f))


### Features

* add knex-postgis ([1f99931](https://github.com/Greenstand/treetracker-regions-api/commit/1f9993137ba3cb10e2c117672efce428cd4e96d4))

## [1.0.3](https://github.com/Greenstand/treetracker-regions-api/compare/v1.0.2...v1.0.3) (2022-02-11)

### Bug Fixes

- do not specify schema ([f143ec7](https://github.com/Greenstand/treetracker-regions-api/commit/f143ec7cc013ac1542f273bb987685ec898e2554))

## [1.0.2](https://github.com/Greenstand/treetracker-regions-api/compare/v1.0.1...v1.0.2) (2022-02-11)

### Bug Fixes

- move migrations to the right folder ([75b8307](https://github.com/Greenstand/treetracker-regions-api/commit/75b8307107194a79f08144b481209b4fd1ac5b3b))
- wrong name for database secret ([471f23e](https://github.com/Greenstand/treetracker-regions-api/commit/471f23e633926e1854474e406a40103f1f81a35b))

## [1.0.1](https://github.com/Greenstand/treetracker-regions-api/compare/v1.0.0...v1.0.1) (2022-02-11)

### Bug Fixes

- namespace and filenames ([84cb522](https://github.com/Greenstand/treetracker-regions-api/commit/84cb52209b495bb1db62bcc298ca4db99ed27072))

# 1.0.0 (2022-02-11)

### Bug Fixes

- add repo to package.json ([167c040](https://github.com/Greenstand/treetracker-regions-api/commit/167c04055ce5ed3eaa47fb0f9a286590e8ab8f11))
- added await to get queries ([de171ba](https://github.com/Greenstand/treetracker-regions-api/commit/de171baffd5c3e2846c02134252c64f9c4209abe))
- configure deployment for dev env ([5a42f1b](https://github.com/Greenstand/treetracker-regions-api/commit/5a42f1bec23cef595ce454e6f9865b86338cbbaa))
- fix collection migration ([f2ee819](https://github.com/Greenstand/treetracker-regions-api/commit/f2ee819014f8dadb3fcc18e1fcc2791ce6df02d6))
- fix some linting ([2c7e026](https://github.com/Greenstand/treetracker-regions-api/commit/2c7e0268889b2800690f7660a72eaabec70eeab7))
- fixed configuration errors ([92a16e6](https://github.com/Greenstand/treetracker-regions-api/commit/92a16e6f310e268d952fa43b9ab186f93cf2cc3d))
- quotes around collection_id in sql query ([134bf81](https://github.com/Greenstand/treetracker-regions-api/commit/134bf81fda31d6f163578a2d2316c71ea5501483))

### Features

- add collection_id properties to migration ([272822b](https://github.com/Greenstand/treetracker-regions-api/commit/272822b85d12945a4a7c83762cbd853d9c720e3c))
- add collection_id to migration ([959041d](https://github.com/Greenstand/treetracker-regions-api/commit/959041d459cfeb9946ac44890291026fb7ac400d))
- add region migrations ([96b3879](https://github.com/Greenstand/treetracker-regions-api/commit/96b3879ba13239f051c3776cc5bb8cf7819821b8))
- add Region model file ([06c85a8](https://github.com/Greenstand/treetracker-regions-api/commit/06c85a86b76cf2635f41ecf127f93aace75fb20b))
- added collection entity ([1d425eb](https://github.com/Greenstand/treetracker-regions-api/commit/1d425ebf90a93586916b5f86e5272e240033f589))
- added update region functionality ([8a635a3](https://github.com/Greenstand/treetracker-regions-api/commit/8a635a3b58c4d7ded16896b6d27bd6abd613f3d3))
- changed timestamps to timestamptzs ([9b71800](https://github.com/Greenstand/treetracker-regions-api/commit/9b718002d81c1aabbb6a31f513c04989fcebca41))
- finalize base create read logic ([d559011](https://github.com/Greenstand/treetracker-regions-api/commit/d55901130e98c0621151d52169213ab1fdeeb0c0))
- finalize collection routes to repo ([3320ac4](https://github.com/Greenstand/treetracker-regions-api/commit/3320ac40902207ef5a488f47aedeb0fdd18942e2))
- finalize logic for create region ([976902d](https://github.com/Greenstand/treetracker-regions-api/commit/976902d852c61305a6711046f6be26d445a7f815))
- initialized RegionRepository ([4a2ceb7](https://github.com/Greenstand/treetracker-regions-api/commit/4a2ceb712d6ff0ab8e37cf1810295ded9d5d2b6c))
- migrated handler logic to separate folder ([730ca78](https://github.com/Greenstand/treetracker-regions-api/commit/730ca789c4bc1ecc41240232f75d44ad7d16effb))
- progress on microservice ([1168773](https://github.com/Greenstand/treetracker-regions-api/commit/11687735b6f5ac001e97049220fd93849ba73ede))
- properly format handlers and services ([8dbe42f](https://github.com/Greenstand/treetracker-regions-api/commit/8dbe42f41a22c8a9d8ef1408ce58a10ecb3e15ca))
- region post functionality tested and working ([85b3495](https://github.com/Greenstand/treetracker-regions-api/commit/85b34955effe473e2e15e9d846582a942f00d895))
- removed error handler middleware ([12ed2df](https://github.com/Greenstand/treetracker-regions-api/commit/12ed2df2a11df602fd7cbdfe6b17c1d5e9760af7))
- working on geojson logic ([ef086ab](https://github.com/Greenstand/treetracker-regions-api/commit/ef086abd4de0258b361f559ff901d2a1a3dc224c))
- working on upload functionality ([188d1fe](https://github.com/Greenstand/treetracker-regions-api/commit/188d1fec9b61c10be888576cd4c35700b1e5ec1b))
