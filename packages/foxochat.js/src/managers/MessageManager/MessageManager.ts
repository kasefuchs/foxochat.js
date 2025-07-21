import { Channel, Message } from '@/models'
import type { APIMessage, Id } from '@foxochatjs/api-types'
import CachedManager from '@/managers/CachedManager'
import type { FetchMessageOptions, FetchMessagesOptions } from '@/managers/MessageManager/types'

/**
 * Manages API methods for messages and stores their cache.
 */
export default class MessageManager extends CachedManager<Id, APIMessage, Message> {
  public constructor(private readonly channel: Channel) {
    super(channel.client, Message)
  }

  /**
   * Deletes the message.
   */
  public async delete(id: Id): Promise<void> {
    await this.client.api.message.delete(this.channel.id, id)
  }

  /**
   * Obtains a message from API, or the message cache if it's already available.
   */
  public fetch(id: Id): Promise<Message>
  public fetch(options: FetchMessageOptions): Promise<Message>
  public fetch(options?: FetchMessagesOptions): Promise<Map<number, Message>>
  public async fetch(
    options: number | undefined | FetchMessageOptions | FetchMessagesOptions,
  ): Promise<Map<number, Message> | Message> {
    if (typeof options == 'number') return await this.fetchSingle({ id: options })
    if (options && 'id' in options) return await this.fetchSingle(options)

    return this.fetchMany(options)
  }

  private async fetchSingle(options: FetchMessageOptions): Promise<Message> {
    if (!options.force) {
      const existing = this.cache.get(options.id)
      if (existing) return existing
    }

    const data = await this.client.api.message.get(this.channel.id, options.id, {
      withAuthor: options.withAuthor,
      withChannel: options.withChannel,
      withAttachments: options.withAttachments,
    })

    return this._add(data.id, data)
  }

  private async fetchMany(options: FetchMessagesOptions = {}): Promise<Map<number, Message>> {
    const data = await this.client.api.message.list(this.channel.id, {
      limit: options.limit,
      before: options.before instanceof Date ? options.before.getTime() : options.before,
      withAuthor: options.withAuthor,
      withChannel: options.withChannel,
      withAttachments: options.withAttachments,
    })

    return data.reduce(
      (collection, message) => collection.set(message.id, this._add(message.id, message)),
      new Map<number, Message>(),
    )
  }
}
