export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const options: any = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };
  