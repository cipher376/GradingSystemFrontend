
export interface Country {
  name: string;
  states: string[];
}


export class Address {
  id?: string;
  city?: string;
  state?: string;
  country?: string;
  street?: string;
  suburb?: string;
  postCode?: string;
  zipCode?: string;
  latLng?: string;
  apartment?: string;

  /**** Relational properties ****/
  userId?: string;
}
