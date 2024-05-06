const AccessDenied = () => {
  return (
    <>
      <div style={{ padding: "1rem" }}>
        <h3>Access Denied</h3>
        <p>1. Only role "admin" can delete users.</p>
        <p>
          2. If you've designated yourself as an admin, please log in once more,
          as the current token lacks the metadata indicating your admin status.{" "}
        </p>
      </div>
    </>
  );
};

export default AccessDenied;
