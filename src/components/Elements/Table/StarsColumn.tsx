import { TableCell, TableCellProps } from "@material-ui/core";

import { StarButton, StarButtonProps } from "@/features/game";

export type StarsColumnProps = TableCellProps & StarButtonProps;

export function StarsColumn({
  gameId,
  stars,
  starred,
  ...props
}: StarsColumnProps) {
  return (
    <TableCell {...props}>
      <StarButton gameId={gameId} stars={stars} starred={starred} />
    </TableCell>
  );
}
