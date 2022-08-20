export interface contextType {
  isLoggedIn: boolean;
  currentUserId: string | null;
  currentToken: string | null;
  currentUserName: string | null;
  login: (id: string, token: string, name: string) => void;
  logout: () => void;
}
