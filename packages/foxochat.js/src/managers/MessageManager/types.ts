import type { FetchOptions } from '@/types'
import type { Id, Timestamp } from '@foxochatjs/api-types'

export interface FetchMessagesOptions {
  /**
   * Get messages before this timestamp.
   */
  before?: Date | Timestamp

  /**
   * Max number of messages to return.
   */
  limit?: number

  withChannel?: boolean
  withAttachments?: boolean
  withAuthor?: boolean
}

export interface FetchMessageOptions extends FetchOptions {
  /**
   * The id of the message to fetch.
   */
  id: Id

  withChannel?: boolean
  withAttachments?: boolean
  withAuthor?: boolean
}
