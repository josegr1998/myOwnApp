import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePageNumber,
  updatePageNumberBtn,
} from "../redux/actions/postsActions";

const Btns = () => {
  const dispatch = useDispatch();
  const pageNumber = useSelector((state) => state.posts.pageNumber);
  const postPerPage = useSelector((state) => state.posts.postPerPage);
  const allPosts = useSelector((state) => state.posts.allPosts);

  const numberOfPages = parseInt(Math.ceil(allPosts.length / postPerPage));

  const buttons = Array.from({ length: numberOfPages }, (item, index) => {
    return (
      <button
        className={`number-btn ${index + 1 === pageNumber && "active"}`}
        onClick={() => {
          dispatch(updatePageNumberBtn(index + 1));
        }}
      >
        {index + 1}
      </button>
    );
  });

  if (numberOfPages > 1) {
    return (
      <Wrapper>
        <button
          name='dec'
          className='move-btn'
          onClick={(e) => {
            dispatch(updatePageNumber(e.target.name));
          }}
        >
          prev page
        </button>
        <div className='container'>{buttons}</div>

        <button
          className='move-btn'
          name='inc'
          onClick={(e) => {
            dispatch(updatePageNumber(e.target.name));
          }}
        >
          next page
        </button>
      </Wrapper>
    );
  } else {
    return <></>;
  }
};

const Wrapper = styled.article`
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
  .move-btn {
    font-size: 1.2rem;
    border: transparent;
    transition: var(--transition);
  }
  .move-btn:hover {
    cursor: pointer;
    color: var(--primary-500);
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }
  .number-btn {
    padding: 0.25rem 0.3rem;
    background: var(--grey-300);
    border: transparent;
    transition: var(--transition);
    cursor: pointer;
  }
  .number-btn.active {
    background: var(--primary-500);
    color: white;
  }
`;
export default Btns;
