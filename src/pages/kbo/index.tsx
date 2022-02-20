import TeamCard from '../../components/kbo/TeamCard';
import styled from 'styled-components';
import { breakpoints } from '../../styles/media';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Subtitle = styled.h2`
  font-family: 'RobotoMonoRegular';
  color: #b70000;
  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.846rem;
    padding-top: 16.7rem;
  }
`;

const Slider = styled.div`
  position: relative;
  margin-top: 5.3rem;
  height: 72.2rem;
  width: 133rem;
  overflow: hidden;
  cursor: grab;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(10, 1fr);
  position: absolute;
  bottom: 0;
  width: 200%;
`;

const SlideBarContainer = styled(motion.div)`
  cursor: grab;
  margin-top: 5rem;
  width: 131rem;
  height: 0.2rem;
  background-color: #fff;
`;

const SlideBar = styled(motion.div)`
  width: 69rem;
  height: 100%;
  background-color: #3d3d3d;
`;

export default function Kbo() {
  const slideConstraintsRef = useRef<HTMLDivElement>(null);
  const slideBarConstraintsRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Subtitle>choose professional team</Subtitle>
      <Slider ref={slideConstraintsRef}>
        <AnimatePresence>
          <Row
            drag
            dragConstraints={{ top: 0, bottom: 0, left: -1350, right: 0 }}
            dragElastic={0.01}
            dragMomentum={false}
          >
            {Team.map((team) => (
              <TeamCard key={team.id} team={team}></TeamCard>
            ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <SlideBarContainer ref={slideBarConstraintsRef}>
        <SlideBar
          drag
          dragConstraints={slideBarConstraintsRef}
          dragElastic={0}
          dragMomentum={false}
        />
      </SlideBarContainer>
    </Wrapper>
  );
}

const Team = [
  {
    id: 1,
    name: 'samsung lions',
  },
  {
    id: 2,
    name: 'kiwoom heroes',
  },
  {
    id: 3,
    name: 'lg twins',
  },
  {
    id: 4,
    name: 'kia tigers',
  },
  {
    id: 5,
    name: 'doosan bears',
  },
  {
    id: 6,
    name: 'hanhwa eagles',
  },
  {
    id: 7,
    name: 'ssg landers',
  },
  {
    id: 8,
    name: 'kt wiz',
  },
  {
    id: 9,
    name: 'nc dinos',
  },
  {
    id: 10,
    name: 'lotte giants',
  },
];
