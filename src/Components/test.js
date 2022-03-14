const { logout, isAuthenticated, getAccessTokenSilently, isLoading } =
  useAuth0();

export const logoutAction = () => ({
  payload: logout({ path: "http://localhost:3000/" }),
});
