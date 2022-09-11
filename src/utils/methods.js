export const getValidUser = () => {
  const user = JSON.parse(localStorage.getItem("welfa"));
  if (user && user.auth.profile !== null) {
    return user;
  }
  return false;
};

export const getHeaders = () => {
  const requiredHeaders = {};
  requiredHeaders["Content-Type"] = "application/json";
  if (getValidUser()) {
    const {
      auth: {
        profile: { token },
      },
    } = getValidUser();
    if (token.accessToken) {
      requiredHeaders.Authorization = `Bearer ${token.accessToken}`;
    }
  }
  //   requiredHeaders.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YTJhNWQ4NTU1ZjM0MmY2ODUwNjVlNTM4MjBkNWQyMCIsImp0aSI6IjMwYmQ5OWFlLTQxNDctNDYxYS04OTIwLTQyOTY0YzRmOGJmNSIsInR5cGUiOiJhY2Nlc3MiLCJmcmVzaCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vamV0dmFwaS5zdGFnaW5nLmpldHN0cmVhbWFmcmljYS5jb20iLCJpYXQiOjE2NjI0NzQ5NTksImV4cCI6MTY5NDAxMDk1OSwibmJmIjoxNjYyNDc0OTU5LCJpZCI6IjAxZzh2aGh0bndtNHZqbmhuejU1anZwd2txIiwiZmlyc3RfbmFtZSI6Ik5hdGUiLCJsYXN0X25hbWUiOiJBc2lhayIsImVtYWlsIjoibmFhKzkwQGpldHN0cmVhbWFmcmljYS5jb20iLCJwaG9uZV9udW1iZXIiOiIwODY0OTQ1NjYzIiwibGFzdF9sb2dnZWRfaW4iOjE2NjIzODg1NTl9.6ZEkDEB38eSenKrhSNBxXM4lCwr6YevfhOpULYQOIvg`;
  return requiredHeaders;
};
