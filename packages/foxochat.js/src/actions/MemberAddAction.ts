import BaseAction from '@/actions/BaseAction'
import { GatewayDispatchEvents, type GatewayDispatchMemberAddPayload } from '@foxochatjs/gateway-types'
import type Client from '@/Client'
import { ClientEvents } from '@/types'

export default class MemberAddAction extends BaseAction<GatewayDispatchEvents.MemberAdd> {
  public constructor(client: Client) {
    super(client, GatewayDispatchEvents.MemberAdd)
  }

  public override handle(data: GatewayDispatchMemberAddPayload): void {
    this.client.emit(
      ClientEvents.MemberAdd,
      this.client.channels._add(data.channel!.id, data.channel!).members._add(data.id, data),
    )
  }
}
