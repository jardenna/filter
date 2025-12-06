import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  const handleGoback = () => {
    void navigate(-1);
  };

  return (
    <main className="error-page">
      <header>
        <h2 className="error-info">{error.data}</h2>
      </header>
      <button type="button" onClick={handleGoback}>
        Go back
      </button>
    </main>
  );
};

export default ErrorPage;
