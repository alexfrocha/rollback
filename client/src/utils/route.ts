export function convertToRouteSlug(label: string) {
  return label.split(" ").join("-");
}
