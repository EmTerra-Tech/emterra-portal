export type SignUpFormDataType = {
  companyName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  terms: boolean;
  processing: boolean;
  logoUrl: string;
  description: string;
  industry: string;
  foundedYear: number;
  headquarters: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  updates: boolean;
};

export type LoginFormDataType = {
  email: string;
  password: string;
};
