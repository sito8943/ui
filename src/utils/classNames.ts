/**
 * Joins class name values while omitting falsy entries.
 * @param values Class name values to include when truthy.
 * @returns A space-delimited class name string.
 */
export const classNames = (
  ...values: Array<string | false | null | undefined>
) => values.filter(Boolean).join(" ");
