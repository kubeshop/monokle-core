import styled from 'styled-components';
import MyButton from './atoms/MyButton';

function App() {
    return (
        <Wrapper>
            <MyButton>Click me</MyButton>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 2rem;
    display: flex;
    justify-content: center;
`;

export default App;
