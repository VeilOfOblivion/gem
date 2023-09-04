export class UserGroup {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public ownerId: string,
    public owner: string,
    public registrationRequired: boolean,
    public invitationRequired: boolean,
    public visibleToFriends: boolean,
    public permissionToJoinRequired: boolean,
    public requestsToJoin : string[],
    public invitees: string[],
    public members: string[],
    public excludees: string[],
    public memberUsernames: string[],
    public inviteeUsernames: string[],
    public excludeeUsernames: string[],
    public requestUsernames: string[],
    public usersWhoCanEdit: string[],
    public usersWhoCanManage: string[],
  ) {}
}
