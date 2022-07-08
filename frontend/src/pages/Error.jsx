import errorpage from '../errorpage.png';
import { Center } from '../components/features/StyledComponents';
export const Error = () => {
    return (
        <Center>
            <h1>The page you were looking for could not be found.</h1>
            <div><img src={errorpage} alt="Oh no, something went wrong!"/></div>
        </Center>
    );
}