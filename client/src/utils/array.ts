export function updateArrayById(array: any[], id: string, updatedData: any) {
  let new_list: Object[] = [...array];
  let index = new_list.findIndex((item: any) => item.id == id);
  if (index !== -1) {
    new_list[index] = { ...new_list[index], ...updatedData };
  }
  return new_list;
}
