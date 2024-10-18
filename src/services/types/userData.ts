export interface UserData {
  id: number;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  userprofile?: {
    subscription_plan?: string;
  };
  isAuthenticated: boolean;
}
export interface signUpData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  [key: string]: string;
}

export interface EditProfileFormProps {
  profileData: ProfileData;
  onSubmit: (formData: ProfileData) => Promise<void>;
}
