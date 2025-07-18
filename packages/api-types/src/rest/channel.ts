import type { APIChannel, APIMember, APIOk, ChannelType, Id } from '@/payloads'
import type { RESTAPIAvatarUploadRequest, RESTAPIAvatarUploadResponse } from '@/rest/media'

/**
 * The result of POST /channels/.
 */
export type RESTPostAPIChannelResult = APIChannel

/**
 * The body of POST /channels/.
 */
export interface RESTPostAPIChannelBody {
  /**
   * The display name of the channel.
   */
  display_name: string

  /**
   * The name of the channel.
   */
  name: string

  /**
   * The type of the channel.
   */
  type: ChannelType

  /**
   * Whether the channel is public or private.
   */
  public: boolean
}

/**
 * The result of POST /channels/{partnerId}.
 */
export type RESTPostAPIChannelCreateDMResult = APIChannel

/**
 * The body of POST /channels/{partnerId}.
 */
export type RESTPostAPIChannelCreateDMBody = RESTPostAPIChannelBody

/**
 * The result of GET /channels/{name}.
 */
export type RESTGetAPIChannelResult = APIChannel

/**
 * The query of GET /channels/{name}.
 */
export interface RESTGetAPIChannelQuery {
  withAvatar?: boolean
  withBanner?: boolean
  withOwner?: boolean
}

/**
 * The query of GET /channels/{name}/members.
 */
export interface RESTGetAPIChannelMembersQuery {
  withChannel?: boolean
  withOwner?: boolean
  withUser?: boolean
}

/**
 * The result of GET /channels/{name}/members.
 */
export type RESTGetAPIChannelMembersResult = APIMember[]

/**
 * The result of GET /channels/{name}/members/{memberId}.
 */
export type RESTGetAPIChannelMemberResult = APIMember

/**
 * The query of GET /channels/{name}/members/{memberId}.
 */
export interface RESTGetAPIChannelMemberQuery {
  withChannel?: boolean
  withUser?: boolean
}

/**
 * The result of PUT /channels/{name}/members/@me.
 */
export type RESTPutAPIChannelJoinResult = APIMember

/**
 * The result of DELETE /channels/{name}/members/@me.
 */
export type RESTDeleteAPIChannelLeaveResult = APIOk

/**
 * The result of PATCH /channels/{name}.
 */
export type RESTPatchAPIChannelResult = APIChannel

/**
 * The body of PATCH /channels/{name}.
 */
export interface RESTPatchAPIChannelBody {
  /**
   * The display name of the channel.
   */
  display_name?: string

  /**
   * The name of the channel.
   */
  name?: string

  /**
   * The id of the avatar of the channel.
   */
  avatar?: Id

  /**
   * The id of the banner of the channel.
   */
  banner?: Id
}

/**
 * The result of DELETE /channels/{name}.
 */
export type RESTDeleteAPIChannelResult = APIOk

/**
 * The body of PUT /channels/{id}/icon.
 */
export type RESTPutAPIChannelIconBody = RESTAPIAvatarUploadRequest

/**
 * The result of PUT /channels/{id}/icon.
 */
export type RESTPutAPIChannelIconResult = RESTAPIAvatarUploadResponse
