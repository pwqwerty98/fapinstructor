import { TableCell, TableCellProps } from "@material-ui/core";

import { Tags, TagsProps } from "@/components/Tags";

export type TagsColumnProps = TagsProps & TableCellProps;

export function TagsColumn({ tags, ...props }: TagsColumnProps) {
  return (
    <TableCell {...props}>
      <Tags tags={tags} />
    </TableCell>
  );
}
