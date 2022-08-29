export const cleanSym = (str: string): string => str.replaceAll(":", "");
export const padding4Zero = (str: string): string => str.padStart(4, "0");
export const substringFromEnd4 = (str: string): [number, number] => {
  const [m2, m1, s2, s1] = str
    .split("")
    .reverse()
    .join("")
    .substring(0, 4)
    .split("")
    .reverse() as [string, string, string, string];

  const minutes = parseInt(m2 + m1);
  const seconds = parseInt(s2 + s1);

  return [minutes, seconds];
};

export const padZerosAndJoin = (arr: [number, number]): string =>
  arr.map((v) => (v <= 9 ? String(v).padStart(2, "0") : String(v))).join(":");
