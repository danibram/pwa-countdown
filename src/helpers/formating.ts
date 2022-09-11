export const padZeroAndSplit = (n: number): [string, string] =>
  (n <= 9 ? String(n).padStart(2, "0").split("") : String(n).split("")) as [
    string,
    string
  ];
export const padding4Zero = (str: string): string => str.padStart(4, "_");
export const substringFromEnd4 = (
  str: string
): [string, string, string, string] => {
  const [m2, m1, s2, s1] = str
    .split("")
    .reverse()
    .join("")
    .substring(0, 4)
    .split("")
    .reverse() as [string, string, string, string];

  return [m2, m1, s2, s1];
};

export const toClock = ([m2, m1, s2, s1]: [
  string,
  string,
  string,
  string
]): string => m2 + m1 + ":" + s2 + s1;

export const cleanDashes = (
  arr: [string, string, string, string]
): [string, string, string, string] =>
  arr.map((s) => s.replace("_", "0")) as [string, string, string, string];
