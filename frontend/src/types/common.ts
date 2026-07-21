import { BloodGroup, Gender, TShirtSize, UserRole } from "./user";

  // Select options
  export const roleOptions = [
    { value: UserRole.USER, label: 'User' },
    { value: UserRole.ORGANIZER, label: 'Organizer' },
    { value: UserRole.ADMIN, label: 'Admin' },
  ];

  export const bloodGroupOptions = [
    { value: BloodGroup.A_POSITIVE, label: 'A+' },
    { value: BloodGroup.A_NEGATIVE, label: 'A-' },
    { value: BloodGroup.B_POSITIVE, label: 'B+' },
    { value: BloodGroup.B_NEGATIVE, label: 'B-' },
    { value: BloodGroup.AB_POSITIVE, label: 'AB+' },
    { value: BloodGroup.AB_NEGATIVE, label: 'AB-' },
    { value: BloodGroup.O_POSITIVE, label: 'O+' },
    { value: BloodGroup.O_NEGATIVE, label: 'O-' },
  ];

  export const genderOptions = [
    { value: Gender.MALE, label: 'Male' },
    { value: Gender.FEMALE, label: 'Female' },
    { value: Gender.OTHER, label: 'Other' },
  ];

 export const tshirtSizeOptions = [
    { value: TShirtSize.XS, label: 'XS' },
    { value: TShirtSize.S, label: 'S' },
    { value: TShirtSize.M, label: 'M' },
    { value: TShirtSize.L, label: 'L' },
    { value: TShirtSize.XL, label: 'XL' },
    { value: TShirtSize.XXL, label: 'XXL' },
    { value: TShirtSize.XXXL, label: 'XXXL' },
  ];