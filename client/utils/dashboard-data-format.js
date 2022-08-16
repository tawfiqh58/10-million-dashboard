const getDeviceData = (devices) => {
  if (devices && devices.length > 0) {
    return {
      labels: devices.map((val) => val._id),
      datasets: [
        {
          label: '# of Device',
          data: devices.map((val) => val.count),
          backgroundColor: [
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  } else {
    return {
      labels: ['Desktop', 'Mobile', 'Tab'],
      datasets: [
        {
          label: '# of Device',
          data: [0, 0, 0],
          backgroundColor: [
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
};

const getGenderData = (gender) => {
  if (gender && gender.length > 0) {
    return {
      labels: gender.map((val) => val._id),
      datasets: [
        {
          label: '# of Gender',
          data: gender.map((val) => val.count),
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };
  } else {
    return {
      labels: ['Male', 'Female'],
      datasets: [
        {
          label: '# of Gender',
          data: [0, 0],
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
          ],
          borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
          borderWidth: 1,
        },
      ],
    };
  }
};

const getTopCountriesData = (data) => {
  if (data) {
    return {
      labels: data.map((val) => val._id),
      datasets: [
        {
          label: 'User count',
          data: data.map((val) => val.count),
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };
  } else {
    return {
      labels: ['Country Name'],
      datasets: [
        {
          label: 'User count',
          data: [0],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
        },
      ],
    };
  }
};

export { getDeviceData, getGenderData, getTopCountriesData };
