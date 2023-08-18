export class UserGroup {
  constructor(public id: string, public title: string, public owner: string, public registrationRequired: boolean, public invitationRequired: boolean, public visibleToFriends: boolean, public invitees: string[], members: string[], excludees: string[]) { }
}
