export function withAuth(Component) {
  return function WithAuth(props) {
    const isLogin = true;
    if (!isLogin) {
      return <div>Not authorized</div>;
    }
    return <Component {...props} />;
  };
}
