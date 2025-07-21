import type { Id, APIChannel, ChannelFlags, ChannelType } from '@foxochatjs/api-types'
import type Client from '@/Client'
import Message from '@/models/Message'
import MemberManager from '@/managers/MemberManager'
import MessageManager from '@/managers/MessageManager'
import Data from '@/models/Data'
import Avatar from '@/models/Avatar'
import Member from "@/models/Member";

/**
 * API Channel model.
 */
export default class Channel extends Data<APIChannel> {
  /**
   * The name of the channel.
   */
  public name!: string

  /**
   * The display name of the channel.
   */
  public displayName!: string

  /**
   * The avatar of the channel.
   */
  public avatar!: Avatar | null

  /**
   * The banner of the channel.
   */
  public banner!: Avatar | null

  /**
   * The type of the channel.
   */
  public type!: ChannelType

  /**
   * The flags of the channel.
   */
  public flags!: ChannelFlags

  /**
   * Amount of members in channel.
   */
  public memberCount!: number

  /**
   * The id of the owner of the channel.
   */
  public ownerId!: Id

  /**
   * The time when channel created at.
   */
  public createdAt!: Date

  /**
   * The last sent message in channel.
   */
  public lastMessage!: Message | null

  /**
   * A manager of the members of this channel.
   */
  public members = new MemberManager(this)

  /**
   * A manager of the messages sent to this channel.
   */
  public messages = new MessageManager(this)

  public constructor(client: Client, data: APIChannel) {
    super(client, data.id, data)

    this._patch(data)
  }

  /**
   * The owner of the channel.
   */
  public get owner(): Member | undefined {
    return this.members.cache.get(this.ownerId)
  }

  public override _patch(data: Partial<APIChannel>): void {
    if ('name' in data) this.name = data.name!
    if ('display_name' in data) this.displayName = data.display_name!
    if ('type' in data) this.type = data.type!
    if ('flags' in data) this.flags = data.flags!
    if ('member_count' in data) this.memberCount = data.member_count!
    if ('created_at' in data) this.createdAt = new Date(data.created_at!)
    if ('owner_id' in data) this.ownerId = data.owner_id!

    if ('avatar' in data) this.avatar = data.avatar ? new Avatar(this.client, data.avatar) : null
    if ('banner' in data) this.banner = data.banner ? new Avatar(this.client, data.banner) : null
    if ('last_message' in data)
      this.lastMessage = data.last_message ? this.messages._add(data.last_message.id, data.last_message) : null

    if (data.owner) this.members._add(data.owner.id, data.owner)
  }

  public override toJson(): APIChannel {
    return {
      id: this.id,
      name: this.name,
      display_name: this.displayName,
      avatar: this.avatar?.toJson() ?? null,
      banner: this.banner?.toJson() ?? null,
      type: this.type,
      flags: this.flags,
      member_count: this.memberCount,
      owner_id: this.ownerId,
      owner: this.owner?.toJson() ?? null,
      created_at: this.createdAt.getTime(),
      last_message: this.lastMessage?.toJson() ?? null,
    }
  }
}
