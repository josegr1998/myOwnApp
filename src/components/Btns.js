import { usePostContext } from "../context/PostContext";
import styled from "styled-components";

const Btns = () => {
  const { pageNumber, postPerPage, allPosts, updatePageNumber } =
    usePostContext();

  const numberOfPages = parseInt(Math.ceil(allPosts.length / postPerPage));
  console.log(numberOfPages);

  const buttons = Array.from({ length: numberOfPages }, (item, index) => {
    return <button>{index + 1}</button>;
  });

  return (
    <Wrapper>
      <button
        name='dec'
        onClick={(e) => {
          updatePageNumber(e.target.name);
        }}
      >
        prev page
      </button>

      {buttons}
      <button
        name='inc'
        onClick={(e) => {
          updatePageNumber(e.target.name);
        }}
      >
        next page
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.article``;
export default Btns;
