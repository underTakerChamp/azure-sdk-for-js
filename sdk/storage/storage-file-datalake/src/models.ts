// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpResponse, TransferProgressEvent } from "@azure/core-http";

import {
  LeaseAccessConditions,
  ModifiedAccessConditions as ModifiedAccessConditionsModel,
  UserDelegationKeyModel,
  BlobQueryArrowField
} from "@azure/storage-blob";
export type ModifiedAccessConditions = Omit<ModifiedAccessConditionsModel, "ifTags">;

import {
  FileSystemListPathsHeaders,
  PathCreateResponse,
  PathDeleteResponse,
  PathGetPropertiesHeaders as PathGetPropertiesHeadersModel,
  PathList as PathListModel
} from "./generated/src/models";
import { CommonOptions } from "./StorageClient";

export {
  LeaseAccessConditions,
  UserDelegationKeyModel,
  ServiceListContainersSegmentResponse,
  Lease,
  LeaseOperationOptions,
  LeaseOperationResponse
} from "@azure/storage-blob";

export {
  FileSystemListPathsHeaders,
  PathGetPropertiesHeaders as PathGetPropertiesHeadersModel,
  FileSystemListPathsResponse as ListPathsSegmentResponse,
  Path as PathModel,
  PathList as PathListModel,
  PathCreateHeaders,
  PathDeleteHeaders,
  PathDeleteResponse,
  PathSetAccessControlHeaders,
  PathSetAccessControlResponse,
  PathSetAccessControlResponse as PathSetPermissionsResponse,
  PathResourceType as PathResourceTypeModel,
  PathUpdateHeaders,
  PathAppendDataHeaders,
  PathFlushDataHeaders,
  PathAppendDataResponse as FileAppendResponse,
  PathFlushDataResponse as FileFlushResponse,
  PathFlushDataResponse as FileUploadResponse,
  PathGetPropertiesAction as PathGetPropertiesActionModel,
  PathRenameMode as PathRenameModeModel,
  PathExpiryOptions as FileExpiryMode,
  PathSetExpiryResponse as FileSetExpiryResponse,
  PathSetExpiryHeaders as FileSetExpiryHeaders
} from "./generated/src/models";

export { PathCreateResponse };

/*************************************************************/
/** DataLakeServiceClient option and response related models */
/*************************************************************/

export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
}

// TODO: Leverage interface definitions from blob package directly, or duplicate create a copy here which will not have generation benefits
export interface ServiceGetUserDelegationKeyHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export interface UserDelegationKey {
  signedObjectId: string;
  signedTenantId: string;
  signedStartsOn: Date;
  signedExpiresOn: Date;
  signedService: string;
  signedVersion: string;
  value: string;
}

export type ServiceGetUserDelegationKeyResponse = UserDelegationKey &
  ServiceGetUserDelegationKeyHeaders & {
    _response: HttpResponse & {
      parsedHeaders: ServiceGetUserDelegationKeyHeaders;
      bodyAsText: string;
      parsedBody: UserDelegationKeyModel;
    };
  };

export interface ServiceListFileSystemsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  prefix?: string;
  includeMetadata?: boolean;
}

export type LeaseStatusType = "locked" | "unlocked";
export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
export type LeaseDurationType = "infinite" | "fixed";
export type PublicAccessType = "filesystem" | "file";

export interface FileSystemProperties {
  lastModified: Date;
  etag: string;
  leaseStatus?: LeaseStatusType;
  leaseState?: LeaseStateType;
  leaseDuration?: LeaseDurationType;
  publicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
}

export interface FileSystemItem {
  name: string;
  properties: FileSystemProperties;
  metadata?: Metadata;
}

export interface ListFileSystemsSegmentResponse {
  serviceEndpoint: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  fileSystemItems: FileSystemItem[];
  continuationToken?: string;
}

export interface ServiceListFileSystemsSegmentHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
}

export type ServiceListFileSystemsSegmentResponse = ListFileSystemsSegmentResponse &
  ServiceListFileSystemsSegmentHeaders & {
    _response: HttpResponse & {
      parsedHeaders: ServiceListFileSystemsSegmentHeaders;
      bodyAsText: string;
      parsedBody: ListFileSystemsSegmentResponse;
    };
  };

/****************************************************************/
/** DataLakeFileSystemClient option and response related models */
/****************************************************************/

export interface FileSystemCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  access?: PublicAccessType;
}

export interface FileSystemCreateHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemCreateResponse = FileSystemCreateHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemCreateHeaders;
  };
};

export interface FileSystemDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemDeleteHeaders {
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemDeleteResponse = FileSystemDeleteHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemDeleteHeaders;
  };
};

export interface FileSystemGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
}

export interface FileSystemGetPropertiesHeaders {
  metadata?: Metadata;
  etag?: string;
  lastModified?: Date;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  publicAccess?: PublicAccessType;
  hasImmutabilityPolicy?: boolean;
  hasLegalHold?: boolean;
}

export type FileSystemGetPropertiesResponse = FileSystemGetPropertiesHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemGetPropertiesHeaders;
  };
};

export interface FileSystemSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemSetMetadataHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemSetMetadataResponse = FileSystemSetMetadataHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemSetMetadataHeaders;
  };
};

export interface FileSystemGetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
}

export interface FileSystemGetAccessPolicyHeaders {
  publicAccess?: PublicAccessType;
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export interface RawAccessPolicy {
  startsOn?: string;
  expiresOn?: string;
  permissions: string;
}

export interface AccessPolicy {
  startsOn?: Date;
  expiresOn?: Date;
  permissions: string;
}

export interface SignedIdentifier<T> {
  id: string;
  accessPolicy: T;
}

export type FileSystemGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier<AccessPolicy>[];
} & FileSystemGetAccessPolicyHeaders & {
    _response: HttpResponse & {
      parsedHeaders: FileSystemGetAccessPolicyHeaders;
      bodyAsText: string;
      parsedBody: SignedIdentifier<RawAccessPolicy>[];
    };
  };

export interface FileSystemSetAccessPolicyOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface FileSystemSetAccessPolicyHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type FileSystemSetAccessPolicyResponse = FileSystemSetAccessPolicyHeaders & {
  _response: HttpResponse & {
    parsedHeaders: FileSystemSetAccessPolicyHeaders;
  };
};

export interface ListPathsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  recursive?: boolean;
  path?: string;
  userPrincipalName?: boolean;
}

export interface ListPathsSegmentOptions extends ListPathsOptions {
  maxResults?: number;
}

export interface Path {
  name?: string;
  isDirectory?: boolean;
  lastModified?: Date;
  etag?: string;
  contentLength?: number;
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
}

export interface PathList {
  pathItems?: Path[];
}

export type FileSystemListPathsResponse = PathList &
  FileSystemListPathsHeaders & {
    _response: HttpResponse & {
      parsedHeaders: FileSystemListPathsHeaders;
      bodyAsText: string;
      parsedBody: PathListModel;
    };
  };

/**
 * Option interface for Data Lake file system exists operations
 *
 * See:
 * - {@link DataLakeFileSystemClient.exists}
 *
 * @export
 * @interface FileSystemExistsOptions
 */
export interface FileSystemExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileSystemExistsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link DataLakeFileSystemClient.createIfNotExists} operation.
 *
 * @export
 * @interface FileSystemCreateIfNotExistsResponse
 */
export interface FileSystemCreateIfNotExistsResponse extends FileSystemCreateResponse {
  /**
   * Indicate whether the file system is successfully created. Is false when the file system is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof FileSystemCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DataLakeFileSystemClient.deleteIfExists} operation.
 *
 * @export
 * @interface FileSystemDeleteIfExistsResponse
 */
export interface FileSystemDeleteIfExistsResponse extends FileSystemDeleteResponse {
  /**
   * Indicate whether the file system is successfully deleted. Is false if the file system doesn't exist in the first place.
   *
   * @type {boolean}
   * @memberof FileSystemDeleteIfExistsResponse
   */
  succeeded: boolean;
}

/**********************************************************/
/** DataLakePathClient option and response related models */
/**********************************************************/

export interface Metadata {
  [propertyName: string]: string;
}

export interface DataLakeRequestConditions
  extends ModifiedAccessConditions,
    LeaseAccessConditions {}

export interface RolePermissions {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface PathPermissions {
  owner: RolePermissions;
  group: RolePermissions;
  other: RolePermissions;
  stickyBit: boolean;
  extendedAcls: boolean;
}

export type AccessControlType = "user" | "group" | "mask" | "other";

export interface RemovePathAccessControlItem {
  /**
   * Indicates whether this is the default entry for the ACL.
   *
   * @type {boolean}
   * @memberof RemovePathAccessControlItem
   */
  defaultScope: boolean;
  /**
   * Specifies which role this entry targets.
   *
   * @type {AccessControlType}
   * @memberof RemovePathAccessControlItem
   */
  accessControlType: AccessControlType;
  /**
   * Specifies the entity for which this entry applies.
   * Must be omitted for types mask or other. It must also be omitted when the user or group is the owner.
   *
   * @type {string}
   * @memberof RemovePathAccessControlItem
   */
  entityId?: string;
}

export interface PathAccessControlItem {
  /**
   * Indicates whether this is the default entry for the ACL.
   *
   * @type {boolean}
   * @memberof PathAccessControlItem
   */
  defaultScope: boolean;
  /**
   * Specifies which role this entry targets.
   *
   * @type {AccessControlType}
   * @memberof PathAccessControlItem
   */
  accessControlType: AccessControlType;
  /**
   * Specifies the entity for which this entry applies.
   *
   * @type {string}
   * @memberof PathAccessControlItem
   */
  entityId: string;
  /**
   * Access control permissions.
   *
   * @type {RolePermissions}
   * @memberof PathAccessControlItem
   */
  permissions: RolePermissions;
}

export interface PathCreateHttpHeaders {
  cacheControl?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentType?: string;
}

export interface PathCreateOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  permissions?: string; // TODO: model or string?
  umask?: string; // TODO: model or string?
  conditions?: DataLakeRequestConditions;
  pathHttpHeaders?: PathCreateHttpHeaders;
}

export interface PathCreateIfNotExistsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  metadata?: Metadata;
  permissions?: string;
  umask?: string;
  pathHttpHeaders?: PathCreateHttpHeaders;
}

export interface PathDeleteOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface PathGetAccessControlOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  userPrincipalName?: boolean;
}

export interface PathGetAccessControlHeaders {
  date?: Date;
  etag?: string;
  lastModified?: Date;
  owner?: string;
  group?: string;
  requestId?: string;
  version?: string;
}

export interface PathAccessControl {
  owner?: string;
  group?: string;
  permissions?: PathPermissions;
  acl: PathAccessControlItem[];
}

export type PathGetAccessControlResponse = PathAccessControl &
  PathGetAccessControlHeaders & {
    _response: HttpResponse & {
      parsedHeaders: PathGetPropertiesHeadersModel;
    };
  };

export interface PathSetAccessControlOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  owner?: string;
  group?: string;
}

/**
 * Options type for `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 *
 * @export
 * @interface PathChangeAccessControlRecursiveOptions
 * @extends {CommonOptions}
 */
export interface PathChangeAccessControlRecursiveOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Optional. If data set size exceeds batch size then operation will be split into multiple requests so that progress can be tracked.
   * Batch size should be between 1 and 2000. The default when unspecified is 2000.
   *
   * @type {number}
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  batchSize?: number;
  /**
   * Optional. Defines maximum number of batches that single change Access Control operation can execute.
   * If maximum is reached before all subpaths are processed then continuation token can be used to resume operation.
   * Empty value indicates that maximum number of batches in unbound and operation continues till end.
   *
   * @type {number}
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  maxBatches?: number;
  /**
   * Optional. Default false. If set to false, the operation will terminate quickly on encountering user failures.
   * If true, the operation will ignore user failures and proceed with the operation on other sub-entities of the directory.
   *
   * @type {boolean}
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  continueOnFailure?: boolean;
  /**
   * Continuation token to continue next batch of operations.
   *
   * @type {string}
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  continuationToken?: string;
  /**
   * Callback where caller can track progress of the operation
   * as well as collect paths that failed to change Access Control.
   *
   * @memberof PathChangeAccessControlRecursiveOptions
   */
  onProgress?: (progress: AccessControlChanges) => void;
}

/**
 * Represents an entry that failed to update Access Control List during `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 *
 * @export
 * @interface AccessControlChangeFailure
 */
export interface AccessControlChangeError {
  /**
   * Returns name of an entry.
   *
   * @type {string}
   * @memberof AccessControlChangeFailure
   */
  name: string;
  /**
   * Returns whether entry is a directory.
   *
   * @type {boolean}
   * @memberof AccessControlChangeFailure
   */
  isDirectory: boolean;
  /**
   * Returns error message that is the reason why entry failed to update.
   *
   * @type {string}
   * @memberof AccessControlChangeFailure
   */
  message: string;
}

/**
 * AccessControlChanges contains batch and cumulative counts of operations that change Access Control Lists recursively.
 * Additionally it exposes path entries that failed to update while these operations progress.
 *
 * @export
 * @interface AccessControlChanges
 */
export interface AccessControlChanges {
  /**
   * Path entries that failed to update Access Control List within single batch.
   *
   * @type {AccessControlChangeError[]}
   * @memberof AccessControlChanges
   */
  batchFailures: AccessControlChangeError[];
  /**
   * Counts of paths changed within single batch.
   *
   * @type {AccessControlChangeCounters}
   * @memberof AccessControlChanges
   */
  batchCounters: AccessControlChangeCounters;
  /**
   * Counts of paths changed from start of the operation.
   *
   * @type {AccessControlChangeCounters}
   * @memberof AccessControlChanges
   */
  aggregateCounters: AccessControlChangeCounters;
  /**
   * Optional. Value is present when operation is split into multiple batches and can be used to resume progress.
   *
   * @type {string}
   * @memberof AccessControlChanges
   */
  continuationToken?: string;
}

/**
 * AccessControlChangeCounters contains counts of operations that change Access Control Lists recursively.
 *
 * @export
 * @interface AccessControlChangeCounters
 */
export interface AccessControlChangeCounters {
  /**
   * Returns number of directories where Access Control List has been updated successfully.
   *
   * @type {number}
   * @memberof AccessControlChangeCounters
   */
  changedDirectoriesCount: number;
  /**
   * Returns number of files where Access Control List has been updated successfully.
   *
   * @type {number}
   * @memberof AccessControlChangeCounters
   */
  changedFilesCount: number;
  /**
   * Returns number of paths where Access Control List update has failed.
   *
   * @type {number}
   * @memberof AccessControlChangeCounters
   */
  failedChangesCount: number;
}

/**
 * Response type for `setAccessControlRecursive`, `updateAccessControlRecursive` and `removeAccessControlRecursive`.
 *
 * @export
 * @interface PathChangeAccessControlRecursiveResponse
 */
export interface PathChangeAccessControlRecursiveResponse {
  /**
   * Contains counts of paths changed from start of the operation.
   */
  counters: AccessControlChangeCounters;
  /**
   * Optional. Value is present when operation is split into multiple batches and can be used to resume progress.
   *
   * @type {string}
   * @memberof PathChangeAccessControlRecursiveResponse
   */
  continuationToken?: string;
}

export interface PathSetPermissionsOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  owner?: string;
  group?: string;
}

export interface PathGetPropertiesOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export type CopyStatusType = "pending" | "success" | "aborted" | "failed";

export interface PathGetPropertiesHeaders {
  lastModified?: Date;
  createdOn?: Date;
  metadata?: Metadata;
  copyCompletedOn?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatusType;
  isIncrementalCopy?: boolean;
  destinationSnapshot?: string;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  contentLength?: number;
  contentType?: string;
  etag?: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  cacheControl?: string;
  // blobSequenceNumber?: number;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  acceptRanges?: string;
  // blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  accessTier?: string;
  accessTierInferred?: boolean;
  archiveStatus?: string;
  accessTierChangedOn?: Date;

  /**
   * The time the file will expire.
   */
  expiresOn?: Date;
}

export type PathGetPropertiesResponse = PathGetPropertiesHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathGetPropertiesHeaders;
  };
};

export interface PathSetHttpHeadersOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface PathHttpHeaders {
  cacheControl?: string;
  contentEncoding?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentType?: string;
  contentMD5?: Uint8Array;
}

export interface PathSetHttpHeadersHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
}

export type PathSetHttpHeadersResponse = PathSetHttpHeadersHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathSetHttpHeadersHeaders;
  };
};

export interface PathSetMetadataOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
}

export interface PathSetMetadataHeaders {
  etag?: string;
  lastModified?: Date;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  date?: Date;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
}

export type PathSetMetadataResponse = PathSetMetadataHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathSetMetadataHeaders;
  };
};

export interface PathMoveOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  destinationConditions?: DataLakeRequestConditions;
}

export interface PathRemoveHeaders {
  date?: Date;
  etag?: string;
  lastModified?: Date;
  requestId?: string;
  version?: string;
  contentLength?: number;
}

export type PathMoveResponse = PathRemoveHeaders & {
  _response: HttpResponse & {
    parsedHeaders: PathRemoveHeaders;
  };
};

/**
 * Option interface for Data Lake directory/file exists operations
 *
 * See:
 * - {@link DataLakePathClient.exists}
 *
 * @export
 * @interface PathExistsOptions
 */
export interface PathExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PathExistsOptions
   */
  abortSignal?: AbortSignalLike;
  // customerProvidedKey?: CpkInfo; not supported yet
}

/**
 * Contains response data for the {@link DataLakePathClient.createIfNotExists} operation.
 *
 * @export
 * @interface PathCreateIfNotExistsResponse
 */
export interface PathCreateIfNotExistsResponse extends PathCreateResponse {
  /**
   * Indicate whether the directory/file is successfully created. Is false when the directory/file is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof PathCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link DataLakePathClient.deleteIfExists} operation.
 *
 * @export
 * @interface PathDeleteIfExistsResponse
 */
export interface PathDeleteIfExistsResponse extends PathDeleteResponse {
  /**
   * Indicate whether the directory/file is successfully deleted. Is false if the directory/file doesn't exist in the first place.
   *
   * @type {boolean}
   * @memberof PathDeleteIfExistsResponse
   */
  succeeded: boolean;
}

// Keeping these for backward compatibility when we changed to use string unions.
/**
 * Defines values for PathGetPropertiesAction.
 * Possible values include: 'getAccessControl', 'getStatus'
 * @readonly
 * @enum {string}
 */
export enum PathGetPropertiesAction {
  GetAccessControl = "getAccessControl",
  GetStatus = "getStatus"
}
/**
 * Defines values for PathRenameMode.
 * Possible values include: 'legacy', 'posix'
 * @readonly
 * @enum {string}
 */
export enum PathRenameMode {
  Legacy = "legacy",
  Posix = "posix"
}
/**
 * Defines values for PathResourceType.
 * Possible values include: 'directory', 'file'
 * @readonly
 * @enum {string}
 */
export enum PathResourceType {
  Directory = "directory",
  File = "file"
}

/****************************************************************/
/** DataLakeDirectoryClient option and response related models **/
/****************************************************************/

export interface DirectoryCreateOptions extends PathCreateOptions {}

export interface DirectoryCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {}

export interface DirectoryCreateResponse extends PathCreateResponse {}

export interface DirectoryCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {}

/***********************************************************/
/** DataLakeFileClient option and response related models **/
/***********************************************************/

export interface FileReadOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  rangeGetContentMD5?: boolean;
  rangeGetContentCrc64?: boolean;
  conditions?: DataLakeRequestConditions;
  onProgress?: (progress: TransferProgressEvent) => void;
  maxRetryRequests?: number;
}

export interface FileReadHeaders {
  lastModified?: Date;
  metadata?: Metadata;
  contentLength?: number;
  contentType?: string;
  contentRange?: string;
  etag?: string;
  contentMD5?: Uint8Array;
  contentEncoding?: string;
  cacheControl?: string;
  contentDisposition?: string;
  contentLanguage?: string;
  // blobSequenceNumber?: number;
  copyCompletedOn?: Date;
  copyStatusDescription?: string;
  copyId?: string;
  copyProgress?: string;
  copySource?: string;
  copyStatus?: CopyStatusType;
  leaseDuration?: LeaseDurationType;
  leaseState?: LeaseStateType;
  leaseStatus?: LeaseStatusType;
  clientRequestId?: string;
  requestId?: string;
  version?: string;
  acceptRanges?: string;
  date?: Date;
  // blobCommittedBlockCount?: number;
  isServerEncrypted?: boolean;
  encryptionKeySha256?: string;
  fileContentMD5?: Uint8Array; // Content MD5 for whole file
  contentCrc64?: Uint8Array;
}

export type FileReadResponse = FileReadHeaders & {
  contentAsBlob?: Promise<Blob>;
  readableStreamBody?: NodeJS.ReadableStream;
  _response: HttpResponse & {
    parsedHeaders: FileReadHeaders;
  };
};

export interface FileAppendOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: LeaseAccessConditions;
  transactionalContentMD5?: Uint8Array;
  onProgress?: (progress: TransferProgressEvent) => void;
}

export interface FileFlushOptions extends CommonOptions {
  abortSignal?: AbortSignalLike;
  conditions?: DataLakeRequestConditions;
  retainUncommittedData?: boolean;
  close?: boolean;
  pathHttpHeaders?: PathHttpHeaders;
}

export interface FileCreateOptions extends PathCreateOptions {}

export interface FileCreateIfNotExistsOptions extends PathCreateIfNotExistsOptions {}

export interface FileCreateResponse extends PathCreateResponse {}

export interface FileCreateIfNotExistsResponse extends PathCreateIfNotExistsResponse {}

/**
 * Option interface for Data Lake file - Upload operations
 *
 * See:
 * - {@link DataLakeFileClient.upload}
 * - {@link DataLakeFileClient.uploadFile}
 * - {@link DataLakeFileClient.uploadStream}
 *
 * @export
 * @interface FileParallelUploadOptions
 */
export interface FileParallelUploadOptions extends CommonOptions {
  // For all.
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileParallelUploadOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Access conditions headers.
   *
   * @type {DataLakeRequestConditions}
   * @memberof FileParallelUploadOptions
   */
  conditions?: DataLakeRequestConditions;

  // For create and flush.
  /**
   * Http headers.
   *
   * @type {PathHttpHeaders}
   * @memberof FileParallelUploadOptions
   */
  pathHttpHeaders?: PathHttpHeaders;

  // For create.
  /**
   * A collection of key-value string pair to associate with the Data Lake file.
   *
   * @type {Metadata}
   * @memberof FileParallelUploadOptions
   */
  metadata?: Metadata;

  /**
   * Sets POSIX access permissions for the file owner, the file owning group, and others.
   * Each class may be granted read, write, or execute permission. The sticky bit is also supported.
   * Both symbolic (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
   *
   * @type {string}
   * @memberof FileParallelUploadOptions
   */
  permissions?: string; // TODO: model or string?

  /**
   * The umask restricts the permissions of the file to be created.
   * The resulting permission is given by p & ^u, where p is the permission and u is the umask.
   * For example, if p is 0777 and u is 0057, then the resulting permission is 0720.
   * The default permission is 0666 for a file. The default umask is 0027.
   * The umask must be specified in 4-digit octal notation (e.g. 0766).
   *
   * @type {string}
   * @memberof FileParallelUploadOptions
   */
  umask?: string; // TODO: model or string?

  // For append.
  /**
   * Progress updater.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof FileParallelUploadOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  // For flush.
  /**
   * When Azure Storage Events are enabled, a file changed event is raised.
   * This event has a property indicating whether this is the final change
   * to distinguish the difference between an intermediate flush to a file stream (when close set to "false")
   * and the final close of a file stream (when close set to "true").
   *
   * @type {boolean}
   * @memberof FileParallelUploadOptions
   */
  close?: boolean;

  // For parallel transfer control.

  /**
   * Data size threshold in bytes to use a single upload operation rather than parallel uploading.
   * Data of smaller size than this limit will be transferred in a single upload.
   * Data larger than this limit will be transferred in chunks in parallel.
   * Its default and max value is FILE_MAX_SINGLE_UPLOAD_THRESHOLD.
   * Note: {@link DataLakeFileClient.uploadStream} do not respect this field and always do parallel uploading.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  singleUploadThreshold?: number;

  /**
   * The size of data in bytes that will be transferred in parallel.
   * If set to 0 or undefined, it will be automatically calculated according
   * to the data size. Its max value is FILE_UPLOAD_MAX_CHUNK_SIZE.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  chunkSize?: number;
  /**
   * Max concurrency of parallel uploading. Must be >= 0. Its default value is DEFAULT_HIGH_LEVEL_CONCURRENCY.
   *
   * @type {number}
   * @memberof FileParallelUploadOptions
   */
  maxConcurrency?: number;
}

/**
 * Option interface for Data Lake file - readToBuffer operations
 *
 * See:
 * - {@link DataLakeFileClient.readToBuffer}
 *
 * @export
 * @interface FileReadToBufferOptions
 */
export interface FileReadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileParallelUploadOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Access conditions headers.
   *
   * @type {DataLakeRequestConditions}
   * @memberof FileReadToBufferOptions
   */
  conditions?: DataLakeRequestConditions;

  /**
   * Progress updater.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof FileReadToBufferOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * How many retries will perform for each read when the original chunk read stream ends unexpectedly.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors. Default value is 5.
   *
   * @type {number}
   * @memberof FileReadToBufferOptions
   */
  maxRetryRequestsPerChunk?: number;

  /**
   * chunkSize is size of data every request trying to read.
   * Must be >= 0, if set to 0 or undefined, it will automatically calculated according
   * to the file size.
   *
   * @type {number}
   * @memberof FileReadToBufferOptions
   */
  chunkSize?: number;

  /**
   * Concurrency of parallel read.
   *
   * @type {number}
   * @memberof FileReadToBufferOptions
   */
  concurrency?: number;
}

/**
 * Options to query file with JSON format.
 *
 * @export
 * @interface FileQueryJsonTextConfiguration
 */
export interface FileQueryJsonTextConfiguration {
  /**
   * Record separator.
   *
   * @type {string}
   * @memberof FileQueryJsonTextConfiguration
   */
  recordSeparator: string;
  /**
   * Query for a JSON format file.
   *
   * @type {"json"}
   * @memberof FileQueryJsonTextConfiguration
   */
  kind: "json";
}

/**
 * Options to query file with CSV format.
 *
 * @export
 * @interface FileQueryCsvTextConfiguration
 */
export interface FileQueryCsvTextConfiguration {
  /**
   * Record separator.
   *
   * @type {string}
   * @memberof FileQueryCsvTextConfiguration
   */
  recordSeparator: string;
  /**
   * Query for a CSV format file.
   *
   * @type {"csv"}
   * @memberof FileQueryCsvTextConfiguration
   */
  kind: "csv";
  /**
   * Column separator. Default is ",".
   *
   * @type {string}
   * @memberof FileQueryCsvTextConfiguration
   */
  columnSeparator?: string;
  /**
   * Field quote.
   *
   * @type {string}
   * @memberof FileQueryCsvTextConfiguration
   */
  fieldQuote?: string;
  /**
   * Escape character.
   *
   * @type {string}
   * @memberof FileQueryCsvTextConfiguration
   */
  escapeCharacter?: string;
  /**
   * Has headers. Default is false.
   *
   * @type {boolean}
   * @memberof FileQueryCsvTextConfiguration
   */
  hasHeaders?: boolean;
}

/**
 * Options to query file with Apache Arrow format. Only valid for {@link FileQueryOptions.outputTextConfiguration}.
 *
 * @export
 * @interface FileQueryArrowConfiguration
 */
export interface FileQueryArrowConfiguration {
  /**
   * Kind.
   *
   * @type {"arrow"}
   * @memberof FileQueryArrowConfiguration
   */
  kind: "arrow";

  /**
   * List of {@link BlobQueryArrowField} describing the schema of the data.
   *
   * @type {BlobQueryArrowField[]}
   * @memberof FileQueryArrowConfiguration
   */
  schema: BlobQueryArrowField[];
}

/**
 * File query error type.
 *
 * @export
 * @interface FileQueryError
 */
export interface FileQueryError {
  /**
   * Whether the error is fatal or not. A fatal error will stop the query.
   *
   * @type {boolean}
   * @memberof FileQueryError
   */
  isFatal: boolean;
  /**
   * Error name.
   *
   * @type {string}
   * @memberof FileQueryError
   */
  name: string;
  /**
   * Position in bytes of the query.
   *
   * @type {number}
   * @memberof FileQueryError
   */
  position: number;
  /**
   * Error description.
   *
   * @type {string}
   * @memberof FileQueryError
   */
  description: string;
}

/**
 * Option interface for Data Lake file - query operations
 *
 * See:
 * - {@link DataLakeFileClient.query}
 *
 * @export
 * @interface FileQueryOptions
 */
export interface FileQueryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileQueryOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Configurations for the query input.
   *
   * @type {FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration}
   * @memberof FileQueryOptions
   */
  inputTextConfiguration?: FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration;
  /**
   * Configurations for the query output.
   *
   * @type {FileQueryJsonTextConfiguration | FileQueryCsvTextConfiguration | FileQueryArrowConfiguration}
   * @memberof FileQueryOptions
   */
  outputTextConfiguration?:
    | FileQueryJsonTextConfiguration
    | FileQueryCsvTextConfiguration
    | FileQueryArrowConfiguration;
  /**
   * Callback to receive events on the progress of query operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof FileQueryOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Callback to receive error events during the query operaiton.
   *
   * @memberof FileQueryOptions
   */
  onError?: (error: FileQueryError) => void;
  /**
   * Conditions to meet when uploading to the block file.
   *
   * @type {FileRequestConditions}
   * @memberof FileQueryOptions
   */
  conditions?: DataLakeRequestConditions;
}

/**
 * Option interface for the {@link DataLakeFileClient.setExpiry} operation.
 *
 * @export
 * @interface FileSetExpiryOptions
 */
export interface FileSetExpiryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof FileSetExpiryOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * The time to set the file to expire on, used in combination with the "Absolute" {@link FileExpiryMode}.
   * A time in the past is not allowed and milliseconds will be dropped.
   *
   * @type {Date}
   * @memberof FileSetExpiryOptions
   */
  expiresOn?: Date;

  /**
   * The number of milliseconds to elapse before the file expires, used in combination with the "RelativeToCreation" or "RelativeToNow" {@link FileExpiryMode}.
   *
   * @type {number}
   * @memberof FileSetExpiryOptions
   */
  timeToExpireInMs?: number;
}
/***********************************************************/
/** DataLakeLeaseClient option and response related models */
/***********************************************************/
