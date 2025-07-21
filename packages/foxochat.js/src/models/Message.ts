import type { Id, APIMessage } from '@foxochatjs/api-types'
import type Client from '@/Client'
import Attachment from '@/models/Attachment'
import Channel from '@/models/Channel'
import Member from '@/models/Member'
import Data from '@/models/Data'

/**
 * API Message model.
 */
export default class Message extends Data<APIMessage> {
  /**
   * The content of the message.
   */
  public content!: string

  /**
   * The id of the author of the message.
   */
  public authorId!: Id

  /**
   * The id of the channel of the message.
   */
  public channelId!: Id

  /**
   * The files attached to the message.
   */
  public attachments!: Map<number, Attachment>

  /**
   * The time when message sent at.
   */
  public createdAt!: Date

  public constructor(
    client: Client,
    data: APIMessage,
  ) {
    super(client, data.id, data)

    this._patch(data)
  }

  /**
   * The channel of the message.
   */
  public get channel(): Channel | undefined {
    return this.client.channels.cache.get(this.channelId)
  }

  /**
   * The author of the message.
   */
  public get author(): Member | undefined {
    return this.channel?.members.cache.get(this.authorId)
  }

  public override _patch(data: Partial<APIMessage>): void {
    if ('content' in data) this.content = data.content!
    if ('created_at' in data) this.createdAt = new Date(data.created_at!)
    if ('author_id' in data) this.authorId = data.author_id!
    if ('channel_id' in data) this.channelId = data.channel_id!

    if ('attachments' in data)
      this.attachments = data.attachments!.reduce(
        (collection, attachment) => collection.set(attachment.id, new Attachment(this.client, attachment)),
        new Map<number, Attachment>(),
      )

    if (data.channel) this.client.channels._add(data.channel.id, data.channel)
    if (data.author) this.channel?.members._add(data.author.id, data.author)
  }

  /**
   * Fetch this message.
   */
  public async fetch(force: boolean = true): Promise<Message | undefined> {
    return await this.channel?.messages.fetch({ id: this.id, force })
  }

  /**
   * Deletes the message.
   */
  public async delete(): Promise<Message> {
    await this.channel?.messages.delete(this.id)
    return this
  }

  public override toJson(): APIMessage {
    return {
      id: this.id,
      content: this.content,
      author: this.author?.toJson() ?? null,
      author_id: this.authorId,
      channel: this.channel?.toJson() ?? null,
      channel_id: this.channelId,
      attachments: Array.from(this.attachments.values()).map((attachment) => attachment.toJson()),
      created_at: this.createdAt.getTime(),
    }
  }
}
