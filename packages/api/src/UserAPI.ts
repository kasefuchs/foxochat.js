import {
  APIRoutes,
  type Id,
  type PublicUserKey,
  type RESTDeleteAPIUserBody,
  type RESTDeleteAPIUserContactResult,
  type RESTDeleteAPIUserResult,
  type RESTGetAPIUserChannelsQuery,
  type RESTGetAPIUserChannelsResult,
  type RESTGetAPIUserContactsQuery,
  type RESTGetAPIUserContactsResult,
  type RESTGetAPIUserQuery,
  type RESTGetAPIUserResult,
  type RESTPatchAPIUserBody,
  type RESTPatchAPIUserResult,
  type RESTPostAPIUserContactResult,
  type RESTPostAPIUserDeleteConfirmBody,
  type RESTPostAPIUserDeleteConfirmResult,
  type RESTPutAPIUserAvatarBody,
  type RESTPutAPIUserAvatarResult,
  type RESTPutAPIUserBannerBody,
  type RESTPutAPIUserBannerResult,
  UserMe,
} from '@foxochatjs/api-types'
import REST, { buildURLSearchParams } from '@foxochatjs/rest'

/**
 * A wrapper for the FoxoChat user API.
 */
export default class UserAPI {
  public constructor(private readonly rest: REST) {}

  /**
   * Fetches a user.
   */
  public async get(userKey: PublicUserKey, query: RESTGetAPIUserQuery = {}) {
    const params = buildURLSearchParams(query)

    return await this.rest.get<RESTGetAPIUserResult>(APIRoutes.user(userKey), { params })
  }

  /**
   * Returns the current user.
   */
  public async current(query: RESTGetAPIUserQuery = {}) {
    const params = buildURLSearchParams(query)

    return await this.rest.get<RESTGetAPIUserResult>(APIRoutes.user(UserMe), { params })
  }

  /**
   * Edits the current user.
   */
  public async edit(body: RESTPatchAPIUserBody) {
    return await this.rest.patch<RESTPatchAPIUserResult>(APIRoutes.user(UserMe), { body })
  }

  /**
   * Requests user deletion.
   */
  public async delete(body: RESTDeleteAPIUserBody) {
    return await this.rest.delete<RESTDeleteAPIUserResult>(APIRoutes.user(UserMe), { body })
  }

  /**
   * Confirms user deletion.
   */
  public async confirmDelete(body: RESTPostAPIUserDeleteConfirmBody) {
    return await this.rest.post<RESTPostAPIUserDeleteConfirmResult>(APIRoutes.userConfirmDelete(), { body })
  }

  /**
   * Gets user channels.
   */
  public async channels(query: RESTGetAPIUserChannelsQuery = {}) {
    const params = buildURLSearchParams(query)

    return await this.rest.get<RESTGetAPIUserChannelsResult>(APIRoutes.userChannels(), { params })
  }

  /**
   * Gets user contacts.
   */
  public async contacts(query: RESTGetAPIUserContactsQuery = {}) {
    const params = buildURLSearchParams(query)

    return await this.rest.get<RESTGetAPIUserContactsResult>(APIRoutes.userContacts(), { params })
  }

  /**
   * Uploads the user avatar.
   */
  public async uploadAvatar(body: RESTPutAPIUserAvatarBody) {
    return await this.rest.put<RESTPutAPIUserAvatarResult>(APIRoutes.userAvatar(), { body })
  }

  /**
   * Uploads the user banner.
   */
  public async uploadBanner(body: RESTPutAPIUserBannerBody) {
    return await this.rest.put<RESTPutAPIUserBannerResult>(APIRoutes.userBanner(), { body })
  }

  /**
   * Adds the user as contact.
   */
  public async addContact(userId: Id) {
    return await this.rest.post<RESTPostAPIUserContactResult>(APIRoutes.user(userId))
  }

  /**
   * Removes the user from contacts.
   */
  public async deleteContact(userId: Id) {
    return await this.rest.delete<RESTDeleteAPIUserContactResult>(APIRoutes.user(userId))
  }
}
