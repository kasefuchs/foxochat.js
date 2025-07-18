import type { FetchOptions } from '@/types'
import type { PublicChannelKey } from '@foxochatjs/api-types'

export interface FetchChannelOptions extends FetchOptions {
  /**
   * The key of the channel to fetch.
   */
  key: PublicChannelKey

  withAvatar?: boolean
  withBanner?: boolean
  withOwner?: boolean
}
