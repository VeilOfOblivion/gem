export class UserGroup {
  constructor(public id: string, public title: string, public description: string, public ownerId: string, public owner: string, public registrationRequired: boolean, public invitationRequired: boolean, public visibleToFriends: boolean, public invitees: string[], public members: string[], public excludees: string[]) { }
}
