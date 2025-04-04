export interface User {
  _id: string;
  id: string;
  tenant: string;
  username: string;
  email: string;
  smarticoIntegrated: boolean;
  referralCodes: [];
  isAffiliate: boolean;
  isSubAffiliate: boolean;
  active: boolean;
  phone: string;
  complianceLevel: 1;
  document: string;
  role: string;
  permissions: [];
  hasGeneratedPassword: boolean;
  hasUsedGeneratedPassword: boolean;
  isFromMigration: boolean;
  isDemo: boolean;
  isGameBlock: boolean;
  isWithdrawBlock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllUsersResponse {
  docs: Array<User>;
  totalDocs: number;
  limit: number;
  totalPages: number;
  currentPage: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
