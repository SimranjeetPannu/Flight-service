import styled from "styled-components";

export const Nav = styled.nav`
    background-color: ${({backgroundColor}) => backgroundColor ?? '#FFEBCD'};
    color: ${({color}) => color ?? 'white'};
    font-size: 20px;
    padding: 1em 1em;
    display: flex;
    justify-content: space-between;
`;