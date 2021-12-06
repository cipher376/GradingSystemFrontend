
export enum POLICY_TYPE {
  GROUP = 'g',
  POLICY = 'P'
}

export interface PolicyInterface {
  id?: string;
  ptype?: POLICY_TYPE;
  subject: string;
  object?: string;
  action?: string;
  domain?: string;
  role?: string;
}
export class RolePolicy {
  /**
   *
   */
  constructor(private data?: PolicyInterface) {
    if (data) {
      this.ptype = data.ptype;
      this.subject = data.subject;
      this.object = data.object;
      this.action = data.action;
      this.domain = data.domain;
      this.role = data.role;
    }
  }
  id?: string;
  ptype?: POLICY_TYPE;
  subject?: string;
  object?: string;
  action?: string;
  domain?: string;
  role?: string;
}

export class Role {
  id?: string;
  ptype?: POLICY_TYPE;
  subject?: string;
  role?: string;
}

