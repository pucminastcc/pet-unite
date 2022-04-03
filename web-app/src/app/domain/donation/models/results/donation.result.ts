export interface DonationResult {
  id: string;
  userId: string;
  username: string;
  petId: string;
  petName: string;
  petImg: string;
  state: string;
  city: string;
  contact: string;
  interestedUserId?: string;
  interestedUsername?: string;
  interestedUserFlagged?: boolean;
  userFlagged?: boolean;
}
