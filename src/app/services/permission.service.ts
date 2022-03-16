import { Injectable } from '@angular/core';

export enum Roles {
    superadmin,
    admin,
    member
}

interface IPermissionDictionary {
    [key: string]: boolean;
}

@Injectable()
export class PermissionService {
    private permissions: IPermissionDictionary = {};

    public constructor() {
        this.emitPermissions();
    }

    private emitPermissions(): void {
        const loggedInUser = JSON.parse(localStorage.getItem('_econn_user'));
        if (loggedInUser) {
            const availableRoles = loggedInUser.roles;

            // for (const role in Roles) {
            //     if (!/^\d+$/.test(role)) { // for strings types in Roles
            //         this.permissions[role] = availableRoles.indexOf(role) > -1;
            //     }
            // }
        }
    }

    public isInRole(role: string): boolean {
        return this.permissions[role] || false;
    }

    // public isInRole(role: string): boolean {
    //     return this.permissions[role];
    // }

    // public isAdmin() {
    //     return this.isInRole(Roles[Roles.Admin]);
    // }

    // public isSeller() {
    //     return this.isInRole(Roles[Roles.Seller]);
    // }

    // public isManager() {
    //     return this.isInRole(Roles[Roles.Manager]);
    // }

    // public isModerator() {
    //     return this.isInRole(Roles[Roles.Moderator]);
    // }

    public isAllowed(perm) {
        const permissions = JSON.parse(localStorage.getItem('_econn_perm'));
        const exists = permissions.includes(perm);

        return exists;
    }

    public isCustomer(): boolean {
        const user = JSON.parse(localStorage.getItem('_econn_user'));
        return user.custid > 0;
    }
}
