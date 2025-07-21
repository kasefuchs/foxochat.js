import type { APIAttachment } from '@/payloads/media'
import type { APIChannel, APIMember } from '@/payloads/channel'
import type { Id, Timestamp } from '@/payloads/common'

/**
 * API Message DTO.
 */
export interface APIMessage {
  /**
   * The id of the message.
   */
  id: Id

  /**
   * The content of the message.
   */
  content: string

  /**
   * The author of the message.
   */
  author: APIMember | null

  /**
   * The id of the author of the message.
   */
  author_id: Id

  /**
   * The channel the message was sent in.
   */
  channel: APIChannel | null

  /**
   * The id of the channel the message was sent in.
   */
  channel_id: Id

  /**
   * The files attached to the message.
   */
  attachments: APIAttachment[]

  /**
   * The time when message sent at.
   */
  created_at: Timestamp
}
