import BaseAction from '@/actions/BaseAction'
import { GatewayDispatchEvents, type GatewayDispatchMemberRemovePayload } from '@foxochatjs/gateway-types'
import type Client from '@/Client'
import { ClientEvents } from '@/types'

export default class MemberRemoveAction extends BaseAction<GatewayDispatchEvents.MemberRemove> {
  public constructor(client: Client) {
    super(client, GatewayDispatchEvents.MemberRemove)
  }

  public override handle(data: GatewayDispatchMemberRemovePayload): void {
    const channel = this.client.channels._add(data.channel!.id, data.channel!)
    const member = channel.members.cache.get(data.id)

    if (member) {
      channel.members._remove(data.id)

      this.client.emit(ClientEvents.MemberRemove, member)
    }
  }
}
