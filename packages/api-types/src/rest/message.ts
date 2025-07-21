import type { APIMessage, APIOk, Id, Timestamp } from '@/payloads'
import type { RESTAPIAttachmentUploadRequest, RESTAPIAttachmentUploadResponse } from '@/rest/media'

/**
 * The result of GET /channels/{channelId}/messages.
 */
export type RESTGetAPIMessageListResult = APIMessage[]

/**
 * The query of GET /channels/{channelId}/messages.
 */
export interface RESTGetAPIMessageListQuery {
  /**
   * Get messages before this timestamp.
   */
  before?: Timestamp

  /**
   * Max number of messages to return.
   */
  limit?: number

  withChannel?: boolean
  withAttachments?: boolean
  withAuthor?: boolean
}

/**
 * The result of GET /channels/{channelId}/messages/{id}.
 */
export type RESTGetAPIMessageResult = APIMessage

/**
 * The query of GET /channels/{channelId}/messages/{id}.
 */
export interface RESTGetAPIMessageQuery {
  withChannel?: boolean
  withAttachments?: boolean
  withAuthor?: boolean
}

/**
 * The result of POST /channels/{channelId}/messages.
 */
export type RESTPostAPIMessageResult = APIMessage

/**
 * The body of POST /channels/{channelId}/messages.
 */
export interface RESTPostAPIMessageBody {
  /**
   * The content of the message.
   */
  content?: string

  /**
   * The files attached to the message.
   */
  attachments?: Id[]
}

/**
 * The result of DELETE /channels/{channelId}/messages/{id}.
 */
export type RESTDeleteAPIMessageResult = APIOk

/**
 * The result of PATCH /channels/{channelId}/messages/{id}.
 */
export type RESTPatchAPIMessageResult = APIMessage

/**
 * The body of PATCH /channels/{channelId}/messages/{id}.
 */
export interface RESTPatchAPIMessageBody {
  /**
   * The content of the message.
   */
  content?: string

  /**
   * The files attached to the message.
   */
  attachments?: Id[]
}

/**
 * The body of PUT /channels/{id}/attachments.
 */
export type RESTPutAPIMessageAttachmentsBody = RESTAPIAttachmentUploadRequest[]

/**
 * The result of PUT /channels/{id}/attachments.
 */
export type RESTPutAPIMessageAttachmentsResult = RESTAPIAttachmentUploadResponse[]
