/**
 *
 * @param {...any} values
 */
export const classNames = (
  ...values: Array<string | false | null | undefined>
) => values.filter(Boolean).join(" ");
