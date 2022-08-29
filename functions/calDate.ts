const calDate = (date: Date, number: number) => {
  const resDate = new Date(date);
  resDate.setDate(resDate.getDate() + number);

  return resDate;
};

export default calDate;
