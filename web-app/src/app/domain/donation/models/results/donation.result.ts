export interface DonationResult {
  id: string;
  userId: string;
  username: string;
  userImg?: string;
  userIsInstitution?: string;
  petId: string;
  petName: string;
  petImg: string;
  petDescription?: string;
  petGenderId: string;
  petGender: string;
  petTypeId: string;
  petType: string;
  petBreed: string;
  petAge: string;
  rateTraining: number;
  rateFriendly: number;
  rateLikesTours: number;
  rateLikesChild: number;
  state: string;
  city: string;
  lng: number;
  lat: number;
  date: string;
  contacts?: Contacts[];
  interestedUserId?: string;
  interestedUsername?: string;
  interestedUserFlagged?: boolean;
  status?: string;
  statusSeverity?: string;
  rating?: number;
  donated?: number;
  signalDate?: number;
  feedback?: string;
  donatedToInstitution?: boolean;
}

interface Contacts {
  value: string;
  description: string;
}
