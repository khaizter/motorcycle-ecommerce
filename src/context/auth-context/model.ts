export interface contextType {
  isLoggedIn: boolean;
  currentUserId: string | null;
  currentToken: string | null;
  currentUserName: string | null;
  currentUserType: string | null;
  login: (id: string, token: string, name: string, type: string) => void;
  logout: () => void;
}
