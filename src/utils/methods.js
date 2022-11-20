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

export const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(new Date(date));
};

export const genFilter = (filterObj = {}) => {
  let filterString = "";
  for (const key in filterObj) {
    filterString = filterString
      ? filterString + "" + `&${key}=${filterObj[key]}`
      : `${key}=${filterObj[key]}`;
  }
  return filterString;
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat("en-GB").format(value);
};

export const getDateRange = (duration) => {
  const today = new Date();

  if (duration === "30_days_ago") {
    const previous = new Date(new Date().setDate(today.getDate() - 30));

    return {
      startDate: previous,
      endDate: today,
    };
  }

  if (duration === "this_month") {
    const firstDay = new Date();
    firstDay.setDate(1);
    return {
      startDate: firstDay,
      endDate: today,
    };
  }

  if (duration === "last_month") {
    const lastDayofPrev = new Date();
    lastDayofPrev.setDate(0);

    const firstDayOfPrev = new Date(lastDayofPrev);
    firstDayOfPrev.setDate(1);

    return {
      startDate: firstDayOfPrev,
      endDate: lastDayofPrev,
    };
  }

  if (duration === "last_3_months") {
    const last3month = new Date();
    last3month.setMonth(last3month.getMonth() - 3);
    last3month.setDate(1);

    return {
      startDate: last3month,
      endDate: today,
    };
  }
};

export const genGraphData = (
  metrics,
  setA = "contributions",
  setB = "redrawals"
) => {
  if (!metrics) return {};
  const labels = metrics.reduce((acc, current) => {
    return [...acc, current.month];
  }, []);

  const dataSet1 = metrics.reduce((acc, current) => {
    return [...acc, current[setA]];
  }, []);

  const dataSet2 = metrics.reduce((acc, current) => {
    return [...acc, current[setB]];
  }, []);

  return {
    labels: labels,
    datasets: [
      {
        label: setA,
        backgroundColor: "#419544",
        data: dataSet1,
      },
      {
        label: setB,
        backgroundColor: "#ff6347",
        data: dataSet2,
      },
    ],
  };
};

export const sourcesList = ["Cheaque", "Bank Transfer", "MOMO", "Cash"];
