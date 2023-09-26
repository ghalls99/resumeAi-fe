const data = {
  username: "717bb540-4081-700a-7ccb-cde62d841c90",
  bio: [
    {
      data: {
        bio: "Full stack engineer with 4+ years of experience.",
      },
      id: "_8muqd6wvp",
    },
  ],
  contact_info: [
    {
      data: {
        address: "3958 North Summer Ridge Road",
        email: "garrett@hallsnet.com",
        firstName: "Garrett",
        lastName: "Halls",
        phone: "8014251650",
        role: "Software Engineer",
      },
      id: "_bie8i9wrp",
    },
  ],
  education: [
    {
      data: {
        schoolLocation: "LOCATION",
        schoolName: "SCHOOL",
      },
      id: "_xja8dv000",
    },
  ],
  job_history: [
    {
      data: {
        company: "TEST COMPANY",
      },
      id: "_ia8lybkst",
    },
  ],
  resume_updated_at: 1695747956214,
  skills: [
    {
      colSize: 3,
      placeholder: "test",
    },
  ],
  timestamp: "1695595803221",
};

const cleanData = (dataSet) => {
  let cleanedData = {};

  Object.keys(dataSet).forEach((key) => {
    const value = dataSet[key];

    if (Array.isArray(value) && value.length > 0) {
      cleanedData[key] = value.map((item) => {
        if (item.hasOwnProperty("data")) {
          return item.data;
        }
        return cleanData(item); // Recursively clean if it's not the 'data' key
      });
    } else if (typeof value === "object" && value !== null) {
      cleanedData[key] = cleanData(value); // Recursive clean
    } else {
      cleanedData[key] = value; // If it's a primitive type
    }
  });

  console.log(cleanData);
};

cleanData(data);
