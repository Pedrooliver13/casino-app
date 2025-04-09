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

export interface UserOperation {
  _id: string;
  demo: false;
  tenant: string;
  userId: string;
  balance: number;
  bonus: number;
  betAmount: number;
  betQuantity: number;
  betPaymentQuantity: number;
  betPaymentAmount: number;
  betPaymentRefundAmount: number;
  betPaymentRefundQuantity: number;
  depositAmount: number;
  depositQuantity: number;
  withdrawAmount: number;
  withdrawQuantity: number;
  withdrawCanceledAmount: number;
  withdrawCanceledQuantity: number;
  refundAmount: number;
  refundQuantity: number;
  depositBonusAmount: number;
  depositBonusQuantity: number;
  addAmount: number;
  addQuantity: number;
  subtractAmount: number;
  subtractQuantity: number;
  cpaPaymentAmount: number;
  cpaPaymentQuantity: number;
  ggrPaymentAmount: number;
  ggrPaymentQuantity: number;
  ngrPaymentAmount: number;
  ngrPaymentQuantity: number;
  referralCommissionAmount: number;
  referralCommissionQuantity: number;
  couponAmount: number;
  couponQuantity: number;
  lastReview: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    username: string;
    email: string;
    smarticoIntegrated: boolean;
    isAffiliate: boolean;
    isSubAffiliate: boolean;
    tenant: string;
    active: boolean;
    phone: string;
    document: string;
    role: string;
    permissions: [];
    isFromMigration: boolean;
    isDemo: boolean;
    isGameBlock: boolean;
    isWithdrawBlock: boolean;
    createdAt: string;
  };
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

export interface GetUserByIdResponse extends User {}

export interface GetUserOperationsByIdResponse extends UserOperation {}
