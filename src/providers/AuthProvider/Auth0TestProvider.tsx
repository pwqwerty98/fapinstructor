

export type Auth = {
  user?: unknown;
  isAuthenticated?: boolean;
  isLoading?: boolean;
};

type AuthProviderProps = React.PropsWithChildren<Auth>;

export default function Auth0TestProvider({
  children,
  user,
  isAuthenticated,
  isLoading,
}: AuthProviderProps) {
  return (
    <div
      // @ts-expect-error Don't warn about unimplemented funcs as this is a test provider
      value={{
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginWithRedirect: async () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        logout: () => {},
        user,
        isAuthenticated:
          isAuthenticated === undefined ? !!user : isAuthenticated,
        isLoading: isLoading === undefined ? !!user : isLoading,
      }}
    >
      {children}
    </div>
  );
}
