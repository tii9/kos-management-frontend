export type AuthContextType = {
  token: string;
  setToken: (token: string | null) => void;
  logout: () => void;
};
