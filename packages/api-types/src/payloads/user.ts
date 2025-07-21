import type { APIAvatar } from '@/payloads/media'
import type { Id, Timestamp } from '@/payloads/common'

/**
 * API User DTO.
 */
export interface APIUser<Short extends boolean = false> {
  /**
   * The id of the user.
   */
  id: Id

  /**
   * The avatar of the user.
   */
  avatar: APIAvatar | null

  /**
   * The banner of the user.
   */
  banner: Short extends false ? APIAvatar | null : never

  /**
   * The display name of the user.
   */
  display_name: string

  /**
   * The username of the user.
   */
  username: string

  /**
   * The bio of the user.
   */
  bio: Short extends false ? string : never

  /**
   * The email of the user.
   */
  email?: Short extends false ? string : never

  /**
   * The channels of the user.
   */
  channels: Short extends false ? Id[] : never

  /**
   * The status of the user.
   */
  status: UserStatus

  /**
   * The timestamp when the user's status was last updated.
   */
  status_updated_at: Timestamp

  /**
   * The contacts of the user.
   */
  contacts: Short extends false ? Id[] : never

  /**
   * The flags of the user.
   */
  flags: Short extends false ? UserFlags : never

  /**
   * The type of the user.
   */
  type: Short extends false ? UserType : never

  /**
   * The time when user created at.
   */
  created_at: Timestamp
}

/**
 * User entity types.
 */
export enum UserType {
  /**
   * The user is the human?
   */
  User = 1,

  /**
   * The user is the bot.
   */
  Bot = 2,
}

/**
 * Flags of the user.
 */
export enum UserFlags {
  /**
   * The user is awaiting email confirmation.
   */
  AwaitingConfirmation = 1,

  /**
   * The user's email is verified.
   */
  EmailVerified = 2,

  /**
   * The user is disabled.
   */
  Disabled = 4,
}

/**
 * Status of the user.
 */
export enum UserStatus {
  /**
   * The user is online.
   */
  Online = 1,

  /**
   * The user is offline.
   */
  Offline = 2,
}
