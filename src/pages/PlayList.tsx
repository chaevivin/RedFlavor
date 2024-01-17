import { useNavigate } from 'react-router-dom';
import Back from '../components/Back/Back';
import TrackList from '../components/TrackList/TrackList';
import { useAppSelector } from '../hook/reduxHook';
import { nowValue } from '../reducers/nowPlayingSlice';
import LikeMusic from '../components/LikeMusic/LikeMusic';
import Frequency from '../components/Frequency/Frequency';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import styled from 'styled-components';

const Background = styled.section`
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(1088px / 3.5);
  margin-bottom: 0.6rem;
  align-items: end;
`

const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const TrackNumber = styled.p`
  margin: 0;
  color: #ffffff;
  text-shadow: -1px 0 #3ebf6f, 0 1px #3ebf6f, 1px 0 #3ebf6f, 0 -1px #3ebf6f;
  font-size: 1.3rem;
`

const FrequencyContainer = styled.div`
  display: flex;
  margin-bottom: 0.3rem;
  height: 64px;
`

export default function PlayList() {
  const navigate = useNavigate();
  const nowPlaying = useAppSelector(nowValue);

  return (
    <Background>
      <Container>
        <Back navigate={navigate} color='#7fb672' />
        <TrackNumber>♬TRACK { nowPlaying < 10 ? `0${nowPlaying}` : nowPlaying }</TrackNumber>
      </Container>
      <Container>
        <ContainerColumn>
          <FrequencyContainer>
          <Frequency start={0} color='#9be08e' /><Frequency start={1} color='#ffa77a' /><Frequency start={2} color='#ff96ad' />
            <Frequency start={3} color='#ffeb87' /><Frequency start={4} color='#b4e4ff' /><Frequency start={5} color='#9be08e' />
            <Frequency start={6} color='#ffa77a' /><Frequency start={7} color='#ff96ad' /><Frequency start={8} color='#ffeb87' />
            <Frequency start={9} color='#b4e4ff' />
          </FrequencyContainer>
          <ProgressBar />
        </ContainerColumn>
        <LikeMusic />
      </Container>
      <TrackList />
    </Background>
  );
}

