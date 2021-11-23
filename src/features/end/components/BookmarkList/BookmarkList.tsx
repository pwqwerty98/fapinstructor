import styled from "styled-components/macro";

import { Bookmark, BookmarkProps } from "@/components/Bookmark";

export type BookmarkListProps = {
  bookmarks: BookmarkProps[];
};

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 80vw;
  max-height: 40vh;
  overflow: auto;
`;

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <ListContainer>
      {bookmarks.map(({ href, src }, i) => (
        <div key={i}>
          <Bookmark href={href} src={src} />
        </div>
      ))}
    </ListContainer>
  );
}
