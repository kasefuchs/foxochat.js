import type { Id, APIMember, MemberPermissions } from '@foxochatjs/api-types'
import type Client from '@/Client'
import User from '@/models/User'
import Channel from '@/models/Channel'
import Data from '@/models/Data'

/**
 * API Member model.
 */
export default class Member extends Data<APIMember> {
  /**
   * The id of the user of the member.
   */
  public userId!: Id

  /**
   * The id of the channel of the member.
   */
  public channelId!: Id

  /**
   * The permissions of the member.
   */
  public permissions!: MemberPermissions

  /**
   * The time when member joined.
   */
  public joinedAt!: Date

  public constructor(client: Client, data: APIMember) {
    super(client, data.id, data)

    this._patch(data)
  }

  /**
   * The user of the member.
   */
  public get user(): User | undefined {
    return this.client.users.cache.get(this.userId)
  }

  /**
   * The channel of the member.
   */
  public get channel(): Channel | undefined {
    return this.client.channels.cache.get(this.channelId)
  }

  public override _patch(data: Partial<APIMember>): void {
    if ('permissions' in data) this.permissions = data.permissions!
    if ('joined_at' in data) this.joinedAt = new Date(data.joined_at!)
    if ('user_id' in data) this.userId = data.user_id!
    if ('channel_id' in data) this.channelId = data.channel_id!

    if (data.user) this.client.users._add(data.user!.id, data.user!)
    if (data.channel) this.client.channels._add(data.channel!.id, data.channel!)
  }

  /**
   * Fetch this member.
   */
  public async fetch(force: boolean = true): Promise<Member | undefined> {
    return await this.channel?.members.fetch({ id: this.id, force })
  }

  public override toJson(): APIMember {
    return {
      id: this.id,
      user: this.user?.toJson() ?? null,
      user_id: this.userId,
      channel: this.channel?.toJson() ?? null,
      channel_id: this.channelId,
      permissions: this.permissions,
      joined_at: this.joinedAt.getTime(),
    }
  }
}
