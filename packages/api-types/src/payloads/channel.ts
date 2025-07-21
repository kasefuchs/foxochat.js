import type { APIAvatar } from '@/payloads/media'
import type { Id, Timestamp } from '@/payloads/common'
import type { APIUser } from '@/payloads/user'
import type { APIMessage } from '@/payloads/message'

/**
 * API Channel DTO.
 */
export interface APIChannel {
  /**
   * The id of the channel.
   */
  id: Id

  /**
   * The display name of the channel.
   */
  display_name: string

  /**
   * The name of the channel.
   */
  name: string

  /**
   * The avatar of the channel.
   */
  avatar: APIAvatar | null

  /**
   * The banner of the channel.
   */
  banner: APIAvatar | null

  /**
   * The type of the channel.
   */
  type: ChannelType

  /**
   * The flags of the channel.
   */
  flags: ChannelFlags

  /**
   * Amount of members in channel.
   */
  member_count: number

  /**
   * The owner of the channel.
   */
  owner: APIMember | null

  /**
   * The id of the owner of the channel.
   */
  owner_id: Id

  /**
   * The time when channel created at.
   */
  created_at: Timestamp

  /**
   * The last sent message in channel.
   */
  last_message: APIMessage | null
}

/**
 * Channel entity types.
 */
export enum ChannelType {
  /**
   * Direct message between users.
   */
  DM = 1,

  /**
   * Direct message between multiple users.
   */
  Group,

  /**
   * A channel where only administrators can post messages.
   */
  Channel,
}

/**
 * Flags of the channel.
 */
export enum ChannelFlags {
  /**
   * Indicates that the channel is public.
   */
  Public = 1,

  /**
   * Indicates that the channel is blocked.
   */
  Blocked = 2,
}

/**
 * API Member DTO.
 */
export interface APIMember {
  /**
   * The id of the member.
   */
  id: Id

  /**
   * The user of the member.
   */
  user: APIUser | null

  /**
   * The id of the user of the member.
   */
  user_id: Id

  /**
   * The channel of the member.
   */
  channel: APIChannel | null

  /**
   * The id of the channel of the member.
   */
  channel_id: Id

  /**
   * The permissions of the member.
   */
  permissions: MemberPermissions

  /**
   * The time when member joined.
   */
  joined_at: Timestamp
}

/**
 * Permissions of the channel member.
 */
export enum MemberPermissions {
  /**
   * Allows all permissions.
   */
  Admin = 1,

  /**
   * Allows banning members.
   */
  BanMembers = 2,

  /**
   * Allows kicking members.
   */
  KickMembers = 4,

  /**
   * Allows for deletion of other users messages.
   */
  ManageMessages = 8,

  /**
   * Allows management and editing of channel.
   */
  ManageChannel = 16,

  /**
   * Allows for uploading images and files.
   */
  AttachFiles = 32,

  /**
   * Allows for sending messages.
   */
  SendMessages = 64,
}
